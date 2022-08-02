import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';
import { UserService } from 'src/app/_services/user.service';
import * as lib from "src/app/lib-functions";
import { CandidateService } from 'src/app/_services/candidate.service';
import { Router } from '@angular/router';
import { ReadResumeService } from 'src/app/_services/read-resume.service';
import { CandidateCarrerService } from 'src/app/_services/candidate-carrer.service';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';

declare var Materialize: any;

export class AccomplishmentType{
  type : string;
  header : string;
  checked: boolean;
  value: number;
  constructor(type, header, checked, value){
    this.type = type;
    this.header = header;
    this.checked = checked;
    this.value = value;
  }
}

@Component({
  selector: 'app-edit-highlights',
  templateUrl: './edit-highlights.component.html',
  styleUrls: ['./edit-highlights.component.css']
})
export class EditHighlightsComponent implements OnInit {

  loggedInUser: any;
  finalSkillSets = [];
  skillSets = [];
  tagsBind = [];

  industryBind = [];
  mainIndustriesAre = [];
  finalIndustriesAre = [];
  industriesAre = [];

  resumeTabFrm: FormGroup;
  importantTabFrm: FormGroup;
  accomplishmentTabFrm: FormGroup;

  showSkillsSetsFrm: FormGroup;
  showIndustriesFrm: FormGroup;

  fileUploaded: number = 0;
  downloadURL: string = "";
  uploadFileName: string = "";
  file: File;

  accomplishmentArray : Array<AccomplishmentType>;

  educationBindArray = [];
  educationBind: string = "";

  techMajorArray = [];
  techMajor: string = ""

  degreeArray = [];
  degree: string = "";


  limitNumber: number = 3;
  checkedNumber: number = 0;

  comments : string = "";
  comment2 : string = "";
  comment3 : string = "";

  isLinear = true;
  isEditable = true;

  progress: Observable<any>;
  progressPercent: Number;
  inProgress: boolean = false;
  
  progress2: Observable<any>;
  progressPercent2: Number;
  inProgress2: boolean = false;

  candidateProfile: any = {};
  generateStatement: string = "Experience with ";
  resumeData: string = "";

