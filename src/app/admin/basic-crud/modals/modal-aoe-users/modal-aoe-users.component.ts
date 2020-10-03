import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-aoe-users',
  templateUrl: './modal-aoe-users.component.html',
  styleUrls: ['./modal-aoe-users.component.scss']
})
export class ModalAoeUsersComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  users: any[] =[];
  // isAdmin;
  userGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    // userId: [0],
    // userName: ['', Validators.required]
    // isActive: [true],
    // activeFrom: [ new Date()],
    // activeTo: [this.tenYearsFromNow]
  });
  constructor(
    public modal: NgbActiveModal,
    public formBuilder: FormBuilder,
    // private apartmentGroupService: ApartmentGroupService,
    // private authService: AuthService
  )
    
    {}

  ngOnInit() {
    console.log(this.row);
    
    // this.checkIfAdmin();
    // this.getApartmentManagers();
    if(this.row && this.action == 'edit') {
      this.userGroup.patchValue({
        name: this.row.name,
        description: this.row.description,
        userId: this.row.user.id,
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
  
  // saveApartmentGroup()  {
  //   if(!this.apartmentGroupGroup.valid) {
  //     return;
  //   } else {
  //     console.log('validna forma');
      
  //     this.apartmentGroupService.saveApartmentGroup(this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
  //       this.modal.close('add')
  //     });
  //   }
  // }

  // editApartmentGroup()  {
  //   if(!this.apartmentGroupGroup.valid) {
  //     return;
  //   } else {
  //     this.apartmentGroupService.editApartmentGroup(this.row.id, this.apartmentGroupGroup.value).pipe(take(1)).subscribe(data => {
  //       this.modal.close('add') 
  //     });
  //   }
  // }

  // get name(): AbstractControl {
  //   return this.apartmentGroupGroup.get('name');
  // }

  // get description(): AbstractControl {
  //   return this.apartmentGroupGroup.get('name');
  // }

  // get userId(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userId');
  // }

  // get userName(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userName');
  // }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}
