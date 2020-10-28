import { Component, OnInit, OnDestroy } from '@angular/core';
import { IResume } from 'src/app/models/resume';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResumeService } from 'src/app/_services/resume.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ScheduleService } from 'src/app/_services/schedule.service';
declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit, OnDestroy {
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  // Subscriptions
  myWaitingListResumes: Subscription;
  changeStatusSubscription: Subscription;
  getAllEventSubscription: Subscription;
  createEventSubscription: Subscription;
  mode: number = 0; // 0: resume list, 1: edit resume
  noResume: boolean = true;
  resumes: IResume[];
  rejectReason: any;
  rejectResume: any;
  selectedDateTime: any;
  resume: any;
  selectedDate: any;
  selectedTime: any;
  events: any;
  startDate: any;
  endDate: any;
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    jQuery('.modal').modal();
    this.getMyWaitingList();
    this.getAllEvents();
  }
  toggleAccordian(event) {
    var element = event.target;
    element.classList.toggle("active");

    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
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

    }, err => {
      Materialize.toast('No waiting candidates!', 3000);
      this.noResume = true;

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
  reqslots(resume) {
    // console.log('**********', resume.sharedWithRecruiter);
    let reqtime = [];
    resume.sharedWithRecruiter.forEach(element => {
      // console.log(':::::::::::::::::::::', element);
      if (element.applicationStatus === 'waiting') {
        // console.log(' found', element.reqAvailableTime);
        reqtime.push(element.reqAvailableTime);
      } else {
        // console.log('not found');

      }
    });
    // console.log('**********', reqtime);

    return reqtime;
  }
  async confirmedRejectResume() {
    await this.changeStatus('rejected', this.rejectResume);
    jQuery('#rejectReason').modal('close');

  }
  splitSkills(skills) {
    return skills.split(",");
  }
  getDate(date) {
    let dateString = date;
    dateString = new Date(dateString).toUTCString();
    // console.log('------------',dateString);

    dateString = dateString.split(' ').slice(0, 4).join(' ');
    // console.log('8**',dateString);

    return dateString;
  }
  selectedReq(date, time) {
    // console.log(date, '--------', time);
    this.selectedDate = new Date(date);
    this.startDate = new Date(date);
    this.endDate = new Date(date);
    this.selectedTime = time;
    console.log();
    let start = this.selectedTime.split('-')[0];
    let end = this.selectedTime.split('-')[1];

    start = start.split(':');
    end = end.split(':');

    console.log(start);

    this.startDate.setHours(start[0], start[1]);
    this.endDate.setHours(end[0], end[1]);

    console.log(this.startDate, '\n', this.endDate);

  }
  acceptCandidate(resume) {
    this.resume = resume;

    if (this.startDate && this.endDate) {
      jQuery('#acceptConfirmation').modal('open');
    } else {
      Materialize.toast('Please select one of the dates', 3000);

    }
  }
  closeAcceptCandidate() {

    jQuery('#acceptConfirmation').modal('close');
  }
  confirmAcceptCandidate() {
    console.log(this.resume);

    this.changeStatus('accepted', this.resume);


    this.closeAcceptCandidate();
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
        this.closeAcceptCandidate();
        this.getMyWaitingList();
        this.addEvent(resume.candidate_id.fullName);
        this.resume = [];
        this.startDate = '';
        this.endDate = '';
      } else {
        Materialize.toast(res.msg, 3000);
        this.resume = [];
        this.startDate = '';
        this.endDate = '';
      }
    }, error => {
      Materialize.toast(error.message, 3000);
      this.resume = [];
      this.startDate = '';
      this.endDate = '';
    })
  }

  // events section 

  getAllEvents() {
    this.getAllEventSubscription = this.scheduleService.getAllEvents().subscribe(async res => {
      if (res.length > 0) {
        // console.log('------------------------', res[0].schedules);
        let schedules = res[0].schedules;
        // schedules.forEach(element => {
        //   if (element.start) element.start = new Date(element.start);
        //   if (element.end) element.end = new Date(element.end);
        //   element.actions = this.actions;
        // });
        this.events = await schedules;
        this.resume = [];
        this.startDate = '';
        this.endDate = '';
      }
    }, error => {
      console.log('-______-', error);
    });
  }

  addEvent(candidateName): void {
    // const newNum = this.events.length + 1;
    const newEvent = {
      title: candidateName,
      start: this.startDate,
      end: this.endDate,
      color: this.colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      actions: []
    };
    const payload = {
      events: newEvent
    }
    this.createEventSubscription = this.scheduleService.createEvent(payload).subscribe(res => {
      // console.log('------------------', res);
      this.getAllEvents();
    }, error => {
      console.log(error);

    });
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
    if (this.createEventSubscription) {
      this.createEventSubscription.unsubscribe();
    }
    if (this.getAllEventSubscription) {
      this.getAllEventSubscription.unsubscribe();
    }

  }
}
