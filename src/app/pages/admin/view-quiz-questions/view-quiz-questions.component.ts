import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizId:any;
  quizTitle:any;
  questions:any=[];
  constructor(private _route:ActivatedRoute,private _questionService:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params['qid'];
    this.quizTitle=this._route.snapshot.params['title'];

    //get questions of the quiz
    this._questionService.getQuestionsOfQuiz(this.quizId).subscribe(
      (data:any)=>{
        console.log(data);
        
        this.questions=data;
      },
      (error)=>{
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    )
  }

  deleteQuestion(questionId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure ?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._questionService.deleteQuestion(questionId).subscribe(
         (data:any)=>{
          this._snack.open('Question Deleted Successfully !!','',{
            duration:3000,
          });
          this.questions=this.questions.filter((que:any)=>que.quesId!=questionId);
         },
         (error)=>{
          this._snack.open("Error in deleting Question !!",'',{
            duration:3000,
          })
         } 
        )
      }
    });
  }

}
