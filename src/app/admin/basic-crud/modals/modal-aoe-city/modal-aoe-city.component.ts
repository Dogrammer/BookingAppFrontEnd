import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { ICountry } from 'src/app/admin/models/country';
import { BasicCrudService } from '../../services/basic-crud.service';

@Component({
  selector: 'app-modal-aoe-city',
  templateUrl: './modal-aoe-city.component.html',
  styleUrls: ['./modal-aoe-city.component.scss']
})
export class ModalAoeCityComponent implements OnInit {

  @Input() title;
  @Input() action;
  @Input() row;

  countries: ICountry[] =[];
  cityGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    countryId: [null, Validators.required]
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
    this.getCountries();
    if(this.row && this.action == 'edit') {
      this.cityGroup.patchValue({
        name: this.row.name,
        description: this.row.description,
        countryId: this.row.countryId
        // userName: this.row.user.userName
        // isActive: this.row.isActive,
        // activeFrom: this.row.activeFrom,
      });
    }

  }
  getCountries() {
    this.basicCrudService.getCountries().subscribe(
      data => { this.countries = data; }
    )
  }

  saveCity()  {
    if(!this.cityGroup.valid) {
      return;
    } else {
      console.log('validna forma');
      
      this.basicCrudService.saveCity(this.cityGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add')
      });
    }
  }

  editCity()  {
    if(!this.cityGroup.valid) {
      return;
    } else {
      this.basicCrudService.editCity(this.row.id, this.cityGroup.value).pipe(take(1)).subscribe(data => {
        this.modal.close('add') 
      });
    }
  }

  get name(): AbstractControl {
    return this.cityGroup.get('name');
  }

  get description(): AbstractControl {
    return this.cityGroup.get('name');
  }

  get countryId(): AbstractControl {
    return this.cityGroup.get('countryId');
  }

  // get userName(): AbstractControl {
  //   return this.apartmentGroupGroup.get('userName');
  // }
  // get requestTypePerAgeId(): AbstractControl {
  //   return this.documentTypeGroup.get('requestTypePerAgeId');
  // }

}
