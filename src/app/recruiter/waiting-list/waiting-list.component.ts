import { Component, OnInit, OnDestroy } from '@angular/core';
import { IResume } from 'src/app/models/resume';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResumeService } from 'src/app/_services/resume.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit, OnDestroy {
  // Subscriptions
  myWaitingListResumes: Subscription;
  changeStatusSubscription: Subscription;
  mode: number = 0; // 0: resume list, 1: edit resume
  noResume: boolean = true;
  resumes: IResume[];
  rejectReason: any;
  rejectResume: any;
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    jQuery('.modal').modal();
    this.getMyWaitingList();
  }
  getMyWaitingList() {
    this.myWaitingListResumes = this.resumeService.getMyWaitingList().subscribe(res => {
      // console.log(res);
      if (res.msg === "No waiting candidates!") {
        this.noResume = true;
        Materialize.toast(res.msg, 3000);

      } else {
        this.resumes = res;
        // this.skillSet = this.resume.skills.split(",");
        this.noResume = false;
      }

    });
  }
  openRejectModal(resume) {
    jQuery('#rejectReason').modal('open');
    this.rejectResume = resume;


  }
  closeRejectModal() {
    jQuery('#rejectReason').modal('close');
    this.rejectResume = '';

  }
  async confirmedRejectResume() {
    await this.changeStatus('rejected', this.rejectResume);
    jQuery('#rejectReason').modal('close');

  }
  splitSkills(skills) {
    return skills.split(",");
  }
  changeStatus(status, resume) {
    const payload = {
      status: status,
      candidate_id: resume.candidate_id._id,
      reasonForDecline: this.rejectReason
    }
    this.changeStatusSubscription = this.resumeService.changeCandidateStatus(payload).subscribe(res => {
      // console.log('res from change status', res);
      if (res) {
        Materialize.toast(res.msg, 3000);
        jQuery('#rejectReason').modal('close');

        this.getMyWaitingList();
      } else {
        Materialize.toast(res.msg, 3000);

      }
    }, error => {
      Materialize.toast(error.message, 3000);
    })
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy(): void {
    if (this.myWaitingListResumes) {
      this.myWaitingListResumes.unsubscribe();
    }

    if (this.changeStatusSubscription) {
      this.changeStatusSubscription.unsubscribe();
    }
  }
}
