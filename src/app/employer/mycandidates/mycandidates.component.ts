
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { ResumeService } from '../../_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isEmpty } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  public searchResumeBid: FormGroup;
  constructor(
    private router: Router,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder

  ) {
    this.resumes = [];
    jQuery('.modal').modal();
    this.searchResumeBid = this.formBuilder.group({
      selectedResumeIs: ['']
    });
  }

  getAllHiredResume() {
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
      // console.log(data.resumes);
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
    this.getEmployerAddedResumes();
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
        jQuery('#DeleteConfirm').modal('close');
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        Materialize.toast('Something Went Wrong!', 1000);
        this.confirmDel = false;
        jQuery('#DeleteConfirm').modal('close');
      });
    } else {
      this.confirmDel = false;
      jQuery('#DeleteConfirm').modal('close');
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
  }

  openDropdown() {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    this.showdropdown = true;
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
    // console.log(event.target.value);

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

}