  constructor(private resumeService: ResumeService, 
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private _router: Router,
    private _readResume : ReadResumeService,
    private _candidateCarrer : CandidateCarrerService
  ){
    this.loggedInUser = this.userService.getUserData();

    this.resumeTabFrm = this.formBuilder.group({
    });

    this.importantTabFrm = this.formBuilder.group({
      tags : [""],
      industry : [""],
      education : [""],
      techMajor : [""],
      degree : [""]
    });

    this.accomplishmentTabFrm = this.formBuilder.group({
      accomFrm1 : new FormControl(),
      accomFrm2 : new FormControl(),
      accomFrm3 : new FormControl(),
      accomFrm4 : new FormControl(),
      accomFrm5 : new FormControl()
    });

    this.showSkillsSetsFrm = this.formBuilder.group({
      showSkillsAre : ["", Validators.required],
    });
    
    this.showIndustriesFrm = this.formBuilder.group({
      showIndustriesAre : ["", Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.educationBindArray = this._candidateCarrer.getSchool();
    this.techMajorArray = this._candidateCarrer.getTechnocalMajor();
    this.degreeArray =this._candidateCarrer.getDegree();

    this.showSkills();
    this.showIndustries();
    
    this.accomplishmentArray = [];
    this.accomplishmentArray.push(new AccomplishmentType("accomFrm1", "Accomplishment/Unique Experience 1.", false, 0));
    this.accomplishmentArray.push(new AccomplishmentType("accomFrm2", "Accomplishment/Unique Experience 2.", false, 0));
    this.accomplishmentArray.push(new AccomplishmentType("accomFrm3", "Accomplishment/Unique Experience 3.", false, 0));
    this.accomplishmentArray.push(new AccomplishmentType("accomFrm4", "Accomplishment/Unique Experience 4.", false, 0));
    this.accomplishmentArray.push(new AccomplishmentType("accomFrm5", "Accomplishment/Unique Experience 5.", false, 0));
  }

  showSkills(){
    this.tagsBind = [];
    let promiseAll = [];
    promiseAll.push(this.resumeService.getSkillSets().toPromise());
    promiseAll.push(this.candidateService.getCandidateProfile().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.skillSets = result[0];
      this.resumeData = result[1].resumeDataIs ? result[1].resumeDataIs.toLowerCase() : "";
      this.getEducation();
      this.expBoxValues();
      this.candidateProfile = result[1] ? result[1] : {};
      this.skillSets.forEach((item, index)=>{
        if(this.resumeData && this.resumeData.indexOf(item.value.toLowerCase()) !== -1){
          this.tagsBind.push(item);
          this.finalSkillSets.push(item.value.toLowerCase());
        }
      });
      this.tagsBind = this._readResume.getSortSkillsResult2(this.tagsBind);
      this.finalSkillSets = this._readResume.getSortSkillsResult(this.finalSkillSets);
    });
  }

  createStatement(){
    this.generateStatement = "Experience with ";
    if(this.candidateProfile.jobTitle !== ""){
      this.generateStatement = this.candidateProfile.jobTitle + " with experience with ";
    }else if(this.candidateProfile.desiredRoles !== ""){
      this.generateStatement = this.candidateProfile.desiredRoles + " with experience with ";
    }
    this.generateStatement += this.getTopThreeIndustries() + " and ";
    this.generateStatement += this.getTopThreeSkills();
  }

  getTopThreeSkills(){
    return this._readResume.getTopSkills(3, this.finalSkillSets);
  }

  getTopThreeIndustries(){
    return this._readResume.getTopIndustries(3, this.finalIndustriesAre);
  }

  getEducation(){
    this.educationBind = "";
    this.educationBindArray.forEach((edu, index)=>{
      if(this.resumeData.indexOf(edu.toLowerCase()) !== -1){
        this.educationBind = edu;
      }
    });

    this.techMajor = "";
    this.techMajorArray.forEach((techMaj, index)=>{
      if(this.resumeData.indexOf(techMaj.toLowerCase()) !== -1){
        this.techMajor = techMaj;
      }
    });
    
    this.degree = "";
    this.degreeArray.forEach((degreeA, index)=>{
      if(this.resumeData.indexOf(degreeA.toLowerCase()) !== -1){
        this.degree = degreeA;
      }
    });

  }

  async expBoxValues(){

    let finalStatementsArr = [];
    finalStatementsArr = await this._readResume.readResume({resumeDataIs : this.resumeData});

    //combine first three statements.
    finalStatementsArr.forEach((val ,index)=>{
      switch(index){
        case 0 : 
          this.accomplishmentTabFrm.get('accomFrm1').setValue(val.stm);
          this.accomplishmentArray[0].value = val.value;
          break;
        case 1 : 
          this.accomplishmentTabFrm.controls['accomFrm2'].setValue(val.stm);
          this.accomplishmentArray[1].value = val.value;
          break;
        case 2 : 
          this.accomplishmentTabFrm.controls['accomFrm3'].setValue(val.stm);
          this.accomplishmentArray[2].value = val.value;
          break;
        case 3 : 
          this.accomplishmentTabFrm.controls['accomFrm4'].setValue(val.stm);
          this.accomplishmentArray[3].value = val.value;
          break;
        case 4 : 
          this.accomplishmentTabFrm.controls['accomFrm5'].setValue(val.stm);
          this.accomplishmentArray[4].value = val.value;
          break;
        default : 
          break;
      }
    });
  }

  onSkillSetsAdd(event) {
    var skillSets = [];
    if (this.importantTabFrm.valid) {
      this.importantTabFrm.value.tags.forEach(element => {
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

  showIndustries(){
    this.industryBind = [];
    let promiseAll = [];
    promiseAll.push(this.candidateService.getCandidateExperienceIndustries().toPromise());
    promiseAll.push(this.candidateService.getCandidateProfile().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.mainIndustriesAre = result[0].industries;
      this.resumeData = result[1].resumeDataIs ? result[1].resumeDataIs.toLowerCase() : "";
      this.mainIndustriesAre.forEach((item)=>{
        this.industriesAre.push({
          display : item.name,
          value : item.name.toLowerCase()
        });
        if(this.resumeData.indexOf(item.name.toLowerCase()) !== -1){
          this.industryBind.push({
            display : item.name,
            value : item.name.toLowerCase()
          });
          this.finalIndustriesAre.push(item);
        }
      });
      this.industryBind = this._readResume.getSortIndustriesResult2(this.industryBind);
      this.finalIndustriesAre = this._readResume.getSortIndustriesResult(this.finalIndustriesAre);
    });
  }

  onIndustriesAdd(event) {
    var industriesAll = [];
    let temp = false;
    if (this.importantTabFrm.valid) {
      this.importantTabFrm.value.industry.forEach((element, ind) => {
        this.mainIndustriesAre.forEach((it, index)=>{
          if(element.value.toLowerCase() == it.name.toLowerCase()){
            industriesAll.push(it);
          }
          
          if(it.name.toLowerCase() == event.value.toLowerCase()){
            temp = true;
          }

          if(!temp && (this.mainIndustriesAre.length - 1 == index) && (this.importantTabFrm.value.industry.length - 1 == ind)){
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

  nextResume(stepper){
    this.goForward(stepper);
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  edit(stepper){
    stepper.selectedIndex = 0;
  }

  save(){
    this._readResume.removeDuplicateSkills(this.finalSkillSets);
    this._readResume.removeDuplicateIndustries(this.finalIndustriesAre);
    let userInfo = {
      fileURL : this.downloadURL,
      education : this.educationBind,
      skills : this.finalSkillSets.join(","),
      industries : this.finalIndustriesAre,
      comments : this.comments,
      comment2 : this.comment2,
      comment3 : this.comment3
    }

    this.progress2 = this.candidateService.saveCandidateProfileDuringHighlightsData(userInfo);
    this.progressPercent2 = 0;
    this.progress2.subscribe(progress => {
      console.log(`Upload ${progress.percent}% completed`);
      this.inProgress2 = true;
      this.progressPercent2 = progress.percent;
      if(progress.completeStatus && progress.body){
          this._router.navigate(["/"+this.loggedInUser.userRole+"/my-posted-profiles"]);
        }
      }, error => {
        this.inProgress2 = false;
        this.progressPercent2 = 0;
        Materialize.toast("Something Went Wrong !", 1000);
      },() => {
        console.log("completed : ");
    });
  }

  saveFileUrl(){
    let userInfo = {
      fileURL : this.downloadURL
    }
    
    this.candidateService.saveCandidateProfileFileUrlDuringHighlightsData(userInfo).subscribe((res) => {
      if (res) {
        this.showSkills();
        this.showIndustries();
      }
    });
  }

  fileChange(event) {
    if (event.target.files) {
      if(event.target.files[0].name.endsWith(".pdf") || event.target.files[0].name.endsWith(".docx")){
        this.fileUploaded = 0;
        let fileList: FileList = event.target.files;
        this.file = fileList[0];
        this.uploadFileName = this.file.name;
        var fdata = new FormData();
        fdata.append("image", this.file);
        this.progress = this.resumeService.uploadResumeWithProgress(fdata);
        this.progressPercent = 0;
        this.progress.subscribe(progress => {
          console.log(`Upload ${progress.percent}% completed`);
          this.inProgress = true;
          this.progressPercent = progress.percent;
          if(progress.completeStatus){
            this.downloadURL = progress.body.result;
              if(this.downloadURL !== ""){
                this.saveFileUrl();
              }
              Materialize.toast("Resume Uploaded Successfully !", 1000);
            }
          }, error => {
            this.inProgress = false;
            this.progressPercent = 0;
            Materialize.toast("Something Went Wrong !", 1000);
          },() => {
            console.log("completed : ");
        });
      }else{
        Materialize.toast("Only allow .PDF and .DOCX extension files", 1500, 'red');
      }
    }
  }

  onCheckboxChange($event){
    this.accomplishmentArray.forEach((accom)=>{
      if(accom.type === $event.target.name){
        if($event.target.checked){
          accom.checked = true;
          this.checkedNumber++;
        }else{
          accom.checked = false;
          this.checkedNumber--;
        }
      }
    });

    this.setValues();
  }

  setValues(){
    let temp = 0;
    this.comments = "";
    this.comment2 = "";
    this.comment3 = "";

    this.accomplishmentArray.forEach((accom)=>{
      accom.checked ? temp++ : '';
      switch(temp){
        case 1 :
          this.comments = this.accomplishmentTabFrm.get('accomFrm1').value;
          break;
        case 2 :
          this.comment2 = this.accomplishmentTabFrm.get('accomFrm2').value;
          break;
        case 3 :
          this.comment3 = this.accomplishmentTabFrm.get('accomFrm3').value;
          break;
        default : 
          break;
      }
    }); 
  }

  selectionChange(event, stepper){
    if(event.selectedIndex == stepper.steps.length-1){
      this.createStatement();
    }
  }
}
