import { Component, OnInit, OnDestroy } from "@angular/core";
import { CandidateService } from "src/app/_services/candidate.service";
import { Subject, Subscription } from "rxjs";

import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { IDatePickerConfig} from 'ng2-date-picker';

declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: "app-all-recruiters",
  templateUrl: "./all-recruiters.component.html",
  styleUrls: ["./all-recruiters.component.css"],
})
export class AllRecruitersComponent implements OnInit, OnDestroy {
  today = new Date()
  getAllPostRecruiterSubscription: Subscription;
  shareWithRecruiterSubscription: Subscription;
  requestCoachingSubscription: Subscription;
  getProfileSubscription: Subscription;
  refresh: Subject<any> = new Subject();
  requestDatesForm: FormGroup;
  recruiters: any;
  selectedRecruiter: any;
  user: any;
  public selectsDates;
  config:IDatePickerConfig = {
    format: 'YY/M/D',
  };
  // multiDate: any = [];
  availableTime: any = [];
  availableDetails: any;
  daysArray: any = [0, 1, 2, 3, 4, 5, 6];
  disableDay: any = [];
  dayToBeAvailable: any = [];
  payload: {
    recipientEmail: string;
    candidateFullName: any;
    candidatePhoneNo: any;
    recruiterFullName: any;
    subject: string;
  };
  searchTerm: any;
  myProfileContent: any;
  // pagination
  p = 1;
  constructor(
    private candidateService: CandidateService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    // this.disableDay = [];
    this.requestDatesForm = this.fb.group({
      date1: new FormControl(null, Validators.compose([Validators.required])),
      time1: new FormControl(null, Validators.compose([Validators.required])),
      date2: new FormControl(null, Validators.compose([Validators.required])),
      time2: new FormControl(null, Validators.compose([Validators.required])),
      date3: new FormControl(null, Validators.compose([Validators.required])),
      time3: new FormControl(null, Validators.compose([Validators.required])),
    });
    this.requestDatesForm.valueChanges.subscribe((value) => {
      // console.log("---------", value);
      // this.multiDate.push(value);
      // console.log(this.multiDate.length);
      // console.log('multidate values', this.multiDate)
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.myProfile();
    jQuery(".modal").modal();
    this.candidateService.getAllPostRecruiters().subscribe(
      (res) => {
        if (res) {
          this.recruiters = res;
          this.spinner.hide();
        }
      },
      (error) => {
        Materialize.toast("Something Went Wrong !", 1000);

        this.spinner.hide();
      }
    );
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(this.user);
  }
  myProfile() {
    this.getProfileSubscription = this.candidateService
      .getCandidateProfile()
      .subscribe((res) => {
        this.myProfileContent = res;
      });
  }
  closeSelectDatesModal() {
    jQuery("#selectDates").modal("close");
  }

  openSelectDatesModal() {
    jQuery("#selectDates").modal("open");
  }
  onLinkedIn(link: string) {
    if (link.includes("https")) {
      window.open(link, "_blank");
    } else {
      window.open("https://" + link, "_blank");
    }
  }
  selectionChanged(event) {
    console.log(event);
  }
  onReqCoaching(recruiter) {
    this.availableTime = [];
    this.selectedRecruiter = recruiter;
    console.log(
      "requesting for coaching",
      recruiter,
      this.user.userInfo.fullName
    );
    // contact@hireseat.com
    this.payload = {
      recipientEmail: "contact@hireseat.com",
      candidateFullName: this.user.userInfo.fullName,
      candidatePhoneNo: this.user.userInfo.phoneNo,
      recruiterFullName: recruiter.fullName,
      subject:
        this.user.userInfo.fullName + " " + "Candidate request for coaching",
    };
    recruiter.refUserId.available.forEach((item) => {
      this.availableTime.push(item.from + "-" + item.to);
    });
    // console.log(recruiter.refUserId.available);
    this.availableDetails = recruiter.refUserId.available;
    // console.log(this.availableDetails);
    this.availableDetails.forEach((item, index) => {
      this.dayToBeAvailable.push(item.day.dayId);
    });
    this.disableDay = this.daysArray.filter(
      (val) => !this.dayToBeAvailable.includes(val)
    );

    // console.log(this.disableDay);
    // this.spinner.show();
    this.openSelectDatesModal();
  }
  confirmSelectDatesEvent() {
    // console.log(this.requestDatesForm.valid);
    // console.log(this.requestDatesForm.value);

    if (this.requestDatesForm.valid) {
      this.reqCoachingFunction();
      this.closeSelectDatesModal();
    } else {
      Materialize.toast("Please provide your available time!", 4000);
    }
  }
  reqCoachingFunction() {
    if (this.myProfileContent) {
      this.requestCoachingSubscription = this.candidateService
        .reqCoaching(this.payload)
        .subscribe(
          (res) => {
            if (res) {
              // console.log(res);
              // Materialize.toast("Recruiter has been notified!", 2000);
              Materialize.toast("Recruiter will reach out to you!", 4000);

              this.onShareWithRecruiter(this.selectedRecruiter);
              this.spinner.hide();
            }
          },
          (err) => {
            Materialize.toast("Something Went Wrong !", 1000);
            this.spinner.hide();
          }
        );
    }
  }
  onShareWithRecruiter(recruiter) {
    this.spinner.show();
    Materialize.toast("Sharing your profile with the recruiter...", 4000);

    const payload = {
      recruiter_id: recruiter.refUserId._id,
      reqAvailableTime: this.requestDatesForm.value,
    };
    this.shareWithRecruiterSubscription = this.candidateService
      .sharewithRecruiter(payload)
      .subscribe(
        (res) => {
          if (res) {
            Materialize.toast(res.msg, 1000);
            this.spinner.hide();
          }
        },
        (err) => {
          console.log(err);
          Materialize.toast("Something went wrong!", 1000);
          this.spinner.hide();
        }
      );
  }
  disabledDay(date) {
    // console.log(this.disableDays); // <---**on this point date is undefined**
    const disable = [0, 2, 4, 6];
    let returnDisableDates;
    // if (disable.length <= 0) {
    // return (date.getDay() === 0 || date.getDay() === 3);
    // }
    // else {
    // returnDisableDates = disable.forEach(val => date.getDay() === val);
    // }
    // for (let i = 0; i < disable.length; i++) {
    //   // returnDisableDates.push(date.getDay() === disable[i]);
    //   return date.getDay() === disable[i] || date.getDay() === disable[i++];
    // }
    // console.log(returnDisableDates);

    // return returnDisableDates;
  }
  // keep it at the end of the file
  ngOnDestroy() {
    if (this.getAllPostRecruiterSubscription) {
      this.getAllPostRecruiterSubscription.unsubscribe();
    }
    if (this.requestCoachingSubscription) {
      this.requestCoachingSubscription.unsubscribe();
    }
    if (this.shareWithRecruiterSubscription) {
      this.shareWithRecruiterSubscription.unsubscribe();
    }
  }
}
