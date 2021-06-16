import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ResumeService } from 'src/app/_services/resume.service';
import { UserService } from 'src/app/_services/user.service';
import { of } from 'rxjs';
import * as lib from "src/app/lib-functions";
declare var Materialize: any;
@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class FillFormComponent implements OnInit {

  skillSetsTab = false;
  valuePropFinderTab = true;
  eduPageTab = false;
  secEduPageTab = false;
  workTab = false;
  industriesTab = false;

  schoolName = "";
  companyName = "";
  highGPA;
  techMajor = "";
  degree = "";

  title = "";
  manageralExp = 0;
  managedTeamSize = 0;
  totalYears = 0;

  comments = "";
  comment2 = "";
  comment3 = "";

  public tagsBind = [];
  public industryBind = []
  public skillSets = [];
  public mainIndustriesAre = [];
  public industriesAre = [];

  finalSkillSets = [];
  finalIndustriesAre = [];

  public SearchFrm: FormGroup;
  public SearchIndustryFrm: FormGroup;
  public SearchInputFrm: FormGroup;
  public showSkillsSetsFrm: FormGroup;
  public showIndustriesFrm: FormGroup;
  public educationFrm: FormGroup;
  public workFrm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private resumeService: ResumeService, private candidateService: CandidateService, private _router: Router, private _userService: UserService) {
    this.SearchFrm = this.formBuilder.group({
      tags : ["", Validators.required],
      tagsAre : ["", Validators.required]
    });

    this.SearchIndustryFrm = this.formBuilder.group({
      industry : ["", Validators.required],
      industryAre : ["", Validators.required]
    });

    this.SearchInputFrm = this.formBuilder.group({
      comments : ["", Validators.required],
      comment2 : ["", Validators.required],
      comment3 : ["", Validators.required]
    });

    this.showSkillsSetsFrm = this.formBuilder.group({
      showSkillsAre : ["", Validators.required],
    });
    
    this.showIndustriesFrm = this.formBuilder.group({
      showIndustriesAre : ["", Validators.required],
    });

    this.educationFrm = new FormGroup({
      schoolNameFrm : new FormControl(this.schoolName, Validators.required),
      highGPAFrm : new FormControl(this.highGPA, Validators.required),
      techMajorFrm : new FormControl(this.techMajor, Validators.required),
      degreeFrm : new FormControl(this.degree, Validators.required),
    });

    this.workFrm = new FormGroup({
      companyNameFrm : new FormControl(this.companyName, Validators.required),
      titleFrm : new FormControl(this.title, Validators.required),
      manageralExpFrm : new FormControl(this.manageralExp, Validators.required),
      managedTeamSizeFrm : new FormControl(this.managedTeamSize, Validators.required),
      totalYearsFrm : new FormControl(this.totalYears, Validators.required)
    });

  }
  
  ngOnInit(){
    this.setCandidateCareerValueFinder();
    this.getSkillsets();
    this.getIndustries();
  }

  setCandidateCareerValueFinder(){
    let localStorageUserInfo = this._userService.getCandidateCareerValueFinder();
    if(localStorageUserInfo){
      this.schoolName = localStorageUserInfo.schoolName;
      this.companyName = localStorageUserInfo.companyName;
      this.highGPA = localStorageUserInfo.highGPA;
      this.techMajor = localStorageUserInfo.techMajor;
      
      this.degree = localStorageUserInfo.degree;
      this.title = localStorageUserInfo.title;
      this.manageralExp = localStorageUserInfo.manageralExp;
      this.managedTeamSize = localStorageUserInfo.managedTeamSize;
      this.totalYears = localStorageUserInfo.totalYears;
      
      this.finalSkillSets = localStorageUserInfo.finalSkillSets;
      this.finalIndustriesAre = localStorageUserInfo.finalIndustriesAre;

      this.comments = localStorageUserInfo.comments;
      this.comment2 = localStorageUserInfo.comment2;
      this.comment3 = localStorageUserInfo.comment3;
    }
  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe((data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
          this.finalSkillSets.forEach((item, index)=>{
            this.skillSets.forEach((item2, index2)=>{
              if(item2.value.toLowerCase() == item.toLowerCase()){
                this.tagsBind.push(item2);
              }
            });
          });
        } else {
          this.skillSets = [];
        }
      }, error => {
        console.log(error);
      });
  }

  getIndustries() {
    this.candidateService.getCandidateIndustries().subscribe((res) => {
      if (res) {
        if (res.industries.length > 0) {
          this.mainIndustriesAre = res.industries;
          res.industries.forEach((item, index) => {
            this.industriesAre.push({
              display : item.name,
              value : item.name.toLowerCase()
            });
          });
          
          this.finalIndustriesAre.forEach((item, index)=>{
            this.mainIndustriesAre.forEach((item2, index2)=>{
              if(item2.name == item.name){
                this.industryBind.push({
                  display : item.name,
                  value : item.name.toLowerCase()
                });
              }
            });
          });

        } else {
          this.industriesAre = [];
        }
      }
    });
  }

  onSkillSetsAdd(event) {
    var skillSets = [];
    if (this.SearchFrm.valid) {
      this.SearchFrm.value.tags.forEach(element => {
        skillSets.push(element.value);
      });
    } else {
      skillSets = [];
    }
    this.finalSkillSets = skillSets;
  }

  onSkillSelect(item) {
    let temp = false;
    if(this.tagsBind.length > 0){
      this.tagsBind.forEach((item2, index)=>{
        if(item.value.toLowerCase() == item2.value.toLowerCase()){
          temp = true;
        }
        if(this.tagsBind.length-1 == index && !temp){
          this.tagsBind.push(item);
          this.finalSkillSets.push(item.value);
        }
      });
    }else{
      this.tagsBind.push(item);
      this.finalSkillSets.push(item.value);
    }
  }

  onIndustriesAdd(event) {
    var industriesAll = [];
    if (this.SearchIndustryFrm.valid) {
      this.SearchIndustryFrm.value.industry.forEach(element => {
        this.mainIndustriesAre.forEach((it, index)=>{
          if(element.value.toLowerCase() == it.name.toLowerCase()){
            industriesAll.push(it);
          }
        });
      });
    } else {
      industriesAll = [];
    }
    this.finalIndustriesAre = industriesAll;
  }

  onIndustriesSelect(item) {
    let temp = false;
    if(this.industryBind.length > 0){
      this.industryBind.forEach((item2, index)=>{
        if(item.value.toLowerCase() == item2.value.toLowerCase()){
          temp = true;
        }
        if(this.industryBind.length-1 == index && !temp){
          this.industryBind.push(item);

          this.mainIndustriesAre.forEach((it, index)=>{
            if(item.value.toLowerCase() == it.name.toLowerCase()){
              this.finalIndustriesAre.push(it);
            }
          });

        }
      });
    }else{
      this.industryBind.push(item);
      this.mainIndustriesAre.forEach((it, index)=>{
        if(item.value.toLowerCase() == it.name.toLowerCase()){
          this.finalIndustriesAre.push(it);
        }
      });
    }
  }

  addSkillAre(){
    // console.log("this.finalSkillSets : ",this.finalSkillSets);
  }

  addIndustriesAre(){
    // console.log("this.finalindustriesAre : ",this.finalIndustriesAre);
  }

  valuePropFinderBtn(){
    this.valuePropFinderTab = false;
    this.eduPageTab = true;
  }

  educationClick(){
    this.eduPageTab = false;
    this.secEduPageTab = true;
  }

  workClick(){
    this.eduPageTab = false;
    this.workTab = true;
  }

  secEduSkip(){
    this.secEduPageTab = false;
    this.eduPageTab = true;
  }

  secEduContinue(){
    if(this.educationFrm.valid){
      this.secEduPageTab = false;
      this.workTab = true;
    }else{
      Materialize.toast("Please Fill the form fields !", 1000);
    }
  }

  workSkip(){
    this.eduPageTab = true;
    this.workTab = false;
  }

  workContinue(){
    if(this.workFrm.valid){
      this.workTab = false;
      this.skillSetsTab = true;
    }else{
      Materialize.toast("Please Fill the form fields !", 1000);
    }
  }

  skillSetsClick(){
    this.eduPageTab = false;
    this.skillSetsTab = true;
  }

  skillSetsSkip(){
    this.skillSetsTab = false;
    this.eduPageTab = true;
  }

  skillSetsContinue(){
    this.skillSetsTab = false;
    this.industriesTab = true;
    this.addSkillAre();
  }

  industriesClick(){
    this.eduPageTab = false;
    this.industriesTab = true;
  }

  industriesSkip(){
    this.industriesTab = false;
    this.eduPageTab = true;
  }

  industriesContinue(){
    this.industriesTab = false;
    this.eduPageTab = true;
    this.addIndustriesAre();
  }

  saveCandidateInfo(){
    let payload = {
      skills : this.finalSkillSets.join().toLowerCase(),
      industries : this.finalIndustriesAre,
      comments : this.SearchInputFrm.value.comments ,
      comment2 : this.SearchInputFrm.value.comment2 ,
      comment3 : this.SearchInputFrm.value.comment3 
    }

    let userInfo = {
      schoolName : this.schoolName,
      companyName : this.companyName,
      highGPA : this.highGPA,
      techMajor : this.techMajor,
      degree : this.degree,
      title : this.title,
      manageralExp : this.manageralExp,
      managedTeamSize : this.managedTeamSize,
      totalYears : this.totalYears,
      finalSkillSets : this.finalSkillSets,
      finalIndustriesAre : this.finalIndustriesAre,
      comments : this.SearchInputFrm.value.comments,
      comment2 : this.SearchInputFrm.value.comment2,
      comment3 : this.SearchInputFrm.value.comment3
    }
    
    this.candidateService.saveCandidateProfileData(payload).subscribe((res) => {
      if (res) {
        this._userService.setCandidateCareerValueFinder(userInfo);
        Materialize.toast("Profile updated successfully !", 3000, "blue");
        this._router.navigate(["/candidate/my-profile"]);
      }
    });
  }

}
