import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { BasicCrudService } from '../../services/basic-crud.service';

@Component({
  selector: 'app-modal-aoe-apartment-type',
  templateUrl: './modal-aoe-apartment-type.component.html',
  styleUrls: ['./modal-aoe-apartment-type.component.scss']
})
export class ModalAoeApartmentTypeComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  apartmentTypeGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    // userName: ['', Validators.required]
    // isActive: [true],
    // activeFrom: [ new Date()],
    // activeTo: [this.tenYearsFromNow]
  });
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private basicCrudService: BasicCrudService
    // private apartmentGroupService: ApartmentGroupService,
    // private authService: AuthService
  )
    
    {}

  ngOnInit() {
    console.log(this.row);
    
    // this.checkIfAdmin();
    // this.getApartmentManagers();
    if(this.row && this.action == 'edit') {
      this.apartmentTypeGroup.patchValue({
        name: this.row.name,
        description: this.row.description,
        
        // userName: this.row.user.userName
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
      

    }

    console.log(this.row);
    

    
  }
  // getApartmentManagers() {
  //   this.authService.getApartmentManagers().subscribe(
  //     data => { this.users = data; console.log(this.users)}
  //   )
  // }

  // checkIfAdmin() {
  //   this.authService.checkIfAdmin().subscribe(
  //     data => { this.isAdmin = data; console.log(this.isAdmin)}
  //   )
  // }
  
  saveApartmentType()  {
    if(!this.apartmentTypeGroup.valid) {
      return;
    } else {
      console.log('validna forma');
      
      this.basicCrudService.saveApartmentType(this.apartmentTypeGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add');
      });
    }
  }

  editApartmentType()  {
    if(!this.apartmentTypeGroup.valid) {
      return;
    } else {
      this.basicCrudService.editApartmentType(this.row.id, this.apartmentTypeGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('edit');
      });
    }
  }

  get name(): AbstractControl {
    return this.apartmentTypeGroup.get('name');
  }

  get description(): AbstractControl {
    return this.apartmentTypeGroup.get('description');
  }

  

  // get userName(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userName');
  // }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}
