import { QuizServiceService } from './../../../services/quiz-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizes:any=[]

  constructor(private quizService:QuizServiceService) { }

  ngOnInit(): void {
    this.quizService.getQuizes().subscribe(
      (data:any)=>{
        this.quizes=data;
        console.log("quizes>>>>>>>>>>>>>>>",data);
      },
      (error)=>{
        console.log("error>>>>>>>>>>>",error);
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    )
  }

  deleteQuiz(quizId:any){
    Swal.fire({
      icon:"info",
      title:"Are you Sure ?",
      confirmButtonText:"Delete",
      showCancelButton:true,
    }).then((result:any)=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(quizId).subscribe(
          (data:any)=>{
            this.quizes=this.quizes.filter((quiz:any)=>quiz.qid!=quizId);
            Swal.fire("Success !!","Quiz is successfully deleted !!","success");
          },
          (error)=>{
            Swal.fire("Error !!","Error in deleting quiz !!","error");
          }  
        )
      }
    })
  }


}
