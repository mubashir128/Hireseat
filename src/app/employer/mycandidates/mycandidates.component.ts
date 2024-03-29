
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { ResumeService } from '../../_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogDeleteComponent } from 'src/app/shared/shared-components/components/dialog-delete/dialog-delete.component';
import { MatDialog } from '@angular/material/dialog';

declare var Materialize: any;
declare var jQuery: any;

@Component({
  selector: 'app-mycandidates',
  templateUrl: './mycandidates.component.html',
  styleUrls: ['./mycandidates.component.css']
})
export class MycandidatesComponent implements OnInit {
  resumes: any[];
  onlyResumes: any;
  selectedResume: Resume;
  noResume = true;
  confirmDel = false;
  selectedResumeDelete: Resume;
  mode = 0; // 0: resume list, 1: edit resume
  msg: any;
  showdropdown = false;
  tempResume;
  temp2Resume;
  searchvalue;
  CandidateName;
  selectedResumeIs;
  toggleSearch = false;
  tags: any;
  public searchResumeBid: FormGroup;
  public skillSets = [];
  public SearchFrm: FormGroup;
  skillsSetsAre=[];

  constructor(
    private router: Router,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected _dialog: MatDialog
  ) {
    this.resumes = [];
    jQuery('.modal').modal();
    this.searchResumeBid = this.formBuilder.group({
      selectedResumeIs: ['']
    });

    this.SearchFrm = this.formBuilder.group({
      tags: ["", Validators.required],
    });

  }

  getAllHiredResume() {
    this.getEmployerAddedResumes();

    this.spinner.show();
    this.resumeService.getSpecificHiredCandidates().subscribe((data: any) => {
      // console.log(data);

      if (data.msg) {
        this.msg = data.msg;
      }
      if (data.length > 0) {
        this.noResume = false;
        data.forEach(element => {
          if (element.resumeKey !== null) {
            this.resumes.push(element.resumeKey);
          }
        });
        this.tempResume = this.resumes;
        this.temp2Resume = [...this.tempResume];

        this.spinner.hide();
      } else {
        this.noResume = true;
        this.spinner.hide();
      }
    },
      (error) => {
        this.spinner.hide();
      });
  }

  getEmployerAddedResumes() {
    this.spinner.show();
    this.resumeService.getEmployerAddedResumes().subscribe((data: IResume[]) => {
      const resumes = data['resumes'];
      if (resumes.length > 0) {
        resumes.forEach(ele => {
          this.resumes.push(ele);

        });

        this.tempResume = this.resumes;
        this.temp2Resume = [...this.tempResume];
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.resumes = [];

    this.getAllHiredResume();
    this.getSkillsets();

    // this.getEmployerAddedResumes();
    jQuery('.modal').modal();
  }

  showCreateResumeForm() {
    this.router.navigate(['/recruiter-home/new-resume']);
  }

  editResume(resume: Resume) {
    this.selectedResume = resume;
    this.mode = 1;
  }

  confirmAction(resume: Resume) {
    this.selectedResumeDelete = resume;
    const dialogDeleteRef = this._dialog.open(DialogDeleteComponent,{
      data: {
        dialogType : "ConfirmDeleteAction",
        dialogTitle : "Confirm Delete Action",
        dialogText : "Are want to sure delete this resume ?"
      }
    });

    dialogDeleteRef.afterClosed().subscribe(result => {
      if(result && result.process){
        this.confirmedDeleteResume();
      }
    });
  }

  confirmedDeleteResume() {
    this.confirmDel = true;
    if (this.confirmDel) {
      this.spinner.show();
      this.resumeService.removeResume(this.selectedResumeDelete._id, this.selectedResumeDelete.resumeType).subscribe((data: any) => {
        if (data.result == 'success') {
          Materialize.toast('Resume Deleted Successfully !', 1000);
          this.getAllHiredResume();
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000);
        }
        this.confirmDel = false;
      }, (error) => {
        this.spinner.hide();
        Materialize.toast('Something Went Wrong!', 1000);
        this.confirmDel = false;
      });
    } else {
      this.confirmDel = false;
    }
  }

  deleteResume(resume: Resume) {
    this.confirmAction(resume);
  }

  comeBack() {
    this.resumes = [];
    this.mode = 0;
  }
  toggle(event) {
    this.tempResume = [...this.temp2Resume];
    this.toggleSearch = !this.toggleSearch;
    this.setFocus();
  }

  openDropdown() {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    this.showdropdown = true;
  }

  setFocus(){
    setTimeout(()=>{
      jQuery(".searchBox").focus();
    },1000);
  }

  selectedResumeVal(id, name, lName) {
    this.selectedResumeIs = name;
    this.selectedResumeIs = new Resume();
    this.selectedResumeIs._id = id;
    this.CandidateName = name;
    this.selectedResumeIs.candidateName = name;
    this.searchResume(this.selectedResumeIs.candidateName);
    this.toggleSearch = false;
  }

  searchtext(event) {
    this.searchResume(event.target.value);
  }
  
  onfocus(e) {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
  }

  searchResume(value) {
    this.searchvalue = value;
    if (this.searchvalue == '') {
      this.resumes = [...this.temp2Resume];
      this.tempResume = [...this.temp2Resume];
      return;
    }

    var regexp = new RegExp(this.searchvalue, 'i')
    this.resumes = this.temp2Resume.filter(resume => {
      let name = resume.candidateName;
      return regexp.test(name);
    });

    var regexp = new RegExp(this.searchvalue, 'i')
    this.tempResume = this.temp2Resume.filter(resume => {
      let name = resume.candidateName;
      return regexp.test(name);
    });

  }

  handleToggleSign(obj){
    if(obj.searchTab){
      jQuery(".searchForm").css("display","block");
    }else{
      jQuery(".searchForm").css("display","none");
    }
  }

  async onadd(event) {
    var skillSets = [];
    if (this.SearchFrm.valid) {
      await this.SearchFrm.value.tags.forEach(element => {
        skillSets.push(element.value);
      });
    }
    this.filterBySkills(skillSets);
  }

  filterBySkills(skillSets){
    if (skillSets.length === 0) {
      this.resumes = [...this.temp2Resume];
      this.tempResume = [...this.temp2Resume];
      return;
    }

    this.resumes=[];
    this.temp2Resume.filter(resume => {
      let name = resume.skills;
      skillSets.map(data=>{
        if(data === name){
          this.resumes.push(resume);
        }
      });
    });

    this.tempResume=[];
    this.temp2Resume.filter(resume => {
      let name = resume.skills;
      skillSets.map(data=>{
        if(data === name){
          this.tempResume.push(resume);
        }
      });
    });

  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
        } else {
          this.skillSets = [];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
