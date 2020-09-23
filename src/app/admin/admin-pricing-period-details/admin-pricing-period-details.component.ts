import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pricing-period-details',
  templateUrl: './admin-pricing-period-details.component.html',
  styleUrls: ['./admin-pricing-period-details.component.scss']
})
export class AdminPricingPeriodDetailsComponent implements OnInit {
  @Input() apartmentId: number;
  @Input() Message: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.apartmentId);
    
  }

}
