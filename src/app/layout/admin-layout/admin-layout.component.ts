import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// declare function dropdownMethod(): any;

@Component({
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('0.2s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  osnovniPodaciExpand: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
    // dropdownMethod();
  }

  clickEvent(){
    if (this.osnovniPodaciExpand == true){
      this.osnovniPodaciExpand = false;
    }
    else {
      this.osnovniPodaciExpand = true;

    }
    console.log(this.osnovniPodaciExpand);
    
  }


  

}
