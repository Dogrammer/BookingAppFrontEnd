import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../admin-apartment-group.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { take } from 'rxjs/operators';
import { ApartmentGroupService } from 'src/app/apartment/services/apartment-group.service';

@Component({
  selector: 'app-modal-add-or-edit-apartment-group',
  templateUrl: './modal-add-or-edit-apartment-group.component.html',
  styleUrls: ['./modal-add-or-edit-apartment-group.component.scss']
})
export class ModalAddOrEditApartmentGroupComponent implements OnInit {
  
  @Input() title;
  @Input() action;
  @Input() row;

  users: any[] =[];
  isAdmin;
  apartmentGroupGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    userId: [null]
    // isActive: [true],
    // activeFrom: [ new Date()],
    // activeTo: [this.tenYearsFromNow]
  });
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private apartmentGroupService: ApartmentGroupService,
    private authService: AuthService
  )
    
    {}

  ngOnInit() {
    this.checkIfAdmin();
    this.getApartmentManagers();
    if(this.row && this.action == 'edit') {
      this.apartmentGroupGroup.patchValue({
        name: this.row.name,
        description: this.row.description,
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
      

    }

    console.log(this.row);
    

    
  }
  getApartmentManagers() {
    this.authService.getApartmentManagers().subscribe(
      data => { this.users = data; console.log(this.users)}
    )
  }

  checkIfAdmin() {
    this.authService.checkIfAdmin().subscribe(
      data => { this.isAdmin = data; console.log(this.isAdmin)}
    )
  }
  
  saveApartmentGroup()  {
    if(!this.apartmentGroupGroup.valid) {
      return;
    } else {
      this.apartmentGroupService.saveApartmentGroup(this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add')
      });
    }
  }

  editApartmentGroup()  {
    if(!this.apartmentGroupGroup.valid) {
      return;
    } else {
      this.apartmentGroupService.editApartmentGroup(this.row.id, this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add') 
      });
    }
  }

  get name(): AbstractControl {
    return this.apartmentGroupGroup.get('name');
  }

  get description(): AbstractControl {
    return this.apartmentGroupGroup.get('name');
  }

  get userId(): AbstractControl {
    return this.apartmentGroupGroup.get('userId');
  }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}
