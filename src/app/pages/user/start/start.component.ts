import { QuestionService } from './../../../services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qId:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private _location:LocationStrategy,private _questionService:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId=this._route.snapshot.params["qid"];
    this.loadQuestions();
  }

  loadQuestions(){
    this._questionService.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error)=>{
        Swal.fire("Error !!","Error in loading questions !!","error");
      }
    );
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this._location.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }
}
