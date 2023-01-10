import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title:'',
    description:''
  }
  constructor(private categoryService:CategoryService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snack.open("Please add title !!",'',{
        duration:3000
      })
    }

    //add data
    this.categoryService.addCategory(this.category).subscribe((data:any)=>{
      //success
      this.category.title='';
      this.category.description='';
      Swal.fire("Success !!","Category is added Successfully","success");
    },
    (error)=>{
      console.log("error>>>>>>>>>>>>>",error);
      Swal.fire('Error !!','Server Error','error');
    })
  }

}
