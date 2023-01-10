import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizId:any;
  quizTitle:any;
  question:any={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };
  constructor(private _route:ActivatedRoute,private _questionService:QuestionService) { }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params['qid'];
    this.quizTitle=this._route.snapshot.params['title'];
    this.question.quiz['qid']=this.quizId;
  }

  addQuestion(){
    if(this.question.content.trim()=='' || this.question.content==null){
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null){
      return;
    }
    
    this._questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success !!","Question added successfully !!","success");
        this.question={
          quiz:{},
          content:'',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          answer:''
        };
      },
      (error)=>{
        Swal.fire("Error !!","Error in adding question !!","error");
      }
    );

  }

}
