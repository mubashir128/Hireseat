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
  accomTab = false;

  schoolName = "";
  companyName = "";
  highGPA;
  techMajor = "";
  degree = "";

  title = "";
  manageralExp = 0;
  managedTeamSize = 0;
  // totalYears = 0;

  comments = "";
  comment2 = "";
  comment3 = "";

  accom1 = "";
  accom2 = "";
  accom3 = "";

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
  public accomFrm: FormGroup;

  loggedInUser: any;
  isLoggedIn: boolean = false;
  
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
      // titleFrm : new FormControl(this.title, Validators.required),
      titleFrm : new FormControl(),
      manageralExpFrm : new FormControl(this.manageralExp, Validators.required),
      managedTeamSizeFrm : new FormControl(this.managedTeamSize, Validators.required),
      // totalYearsFrm : new FormControl(this.totalYears, Validators.required)
    });
    
    this.accomFrm = new FormGroup({
      accomFrm1 : new FormControl(this.accom1, Validators.required),
      accomFrm2 : new FormControl(),
      accomFrm3 : new FormControl()
    });

  }
  
  ngOnInit(){
    this.loggedInUser = this._userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
    }

    this.setCandidateCareerValueFinder();
    this.getSkillsets();
    this.getExperienceIndustries();
  }

  setCandidateCareerValueFinder(){
    if(this.loggedInUser.careerValueFinder === undefined){
      return ;
    }
    let localStorageUserInfo = JSON.parse(this.loggedInUser.careerValueFinder);
    if(localStorageUserInfo){
      this.schoolName = localStorageUserInfo.schoolName;
      this.companyName = localStorageUserInfo.companyName;
      this.highGPA = localStorageUserInfo.highGPA;
      this.techMajor = localStorageUserInfo.techMajor;
      
      this.degree = localStorageUserInfo.degree;
      this.title = localStorageUserInfo.title;
      this.manageralExp = localStorageUserInfo.manageralExp;
      this.managedTeamSize = localStorageUserInfo.managedTeamSize;
      // this.totalYears = localStorageUserInfo.totalYears;
      
      this.finalSkillSets = localStorageUserInfo.finalSkillSets;
      this.finalIndustriesAre = localStorageUserInfo.finalIndustriesAre;

      this.comments = localStorageUserInfo.comments;
      this.comment2 = localStorageUserInfo.comment2;
      this.comment3 = localStorageUserInfo.comment3;

      this.accom1 = localStorageUserInfo.accom1;
      this.accom2 = localStorageUserInfo.accom2;
      this.accom3 = localStorageUserInfo.accom3;
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

  getExperienceIndustries() {
    this.candidateService.getCandidateExperienceIndustries().subscribe((res) => {
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

    let temp = false;
    this.skillSets.forEach((item, index)=>{
      if(event.value.toLowerCase() == item.value.toLowerCase()){
        temp = true;
      }

      if(!temp && (index == this.skillSets.length - 1)){
        this.addNewTag(event);
      }

    });

    this.finalSkillSets = skillSets;
  }

  addNewTag(tag){
    tag.display = lib.trimSpaces(tag.display);
    tag.display = lib.titleCase(tag.display);

    this.resumeService.addNewTag(tag).subscribe(res => {
      if (res.result == "success") {
        Materialize.toast("New tag added successfully !", 1000);
      }
    }, error => {
      console.log(error);
    });
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
    let temp = false;
    if (this.SearchIndustryFrm.valid) {
      this.SearchIndustryFrm.value.industry.forEach((element, ind) => {
        this.mainIndustriesAre.forEach((it, index)=>{
          if(element.value.toLowerCase() == it.name.toLowerCase()){
            industriesAll.push(it);
          }
          
          if(it.name.toLowerCase() == event.value.toLowerCase()){
            temp = true;
          }

          if(!temp && (this.mainIndustriesAre.length - 1 == index) && (this.SearchIndustryFrm.value.industry.length - 1 == ind)){
            this.addNewExpIndustries(event);
          }

        });
      });
    } else {
      industriesAll = [];
    }
    this.finalIndustriesAre = industriesAll;
  }

  addNewExpIndustries(industry){
    industry.display = lib.trimSpaces(industry.display);
    let ind = {
      name : lib.titleCase(industry.display)
    }

    this.resumeService.addNewExpIndustries(ind).subscribe(res => {
      if (res.result == "success") {
        this.mainIndustriesAre.push(res.data);
        this.finalIndustriesAre.push(res.data);
        Materialize.toast("New tag added successfully !", 1000);
      }
    }, error => {
      console.log(error);
    });
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

  accomplishmentClick(){
    this.eduPageTab = false;
    this.accomTab = true;
  }

  industriesSkip(){
    this.industriesTab = false;
    this.eduPageTab = true;
  }

  accomSkip(){
    this.eduPageTab = true;
    this.accomTab = false;
  }

  industriesContinue(){
    this.industriesTab = false;
    this.accomTab = true;
    this.addIndustriesAre();
  }

  accomContinue(){
    if(this.accomFrm.valid){
      this.accomTab = false;
      this.eduPageTab = true;
    }else{
      Materialize.toast("Please Fill the form fields !", 1000);
    }
  }

  saveCandidateInfo(){ 
    let userInfo = {
      schoolName : this.schoolName,
      companyName : this.companyName,
      highGPA : this.highGPA,
      techMajor : this.techMajor,
      degree : this.degree,
      title : this.title,
      manageralExp : this.manageralExp,
      managedTeamSize : this.managedTeamSize,
      // totalYears : this.totalYears,
      finalSkillSets : this.finalSkillSets,
      finalIndustriesAre : this.finalIndustriesAre,
      comments : this.SearchInputFrm.value.comments,
      comment2 : this.SearchInputFrm.value.comment2,
      comment3 : this.SearchInputFrm.value.comment3,
      accom1 : this.accom1,
      accom2 : this.accom2,
      accom3 : this.accom3
    }
    
    let payload = {
      skills : this.finalSkillSets.join().toLowerCase(),
      industries : this.finalIndustriesAre,
      comments : this.SearchInputFrm.value.comments,
      comment2 : this.SearchInputFrm.value.comment2,
      comment3 : this.SearchInputFrm.value.comment3,
      careerValueFinder : JSON.stringify(userInfo)
    }

    this.candidateService.saveCandidateProfileData(payload).subscribe((res) => {
      if (res) {
        //add careerValueFinder to localStorage.
        let usrObj = this._userService.getUser();
        usrObj.userInfo.careerValueFinder = JSON.stringify(userInfo);
        localStorage.setItem('currentUser', JSON.stringify(usrObj));
        Materialize.toast("Profile updated successfully !", 1000, "blue");
        this._router.navigate(["/candidate/my-profile"]);
      }
    });
  }

}
