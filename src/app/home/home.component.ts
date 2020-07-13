import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images = ['../../assets/homepage/pic1.jpg', '../../assets/homepage/pic2.jpg', '../../assets/homepage/pic3.jpg' ]
  constructor() { }

  ngOnInit(): void {
  }

}
