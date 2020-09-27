import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { BasicCrudService } from '../../services/basic-crud.service';

@Component({
  selector: 'app-modal-aoe-country',
  templateUrl: './modal-aoe-country.component.html',
  styleUrls: ['./modal-aoe-country.component.scss']
})
export class ModalAoeCountryComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  // users: any[] =[];
  // isAdmin;
  countryGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    // description: [''],
    // userId: [0],
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
      this.countryGroup.patchValue({
        name: this.row.name,
        // description: this.row.description,
        // userId: this.row.user.id,
        // userName: this.row.user.userName
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
    }
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
  
  saveCountry()  {
    if(!this.countryGroup.valid) {
      return;
    } else {
      console.log('validna forma');
      
      this.basicCrudService.saveCountry(this.countryGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add')
      });
    }
  }

  editCountry()  {
    if(!this.countryGroup.valid) {
      return;
    } else {
      this.basicCrudService.editCountry(this.row.id, this.countryGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add') 
      });
    }
  }

  get name(): AbstractControl {
    return this.countryGroup.get('name');
  }

  get description(): AbstractControl {
    return this.countryGroup.get('description');
  }

  // get userName(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userName');
  // }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}
