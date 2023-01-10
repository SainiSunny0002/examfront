import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:"",
    password:"",
  };

  constructor(private snack : MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("Submitting login form !!");

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open("Please enter your username !!",'',{
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("Please enter your password !!",'',{
        duration:3000,
      });
      return;   
    }
    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Token>>>",data);

        //Login...
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log("User>>>",user);
            //resirect to admin or normal dashboard it is according to role 

            if(this.loginService.getUserRole()=='ADMIN'){
              // admin dashboard
              // window.location.href='/admin'
              this.router.navigate(['admin']);
              this.loginService.loginStatusSubject.next(true);
            }else if(this.loginService.getUserRole()=='NORMAL'){
              //normal user dashboard
              // window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout();
            }

          }
        );
      },
      (error)=>{
        console.log("Error>>>",error);
        this.snack.open("Invalid details : Try again !!",'',{
          duration:3000
        });
        
      }
    )
  }

}
