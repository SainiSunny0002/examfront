import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizes:any;
  constructor(private _route:ActivatedRoute,private _quizService:QuizServiceService) { }

  ngOnInit(): void {
    // this.catId=this._route.snapshot.params['catId'];
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];
      
    if(this.catId==0){
      //load all quizes
      this._quizService.getActiveQuizes().subscribe(
        (data:any)=>{
          this.quizes=data;
        },
        (error)=>{
          Swal.fire("Error !!","Error in loading quizes !!","error");
        }
      );
    }else{
      //load specific quiz
      this._quizService.getActiveQuizesOfCategory(this.catId).subscribe(
        (data:any)=>{
          this.quizes=data;
        },
        (error:any)=>{
          Swal.fire("Error !!","Error in loading data !!","error");
        }
      );
    }
    });
  }

}
