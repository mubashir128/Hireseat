
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { ResumeService } from 'src/app/_services/resume.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-search-resume',
  templateUrl: './search-resume.component.html',
  styleUrls: ['./search-resume.component.css']
})
export class SearchResumeComponent implements OnInit {
  public chkLoggedInUser: any;
  public skillSets = [];
  public SearchFrm: FormGroup;
  public searchedResume: any=[];
  public p=0;
  tags: any;
  id: any;
  constructor(private userService: UserService, private sanitizer: DomSanitizer,private router: Router, private resumeService: ResumeService,
    private formBuilder: FormBuilder) {
    this.SearchFrm = this.formBuilder.group({
      tags: ['', Validators.required]
    });
  }

  get f() { return this.SearchFrm.controls; }

  ngOnInit() {
    jQuery('.modal').modal();
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        this.router.navigate(['employer/bidding-event-list']);
      } else {
        this.getSkillsets();
      }
    }
    var skillset=null;
    this.getResumesBySkills(skillset);
  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe((data: any) => {
      if (data.length > 0) {
        this.skillSets = data;
      } else {
        this.skillSets = [];
      }
    }, (error) => {
      console.log(error);
    })
  }

  submit() {
    if (this.SearchFrm.valid) {
      var skillSets = [];
      this.SearchFrm.value.tags.forEach(element => {
        skillSets.push(element.value);
      });
      this.getResumesBySkills(skillSets);    
    } else {
      Materialize.toast('Select Skill Sets First !', 2000);
      return;
    }
  }

  getResumesBySkills(skillSets){
    this.resumeService.getResumeBySkillSets(skillSets).subscribe((data: any) => {        
      if (data.length > 0) {
        this.searchedResume = data;
        // console.log(this.searchedResume);
      } else {
        this.searchedResume = [];
      }
    }, (error) => {
      console.log(error);
    })
  }

  showUploadModel(eventid){
    this.id = eventid;
    jQuery('#Conformation').modal('open');
  }
  closed(){
    jQuery('#Conformation').modal('close');
  }
  addToResumeRepo(){
    this.resumeService.addToResumeRepo(this.id).subscribe((data)=>{
      //console.log(data.res);
      if(data.res == 'exists'){
        Materialize.toast('Already Added !', 1000);
        jQuery('#Conformation').modal('close');
      }else if(data.res == 'success'){
        Materialize.toast('Added to resume repository !', 1000)
        jQuery('#Conformation').modal('close');
      }else{
        Materialize.toast('Something went wrong !', 1000);
        jQuery('#Conformation').modal('close');
      }
    },(error)=>{
      console.log(error)
    })
  }

  transform(url) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

}
