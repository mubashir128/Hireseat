import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ResumeService } from 'src/app/_services/resume.service';
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
  highGPA = 0;
  techMajor = "";
  degree = "";

  title = "";
  manageralExp = 0;
  managedTeamSize = 0;
  totalDegree = 0;

  comments = "";
  comment2 = "";
  comment3 = "";

  public skillSets = [];
  public mainIndustriesAre = [];
  public industriesAre = [];

  finalSkillSets = [];
  finalIndustriesAre = [];

  public SearchFrm: FormGroup;
  public SearchIndustryFrm: FormGroup;
  public SearchInputFrm: FormGroup;

  constructor(private formBuilder: FormBuilder, private resumeService: ResumeService, private candidateService: CandidateService, private _router: Router) {
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

  }

  ngOnInit(){
    this.getSkillsets();
    this.getIndustries();
  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe((data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
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
    this.secEduPageTab = false;
    this.workTab = true;
  }

  workSkip(){
    this.eduPageTab = true;
    this.workTab = false;
  }

  workContinue(){
    this.workTab = false;
    this.skillSetsTab = true;
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

    this.candidateService.saveCandidateProfileData(payload).subscribe((res) => {
      if (res) {
        Materialize.toast("Profile updated successfully !", 3000, "blue");
        this._router.navigate(["/candidate/my-profile"]);
      }
    });
  }

}
