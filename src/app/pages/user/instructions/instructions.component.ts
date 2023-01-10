import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId:any;
  quiz:any;
  constructor(private _route:ActivatedRoute,private _quizService:QuizServiceService,private _router:Router) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params["qid"];
    this._quizService.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
      },
      (error)=>{
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    );
  }
  startQuiz(){
    Swal.fire({
      title:"Do you want to start the quiz ?",
      showCancelButton:true,
      confirmButtonText:"Start",
      icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.qId]);
      }
    })
  }

}
