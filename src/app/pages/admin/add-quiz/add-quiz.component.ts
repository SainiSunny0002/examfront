import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    noOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }

  constructor(private category:CategoryService,private quiz:QuizServiceService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        console.log("error>>>>>>>>>>>>>>",error);
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    );
  }

  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this.snack.open("Title Required !!","",{
        duration:3000
      });
    }
    this.quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire("Success !!","Quiz is successfully added !!","success");
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          noOfQuestions:'',
          active:true,
          category:{
            cid:''
          }
        }
      },
      (error)=>{
        Swal.fire("Error !!","Error in adding data !!","error");
      }
    )
  }
}
