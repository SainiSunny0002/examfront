import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }
  constructor(private userServie:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.userName=='' || this.user.userName==null){
      this.snack.open("Username is required !!",'',{
        duration:3000,
      });
      return;
    }

    this.userServie.addUser(this.user).subscribe(
      (data:any)=>{
        //for success
        console.log(data);
        // alert("Success");
        Swal.fire('Success','User is registered with id : '+ data.id,'success');
      },(error)=>{
        //for error
        console.log(error);
        // alert("Something went wrong");
        this.snack.open("Something went wrong !!",'',{
          duration:3000,
        });
      }
    )

  }

}
