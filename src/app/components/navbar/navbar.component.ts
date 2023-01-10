import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(public loginService : LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedin();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn = this.loginService.isLoggedin();
      this.user = this.loginService.getUser();
    });
  }


  public logout(){
    this.loginService.logout();
    // this.isLoggedIn = false;
    // this.user = null;
    window.location.reload();
    // this.loginService.loginStatusSubject.next(false);
  }

}
