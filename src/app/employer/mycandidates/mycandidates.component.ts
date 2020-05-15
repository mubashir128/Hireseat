
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { ResumeService } from '../../_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isEmpty } from 'rxjs/operators';
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
  constructor(
    private router: Router,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.resumes = [];
    jQuery('.modal').modal();
  }

  getAllHiredResume() {
    this.spinner.show();
    this.resumeService.getSpecificHiredCandidates().subscribe((data: any) => {
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

  ngOnInit() {
    this.resumes = [];

    this.getAllHiredResume();
    jQuery('.modal').modal();
  }

  showCreateResumeForm() {
    this.router.navigate(['/recruiter-home/new-resume']);
  }

  editResume(resume: Resume) {
    console.log(resume);
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

}
