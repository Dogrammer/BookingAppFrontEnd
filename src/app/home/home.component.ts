import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  images = ['../../assets/homepage/home1.jpg', '../../assets/homepage/home2.jpg', '../../assets/homepage/home3.jpg' ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToApartments(){
    this.router.navigate(['site/apartments']);
  }

}
