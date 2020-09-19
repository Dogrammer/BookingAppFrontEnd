import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  
  constructor(public modal: NgbActiveModal) {}


  ngOnInit(): void {
    console.log('hellooo');
    
  }

}
