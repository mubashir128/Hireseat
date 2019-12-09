import { Component, OnInit } from '@angular/core';
import { BiddingEvent } from 'src/app/models/bidding-event';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResumeBank } from 'src/app/models/resumebank';
import * as lib from '../../lib-functions';
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.css']
})
export class JobpostComponent implements OnInit {
  biddingEvents;
  returnUrl: any;
  chkLoggedInUser: any;
  public newResumeFrm: FormGroup;
  downloadURL: string = '';
  fileUploaded: number = 0;
  resume: ResumeBank;
  tags: any;
  public skillSets = [];
  id: any;
  array: any;
  resume_type: string;
 limit = 6;
  constructor(private bidEventService:BiddingEventService,private router: Router, private route: ActivatedRoute,private userService:UserService,private formBuilder: FormBuilder, private resumeService: ResumeService, private spinner: NgxSpinnerService) 
  {
    this.resume = new ResumeBank();

   }

  ngOnInit() {
    this.getSkillset();
    this.newResumeFrm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      tags: ['', Validators.required],
      experience: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(2)])]
    });
  
    // jQuery('#ResuemFrm').modal('close');
    this.bidEventService.getAllJobProfile(this.limit).subscribe((data)=>{        
      this.biddingEvents=data;
   
        
     
       },(error)=>{
     
     console.log(error);
    });
    this.chkLoggedInUser=this.userService.getUserData();
  
  }
  truncateHTML(text: string): string {

    let charlimit = 250;
    if(!text || text.length <= charlimit )
    {
        return text;
    }

  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let trim_space =  without_html.trim().replace(/&nbsp;/g, '');
  let shortened = trim_space.substring(0, charlimit) + "...";
  return shortened;
}

  showUploadModel(eventid){
    this.id = eventid;
    jQuery('.modal').modal();
    jQuery('#ResuemFrm').modal('open');
  }
  select(eventid){
    this.router.navigate(['bidding-events/details/'+eventid]);
  }
  getSkillset(){
    this.resumeService.getSkillSets().subscribe((data: any) => {      
      if (data.length > 0) {
        this.skillSets = data
      }
    }, (error) => {
      console.log(error);
    })
  
  }
  pageCount(){
    return this.biddingEvents.length;
    
   }
 
   getMoreData(){
     var limit = this.pageCount()+6;
     this.bidEventService.getAllJobProfile(limit).subscribe((data)=>{        
      this.biddingEvents=data;
   
        
     
       },(error)=>{
     
     console.log(error);
    });
   }
  get f() { return this.newResumeFrm.controls; }

  fileChange(event) {
  
    this.spinner.show();
    if (event.target.files[0]) {
      var fdata = new FormData();
      fdata.append('file', event.target.files[0]);
      
      this.resumeService.uploadResumeInBank(fdata).subscribe((data: any) => {
        if (data.result) {
          this.downloadURL = data.result;
          this.resume.fileURL = data.result;
          this.fileUploaded = 2;
          fdata.append('jobPostProfieId',this.id);
          this.spinner.hide();
          Materialize.toast('Resume Uploaded Successfully !', 1000)
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000)
        }
      },
        (error) => {
          this.spinner.hide();
          console.log(error);
          if (error) {
            Materialize.toast('Something Went Wrong !', 1000)
          }
        });
    }
  }
  closed(){
    jQuery('#ResuemFrm').modal('close');
  }
  submit() {
    this.spinner.show();
    if (this.newResumeFrm.valid && this.resume.fileURL != "") {
  
      this.resume.jobPostProfieId = this.id;
        this.resumeService.addToResumeBank(this.resume).subscribe((data: any) => {
        if (data.res == "success") {
          this.spinner.hide();
          // this.resume_type ='suggested';
          // this.resumeService.addToResumeRepo(this.id,this.resume_type).subscribe((data:any)=>{
          //   Materialize.toast('Resume added to resume data successfully !', 5000);
          // })
          Materialize.toast('Resume added to bank successfully !', 5000);
          this.newResumeFrm.reset();
          
          this.resume.fileURL = "";
          this.fileUploaded=0;
          jQuery('#ResuemFrm').modal('close');
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000);
        }
      },
        (error) => {
          console.log(error);
          Materialize.toast('Something Went Wrong !', 1000);
          this.spinner.hide();
        });
    } else {
      Materialize.toast('Please Fill the form fields !', 1000);
      this.spinner.hide();
      return;
    }
  }

 
 
  addTag(tag){
    tag.display =lib.trimSpaces(tag.display);
    tag.display = lib.titleCase(tag.display);
    if(lib.searchObjectArray(tag.value,this.skillSets)){
      return;
    }
    this.resumeService.addNewTag(tag).subscribe((response)=>{
      if(response.result == 'success'){
        Materialize.toast('New tag added successfully !', 1000);
      }  
     
    },(error)=>{
      console.log(error);
    })
  }
  removeTag(tag){
    if(lib.searchObjectArray(tag.value,this.skillSets)){
      return;
    }
    this.resumeService.removeNewTag(tag).subscribe((response)=>{
      if(response.result == 'success'){
        Materialize.toast('New tag removed successfully !', 1000);
      }  
    },(error)=>{
      console.log(error);
    })
  }

}
