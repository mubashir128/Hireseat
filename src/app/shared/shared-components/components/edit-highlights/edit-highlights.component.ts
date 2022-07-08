import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';
import { UserService } from 'src/app/_services/user.service';
import * as lib from "src/app/lib-functions";
import { CandidateService } from 'src/app/_services/candidate.service';
import { Router } from '@angular/router';

declare var Materialize: any;

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

  resumeTab: boolean = true;
  importantTab: boolean = false;
  accomplishmentTab: boolean = false;
  previewTab: boolean = false;

  accom1: string = "";
  accom2: string = "";
  accom3: string = "";
  educationBind: string = "";

  constructor(private resumeService: ResumeService, 
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private candidateService: CandidateService,
    private _router: Router,
  ){
    this.loggedInUser = this.userService.getUserData();

    this.resumeTabFrm = this.formBuilder.group({
    });

    this.importantTabFrm = this.formBuilder.group({
      tags : [""],
      industry : [""],
      education : [""]
    });

    this.accomplishmentTabFrm = this.formBuilder.group({
      accomFrm1 : new FormControl(),
      accomFrm2 : new FormControl(),
      accomFrm3 : new FormControl(),
    });

    this.showSkillsSetsFrm = this.formBuilder.group({
      showSkillsAre : ["", Validators.required],
    });
    
    this.showIndustriesFrm = this.formBuilder.group({
      showIndustriesAre : ["", Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.showSkills();
    this.showIndustries();
  }

  showSkills(){
    let promiseAll = [];
    promiseAll.push(this.resumeService.getSkillSets().toPromise());
    promiseAll.push(this.resumeService.getResumeSkillsets().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.skillSets = result[0];
      this.skillSets.forEach((item)=>{
          if(result[1].data && result[1].data.indexOf(item.value.toLowerCase()) !== -1){
            this.tagsBind.push(item);
            this.finalSkillSets.push(item.value.toLowerCase());
          }
      });
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
    let promiseAll = [];
    promiseAll.push(this.candidateService.getCandidateExperienceIndustries().toPromise());
    promiseAll.push(this.resumeService.getResumeSkillsets().toPromise());
    Promise.all(promiseAll).then(result=>{
      this.mainIndustriesAre = result[0].industries;
      this.mainIndustriesAre.forEach((item)=>{
        this.industriesAre.push({
          display : item.name,
          value : item.name.toLowerCase()
        });
        if(result[1].data.indexOf(item.name.toLowerCase()) !== -1){
          this.industryBind.push({
            display : item.name,
            value : item.name.toLowerCase()
          });
          this.finalIndustriesAre.push(item);
        }
      });
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

  nextResume(){
    this.resumeTab = false;
    this.importantTab = true;
  }

  previousImportant(){
    this.resumeTab = true;
    this.importantTab = false;
  }

  nextImportant(){
    this.importantTab = false;
    this.accomplishmentTab = true;
  }

  previousAccomplishment(){
    this.importantTab = true;
    this.accomplishmentTab = false;
  }

  previewAll(){
    this.accomplishmentTab = false;
    this.previewTab = true;
  }

  edit(){
    this.resumeTab = true;
    this.previewTab = false;
  }

  save(){
    let userInfo = {
      fileURL : this.downloadURL,
      education : this.educationBind,
      skills : this.finalSkillSets.join(","),
      industries : this.finalIndustriesAre,
      comments : this.accom1,
      comment2 : this.accom2,
      comment3 : this.accom3
    }
    
    this.candidateService.saveCandidateProfileDuringHighlightsData(userInfo).subscribe((res) => {
      if (res) {
        this._router.navigate(["/"+this.loggedInUser.userRole+"/my-posted-profiles"]);
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
        this.resumeService.uploadResume(fdata).subscribe((data: any) => {
          if (data.result) {
            this.downloadURL = data.result;
            this.fileUploaded = 2;
            Materialize.toast("Resume Uploaded Successfully !", 1000);
          } else {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },(error)=>{
          if (error) {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        });
      }else{
        Materialize.toast("Only allow .PDF and .DOCX extension files", 1500, 'red');
      }
    }
  }
}
