
import { Component, OnInit,Input } from '@angular/core';
import  { FeedbackService  } from '../../_services/feedback.service';
import { error } from 'util';
import { Router } from '@angular/router';
declare var $:any;
declare var Materialize:any;
declare var jQuery: any;
@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  jobProfile:any[]=[];
  noRecords:boolean=false; 
  constructor(private feedbackService:FeedbackService,private router: Router) { }

  ngOnInit() {
    this.feedbackService.getFeedJobProfiles().subscribe((data:any)=>{        
      if(data != null && data.length > 0){
        this.jobProfile=data;
      }else{
        this.noRecords=true;
      }
    },(error)=>{
      console.log(error);
    })
  }

  getbidsForFeedback(id){    
    if(id != "" && id != undefined){
      this.router.navigate(['employer/feedback/'+id]);
    }
    
  }

  
}
