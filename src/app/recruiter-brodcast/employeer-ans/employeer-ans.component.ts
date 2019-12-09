import { Component, OnInit, Input } from '@angular/core';
import { IBiddingEvent } from 'src/app/models/bidding-event';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { count } from 'rxjs/operators';
declare var Materialize;
@Component({
  selector: 'app-employeer-ans',
  templateUrl: './employeer-ans.component.html',
  styleUrls: ['./employeer-ans.component.css']
})
export class EmployeerAnsComponent implements OnInit {
  @Input() public biddingEvent: IBiddingEvent;
  user: any;
  id: any;
  question: any;
  quetionsData: any;
  selectedId = -1;
  answer;
  show:boolean = false;
 showdata:boolean = true;
 count:number = 0;
  queid: any;
  queDetails: any;
  shownotification = false;
  constructor(private router: Router, private route: ActivatedRoute,private bidEventService:BiddingEventService) { }

  ngOnInit() {
    // console.log(this.biddingEvent);
    this.user = JSON.parse(localStorage.getItem('currentUser')).userInfo
    this.id = this.route.snapshot.paramMap.get('key');
    // console.log(this.id);
  
    
    this.bidEventService.getAllQuestions(this.id,this.user.userRole).subscribe((data)=>{
     
      this.quetionsData = data;
      this.route.queryParams.subscribe(params =>{
        this.queid = params['queid'];
        this.queDetails = this.quetionsData.find(que => que._id === params['queid']);
        this.shownotification = true;
      })
 
      this.quetionsData.forEach(element => {
        if(!element.Ans){
          this.count++
        }
      });
     
    })
    
  }
  showpostAns(evt,_id){
    this.selectedId = evt;
    this.show = true;
    this.shownotification = false;
  }
  showDiv(){
    this.showdata = !this.showdata;
  }
  postAns(selectedId){
    var ans ={
      id: selectedId,
      Ans:this.answer,
    
    }
    this.bidEventService.AddRecruiterQueAns(ans).subscribe((data)=>{
      // console.log(data);
      Materialize.toast('Answere Added Successfully', 1000);
      this.show = false;
      this.shownotification = false;
      this.count--;
      this.bidEventService.getAllQuestions(this.id,this.user.userRole).subscribe((data)=>{
     
        this.quetionsData = data;
     
        
        
        
      })
    })
  }
}
