import { Component, OnInit ,Output,EventEmitter,Input,AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery: any;


import{} from '../view-forum.component'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css',
  '../view-forum.component.css']
})
export class QuestionsComponent implements OnInit,AfterViewInit {
  @Input()questData=[] ;  
  id:any;
  selectedItem:any;
  constructor(private router:Router,private route:ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(params=>{this.id=params});
  
    // setTimeout(() => {
    //   jQuery("#"+this.id.id).addClass("activeClass");
    // }, 100);
    
  }
  ngAfterViewInit(){
    jQuery("#"+this.id.id).addClass("activeClass");
  }
  sendDetails(_id){
    this.router.navigate(['/question-details/', _id]); 
    
  }
  addActiveClass(element){
    console.log(element)
  }

}
