import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  show() {
    this.toastr.warning('bravo', 'upozorenje');
    this.toastr.success('bravo', 'upozorenje');

    this.toastr.error('bravo', 'upozorenje');

    this.toastr.info('bravo', 'upozorenje');

  }

}
