import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

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
  currentUser: string;
  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  osnovniPodaciExpand: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUsername;
    // console.log('currentUser=', this.authService.currentUsername);
    
    // dropdownMethod();
  }

  loggedIn() {
    if (this.authService.isAuthenticated()){
      return true;
    }
    return false;
  }

  logout() {
    this.authService.logout().subscribe( response => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authService.decodedToken = null;
      this.authService.currentUser = null;
      this.router.navigate(['site/home']);
    })
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



  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }


  

}
