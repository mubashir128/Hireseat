
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { ResumeService } from '../../_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isEmpty } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class ResumeListComponent implements OnInit {
  p = 1;
  resumes: IResume[];
  selectedResume: Resume;
  noResume: boolean = true;
  confirmDel: boolean = false;
  selectedResumeDelete: Resume;
  mode: number = 0; // 0: resume list, 1: edit resume
  showdropdown = false;
  tempResume;
  temp2Resume;
  searchvalue;
  CandidateName;
  selectedResumeIs;
  toggleSearch = false;
  public searchResumeBid: FormGroup;
  @ViewChild('searchByName', { static: false }) searchByName: ElementRef;
  @ViewChild('searchAll', { static: false }) searchAll: ElementRef;
  tags: any;
  public SearchFrm: FormGroup;
  public skillSets = [];

  constructor(
    private router: Router,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    // this.getAllResume();
    jQuery('.modal').modal();
    this.searchResumeBid = this.formBuilder.group({
      selectedResumeIs: ['']
    });

    this.SearchFrm = this.formBuilder.group({
      tags: ["", Validators.required],
    });

  }

  getAllResume() {
    this.spinner.show();
    this.resumeService.getAllResume().subscribe((data: IResume[]) => {
      // console.log(data)
      if (data.length > 0) {
        this.resumes = data;
        this.tempResume = this.resumes;
        this.temp2Resume = [...this.tempResume];
        this.noResume = false;
        this.spinner.hide();
      } else {
        this.noResume = true;
        this.spinner.hide();
      }

      // this.resumes[]
    },
      (error) => {
        // console.log(error);
        this.spinner.hide();
      });
  }

  ngOnInit() {
    this.getAllResume();
    this.getSkillsets();

    jQuery('.modal').modal();
  }

  showCreateResumeForm() {
    this.router.navigate(['/recruiter-home/new-resume']);
  }

  editResume(resume: Resume) {
    // console.log(resume);
    this.selectedResume = resume;
    this.mode = 1;
  }

  confirmAction(resume: Resume) {
    jQuery('#DeleteConfirm').modal('open');
    this.selectedResumeDelete = resume;
    // // console.log(this.selectedResumeDelete)
  }

  confirmedDeleteResume() {
    this.confirmDel = true
    if (this.confirmDel) {
      this.spinner.show();
      this.resumeService.removeResume(this.selectedResumeDelete._id, this.selectedResumeDelete.resumeType).subscribe((data: any) => {
        if (data.result == "success") {
          Materialize.toast('Resume Deleted Successfully !', 1000)
          this.getAllResume();
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000)
        }
        this.confirmDel = false
        jQuery('#DeleteConfirm').modal('close');
      }, (error) => {
        this.spinner.hide();
        // console.log(error);
        Materialize.toast('Something Went Wrong!', 1000)
        this.confirmDel = false
        jQuery('#DeleteConfirm').modal('close');
      });
    } else {
      this.confirmDel = false
      jQuery('#DeleteConfirm').modal('close');
    }
  }

  deleteResume(resume: Resume) {
    this.confirmAction(resume);
  }

  comeBack() {
    this.mode = 0;
  }

  toggle(event) {
    this.tempResume = [...this.temp2Resume];
    this.toggleSearch = !this.toggleSearch;
    this.setFocus();
  }

  openDropdown() {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    this.showdropdown = !this.showdropdown;
  }

  setFocus() {
    setTimeout(() => {
      jQuery(".searchBox").focus();
    }, 1000);
  }

  searchtext(event) {
    this.searchResume(event.target.value);
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

    // this.resumes = this.temp2Resume.filter(resume => {
    //   let name=resume.resumeBank_id.firstName+" "+resume.resumeBank_id.lastName;
    //   return (name === this.searchvalue);
    // });

    var regexp = new RegExp(this.searchvalue, 'i')
    this.tempResume = this.temp2Resume.filter(resume => {
      let name = resume.candidateName;
      return regexp.test(name);
    });

  }

  onfocus(e) {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
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

  onClick(event) {
  }

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".searchForm").css("display", "block");
    } else {
      jQuery(".searchForm").css("display", "none");
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

  filterBySkills(skillSets) {
    if (skillSets.length === 0) {
      this.resumes = [...this.temp2Resume];
      this.tempResume = [...this.temp2Resume];
      return;
    }

    this.resumes = [];
    this.temp2Resume.filter(resume => {
      let name = resume.skills;
      skillSets.map(data => {
        if (data === name) {
          this.resumes.push(resume);
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
