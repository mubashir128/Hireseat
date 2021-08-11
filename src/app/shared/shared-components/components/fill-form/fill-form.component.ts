import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ResumeService } from 'src/app/_services/resume.service';
import { UserService } from 'src/app/_services/user.service';
import { of } from 'rxjs';
import * as lib from "src/app/lib-functions";
import { CandidateCarrerService } from 'src/app/_services/candidate-carrer.service';
import { ReadResumeService } from 'src/app/_services/read-resume.service';
declare var Materialize: any;

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class FillFormComponent implements OnInit, OnDestroy {

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
  accom4 = "";
  accom5 = "";

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

  saveRedirect = false;
  
  schoolsArray = [];
  techMajorArray = [];
  degreeArray = [];
  titleArray = [];
  companiesArray = [];
  
  constructor(private formBuilder: FormBuilder, private resumeService: ResumeService, private candidateService: CandidateService, private _router: Router, private _userService: UserService, 
    private _candidateCarrer : CandidateCarrerService,
    private _readResume : ReadResumeService
  ) {
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
      accomFrm3 : new FormControl(),
      accomFrm4 : new FormControl(),
      accomFrm5 : new FormControl()
    });

  }
  
  ngOnInit(){
    this.loggedInUser = this._userService.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
    }

    this.schoolsArray = this._candidateCarrer.getSchool();
    this.techMajorArray = this._candidateCarrer.getTechnocalMajor();
    this.degreeArray =this._candidateCarrer.getDegree();
    this.titleArray = this._candidateCarrer.getTitle();
    this.companiesArray =  this._candidateCarrer.getCompanies();

    this.setCandidateCareerValueFinder();
    this.getSkillsets();
    this.getExperienceIndustries();

    this.getResumeValues();
  }

  getResumeValues(){
    this.resumeService.getResumeSkillsets().subscribe((res: any) => {
      this.expBoxValues(res.data);
    });
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
      this.accom4 = localStorageUserInfo.accom4;
      this.accom5 = localStorageUserInfo.accom5;
    }

    this.resumeService.getResumeSkillsets().subscribe((res: any) => {
      let resumeData = res.data.toLowerCase();
      this.schoolsArray.forEach((school, index)=>{
        if(resumeData.search(school.toLowerCase()) !== -1){
          this.schoolName = school;
        }
      });

      this.techMajorArray.forEach((techMaj, index)=>{
        if(resumeData.search(techMaj.toLowerCase()) !== -1){
          this.techMajor = techMaj;
        }
      });
      
      this.degreeArray.forEach((degreeA, index)=>{
        if(resumeData.search(degreeA.toLowerCase()) !== -1){
          this.degree = degreeA;
        }
      });

      this.titleArray.forEach((titleA, index)=>{
        if(resumeData.search(titleA.toLowerCase()) !== -1){
          this.title = titleA;
        }
      });

      this.companiesArray.forEach((companiesA, index)=>{
        if(resumeData.search(companiesA.toLowerCase()) !== -1){
          if(this.companyName !== ""){
            //check already exists or not.
            if(this.companyName.toLocaleLowerCase().indexOf(companiesA.toLowerCase()) == -1){
              this.companyName = this.companyName +" , "+ companiesA;
            }
          }else{
            this.companyName = companiesA;
          }
        }
      });

    });

  }

  async expBoxValues(allResumeData){
    this.accom1 = "";
    this.accom2 = "";
    this.accom3 = "";
    this.accom4 = "";
    this.accom5 = "";

    let finalStatementsArr = [];
    finalStatementsArr = await this._readResume.readResume({resumeDataIs : allResumeData});

    //combine first three statements.
    finalStatementsArr.forEach((val ,index)=>{

      switch(index){
        case 0 : 
          this.accom1 = val.stm;
          this.comment2 = val.stm;
          break;
        case 1 : 
          this.accom2 = val.stm;
          this.comment3 = val.stm;
          break;
        case 2 : 
          this.accom3 = val.stm;
          break;
        case 3 : 
          this.accom4 = val.stm;
          break;
        case 4 : 
          this.accom5 = val.stm;
          break;
        default : 
          break;
      }

    });

    this.addFirstBoxValues2();
  }

  addFirstBoxValues(){
    this.comments = "Education : \n"+
                      "  - I went to "+this.schoolName+". \n"+
                      "  - I have a GPA of "+this.highGPA+" and a "+this.techMajor+" major. \n"+
                      "  - "+this.degree+" degree. \n\n"+

                    "Work exp : \n"+
                      "  - I worked at "+this.companyName+". \n"+
                      "  - I had a title of "+this.title+". \n"+
                      "  - I have "+this.manageralExp+" Managerial experience. \n"+
                      "  - I have managed a team of "+this.managedTeamSize+" for "+this.manageralExp+" years. \n";
  }

  addFirstBoxValues2(){
    this.comments = "";
    if(this.schoolName !== ''){
      this.comments = "Education : \n"+
                      "  - I went to "+this.schoolName+". \n";
      if(this.highGPA == undefined || this.highGPA == null || this.highGPA == 0){
        //
      }else{
        this.comments += "  - I have a GPA of "+this.highGPA+". \n";
      }

      if(this.techMajor !== ''){
        this.comments += "  - A "+this.techMajor+" major. \n";
      }
      if(this.degree !== ''){
        this.comments += "  - "+this.degree+" degree. \n";
      }
      this.comments += "\n";
    }

    if(this.companyName !== ''){
      this.comments += "Work exp : \n"+
                        "  - I worked at "+this.companyName+". \n";
      if(this.title !== ''){
        this.comments += "  - I had a title of "+this.title+". \n";
      }

      if(this.manageralExp == undefined || this.manageralExp == null || this.manageralExp == 0){
        //
      }else{
        this.comments += "  - I have "+this.manageralExp+" Managerial experience. \n";
      }

      if(this.managedTeamSize == undefined || this.managedTeamSize == null || this.managedTeamSize == 0){
        //
      }else{
        this.comments += "  - I have managed a team of "+this.managedTeamSize;
        if(this.manageralExp == undefined || this.manageralExp == null || this.manageralExp == 0){
          //
          this.comments += " . \n";
        }else{
          this.comments += " for "+this.manageralExp+" years. \n";
        }
      }
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

      this.resumeService.getResumeSkillsets().subscribe((res: any) => {
        let resumeData = res.data.toLowerCase();
        // Materialize.toast("pdf readed successfully : ", 700);
        this.skillSets.forEach((item2, index2)=>{
          if(resumeData.search(item2.value.toLowerCase()) !== -1){
            if(this.tagsBind.length === 0){
              this.tagsBind.push(item2);
              this.finalSkillSets.push(item2.value.toLowerCase());
            }else{
              let temp = false;
              this.tagsBind.forEach((item, index)=>{
                if(item.value.toLowerCase() == item2.value.toLowerCase()){
                  temp = true;
                }
                if(index == this.tagsBind.length - 1 && !temp){
                  this.tagsBind.push(item2);
                  this.finalSkillSets.push(item2.value.toLowerCase());
                }
              });
            }
          }else{
            // console.log("--- not found : ",item2.value.toLowerCase());
          }
        });
      });

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

        this.resumeService.getResumeSkillsets().subscribe((res: any) => {
          let resumeData = res.data.toLowerCase();
          // Materialize.toast("pdf readed successfully : ", 700);
          this.mainIndustriesAre.forEach((item2, index2)=>{
            if(resumeData.search(item2.name.toLowerCase()) !== -1){
              if(this.industryBind.length === 0){
                this.industryBind.push({
                  display : item2.name,
                  value : item2.name.toLowerCase()
                });
                this.finalIndustriesAre.push(item2);
              }else{
                let temp = false;
                this.industryBind.forEach((item, index)=>{

                  if(item.value.toLowerCase() == item2.name.toLowerCase()){
                    temp = true;
                  }
                  if(index == this.industryBind.length - 1 && !temp){
                    this.industryBind.push({
                      display : item2.name,
                      value : item2.name.toLowerCase()
                    });
                    this.finalIndustriesAre.push(item2);
                  }

                });
              }
            }else{
              // console.log("--- not found : ",item2.name.toLowerCase());
            }
          });

        });

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
    // this.expBoxValues();
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

    // this.expBoxValues();

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
    this.addFirstBoxValues2();
  }

  secEduContinue(){
    if(this.educationFrm.valid){
      this.secEduPageTab = false;
      this.workTab = true;
      this.addFirstBoxValues2();
    }else{
      Materialize.toast("Please Fill the form fields !", 1000);
    }
  }

  workSkip(){
    this.eduPageTab = true;
    this.workTab = false;
    this.addFirstBoxValues2();
  }

  workContinue(){
    if(this.workFrm.valid){
      this.workTab = false;
      this.skillSetsTab = true;
      this.addFirstBoxValues2();
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

  saveCandidateInfo(autoSave){
    this.saveRedirect = true;
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
      accom3 : this.accom3,
      accom4 : this.accom4,
      accom5 : this.accom5
    }
    
    let payload = {
      // skills : this.finalSkillSets.join().toLowerCase(),
      // industries : this.finalIndustriesAre,
      comments : autoSave ? "" : this.SearchInputFrm.value.comments,
      comment2 : autoSave ? "" : this.SearchInputFrm.value.comment2,
      comment3 : autoSave ? "" : this.SearchInputFrm.value.comment3,
      careerValueFinder : JSON.stringify(userInfo)
    }

    this.candidateService.saveCandidateProfileData(payload).subscribe((res) => {
      if (res) {
        //add careerValueFinder to localStorage.
        let usrObj = this._userService.getUser();
        usrObj.userInfo.careerValueFinder = JSON.stringify(userInfo);
        localStorage.setItem('currentUser', JSON.stringify(usrObj));
        if(!autoSave){
          Materialize.toast("Profile updated successfully !", 1000, "blue");
        }
        this._router.navigate(["/candidate/my-profile"]);
      }
    });
  }

  ngOnDestroy() {
    if(!this.saveRedirect){
      //auto save
      this.saveCandidateInfo(true);
    }
  }

}
