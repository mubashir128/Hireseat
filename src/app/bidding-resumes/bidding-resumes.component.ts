import { Component, Input, OnChanges } from '@angular/core';
import { BidService } from '../_services/bid.service';
import { IBid } from '../models/bid';
import { IResume, Resume } from '../models/resume';
import { ResumeService } from '../_services/resume.service';
import { UserService } from '../_services/user.service';
declare var jQuery; 
declare var Materialize;

@Component({
  selector: 'app-bidding-resumes',
  templateUrl: './bidding-resumes.component.html',
  styleUrls: ['./bidding-resumes.component.css']
})
export class BiddingResumesComponent implements OnChanges {
  @Input() bids: IBid[];
  @Input() bidStatus: string;
  bidArr:any=[];
  topBids: IBid[];
  bottomBid: IBid;
  resumeVisible: number = 0;
  resume: IResume;
  Point1:String;
  StrongPoint1:String;
  StrongPoint2:String;
  StrongPoint3:String;
  experienceMatchPoints:Number=0;
  personalityMatchPoints:Number=0;
  skillsMatchPoints:Number=0;
  bidsCount: number = 0;
  comment:string='';
  constructor(private bidService: BidService, private resumeService: ResumeService,private userService:UserService) { }

  ngOnChanges() {
    jQuery('.modal').modal();
    if(this.bids != undefined){
      this.bidArr=this.bids
    this.bidsCount=this.bidArr.length;      
      this.bids.forEach((element)=>{
        this.userService.getRecruiterProfile(element.recruiterKey).subscribe((data)=>{
          if(data != undefined && data != null){
            element.recruiterName=data.companyName;
          }                    
        },(error)=>{
          console.log(error);
        })
      })
    }
  } 

  showResume(bid: IBid) {
    this.StrongPoint1=bid.StrongPoint1;
    this.StrongPoint2=bid.StrongPoint2;
    this.StrongPoint3=bid.StrongPoint3;
    this.comment=bid.comment;
    this.experienceMatchPoints=bid.experienceMatchPoints;
    this.personalityMatchPoints=bid.personalityMatchPoints;
    this.skillsMatchPoints=bid.skillsMatchPoints;
    jQuery('#BiddingResumePoints').modal('open');   
}



}
