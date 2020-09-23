import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();


  myForm = new FormGroup({
    apartmentId: new FormControl(null, [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
    
  });
    
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.myForm.patchValue({
      apartmentId: 1
    })
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
        alert('Uploaded Successfully.');
      })
  }

  // uploadAdditionalProfileDocument(requestId, file: File, description): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('description', description);
  //   formData.append('name', 'name');
  //   formData.append('surname',  "string");
  //   formData.append('oib', "string");
  //   formData.append('childId', requestId);
  //   return this.http.post<any>(url, formData);
  // }

  

  // public uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }

  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);

  //   this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress)
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // }

  get apartmentId(): AbstractControl {  return this.myForm.get('apartmentId')  }

}
