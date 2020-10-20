import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ConfirmationModalComponent } from 'src/app/shared/modals/confirmation-modal/confirmation-modal.component';
import { AdminApartmentService } from '../services/admin-apartment.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-admin-apartment-images',
  templateUrl: './admin-apartment-images.component.html',
  styleUrls: ['./admin-apartment-images.component.scss']
})
export class AdminApartmentImagesComponent implements OnInit {

  id: number;
  images;
  @Output() public onUploadFinished = new EventEmitter();

  myForm = new FormGroup({
    apartmentId: new FormControl(null, [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
    
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminApartmentService: AdminApartmentService,
    private ngbModalService: NgbModal,
    private toastr: ToastrService,
    private http: HttpClient,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.myForm.patchValue({
      apartmentId: this.id
    })
    
    
    this.adminApartmentService.getImagesByApartmentId(this.id).subscribe(
      data => { 
        this.images = data; console.log('images:', this.images);
        }
        )
  }



  deleteImage(id) {
    const modalRef = this.ngbModalService.open(ConfirmationModalComponent, { backdrop: 'static', keyboard: false });

    modalRef.componentInstance.title = 'Brisanje fotografije';
    modalRef.componentInstance.description = 'Želite li izbrisati fotografiju?';
    modalRef.result.then(result => {
      if (result == true) {
        let toastrVar = {
          progressBar: true,
          timeOut: 7500
        }
        console.log('id delete',id);
        // this.toastr.info('Uspješno ste obrisali grupu', 'Uspjeh', toastrVar);
        // this.isLoadingApproval = true;
        this.adminApartmentService.deleteImage(id).pipe(take(1)).subscribe(data => {
          this.toastr.info('Izbrisali ste fotografiju', 'Uspjeh');
          this.adminApartmentService.getImagesByApartmentId(this.id).subscribe(
            data => { 
              this.images = data; console.log('images:', this.images);
              }
              )
        })
      } else {
        // this.toastr.warning('Zahtjev nije prihvaćen', 'Pažnja', this.toastrVar);
      }
      // u slucaju da trebamo neki handle
    }).catch((res) => { });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
     
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    formData.append('apartmentId', this.apartmentId.value);
    console.log('apartmentid:', this.apartmentId.value);
    
    
   
    this.http.post('https://localhost:5001/api/upload/uploadApartmentImage', formData)
      .subscribe(res => {
        console.log(res);

        // alert('Uploaded Successfully.');
        this.toastr.success('Dodali ste fotografiju', 'Uspjeh');
        this.adminApartmentService.getImagesByApartmentId(this.id).subscribe(
          data => { 
            this.images = data; console.log('images:', this.images);
            }
            )
      })
  }

  get apartmentId(): AbstractControl {  return this.myForm.get('apartmentId')  }

}
