import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../admin-apartment-group.component';

@Component({
  selector: 'app-modal-add-or-edit-apartment-group',
  templateUrl: './modal-add-or-edit-apartment-group.component.html',
  styleUrls: ['./modal-add-or-edit-apartment-group.component.scss']
})
export class ModalAddOrEditApartmentGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAddOrEditApartmentGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    
  }

}
