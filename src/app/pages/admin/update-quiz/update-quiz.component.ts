import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quizId=0;
  quiz:any;
  categories:any=[];
  constructor( private _route:ActivatedRoute,private _quizService:QuizServiceService,private _categoryService:CategoryService,private _router:Router ) { }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params['qid'];
    this._quizService.getQuiz(this.quizId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz); 
      },
      (error)=>{
        console.log(error);
      }
    );

    this._categoryService.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        console.log("error>>>>>>>>>>>>",error);
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    )

  }

  //update data
  updateData(){
    this._quizService.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success !!","Quiz Updated Successfully !!","success").then((e)=>{
          this._router.navigate(['/admin/quizes'])
        });
      },
      (error)=>{
        console.log("error>>>>>>>>>>>>",error);
        Swal.fire("Error !!","Error in loading data !!","error");
      }
    )
  }

}
