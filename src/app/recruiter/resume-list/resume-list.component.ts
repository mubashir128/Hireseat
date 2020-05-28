
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { ResumeService } from '../../_services/resume.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isEmpty } from 'rxjs/operators';
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {
  p=1;
  resumes: IResume[];
  selectedResume: Resume;
  noResume: boolean = true;
  confirmDel: boolean = false;
  selectedResumeDelete: Resume;
  mode: number = 0; // 0: resume list, 1: edit resume
  showdropdown = false;
  tempResume;
  searchvalue;
  CandidateName;
  selectedResumeIs;
  constructor(private router: Router, private resumeService: ResumeService, private spinner: NgxSpinnerService) {
    this.getAllResume();
    jQuery('.modal').modal();
  }

  getAllResume() {
    this.spinner.show();
    this.resumeService.getAllResume().subscribe((data: IResume[]) => {
      console.log("data : ",data);
      if (data.length > 0) {
        this.resumes = data;
        this.tempResume = this.resumes;
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
    if (jQuery(event.target).attr('id') == 'toggleDropdownId') {
      jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    } else {
      jQuery("#dropdown_jobProfile_resume").removeClass("dropdown-toggle");
    }
  }

  openDropdown() {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
    this.showdropdown = true;
  }

  searchtext(event) {
    this.searchResume(event.target.value);
  }

  searchResume(value){
    this.searchvalue = value;
    if (this.searchvalue == '') {
      this.resumes=this.tempResume;
      return ;
    }

    console.log(this.resumes,"    ",this.searchvalue);
    this.resumes = this.tempResume.filter(resume => {
      let name=resume.resumeBank_id.firstName+" "+resume.resumeBank_id.lastName;
      return (name === this.searchvalue);
    });
  }

  onfocus(e) {
    jQuery("#dropdown_jobProfile_resume").addClass("dropdown-toggle");
  }

  selectedResumeVal(id, name, lName) {
    this.selectedResumeIs = name+" "+lName;
    this.selectedResumeIs = new Resume();
    this.selectedResumeIs._id = id;
    this.CandidateName = name+" "+lName;
    this.selectedResumeIs.candidateName = name+" "+lName;
    this.searchResume(this.selectedResumeIs.candidateName );
    jQuery("#dropdown_jobProfile_resume").removeClass("dropdown-toggle");
  }

}
