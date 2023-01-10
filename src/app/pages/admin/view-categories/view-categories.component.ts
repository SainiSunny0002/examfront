import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {


  categories:any=[]

  constructor(private category:CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe((data:any)=>{
      //success
      this.categories=data;
      console.log("category>>>>>>>>>>>>>>",data);
    },
    (error)=>{
      console.log("error>>>>>>>>>>>>>",error);
      Swal.fire('Error !!','Error in loading data','error');
    })
  }

}
