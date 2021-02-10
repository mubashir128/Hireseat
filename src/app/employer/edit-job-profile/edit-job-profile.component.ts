
import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobProfile } from '../../models/job-profile';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { JobShift } from '../../models/job-shift';
import { Contract } from '../../models/contract';
import { SalaryCycle } from '../../models/salary-cycle';
import { JobExperience } from '../../models/job-experience';
import { NgxSpinnerService } from 'ngx-spinner';
import { BiddingEventService } from '../../_services/bidding-event.service';

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-edit-job-profile',
  templateUrl: './edit-job-profile.component.html',
  styleUrls: ['./edit-job-profile.component.css']
})
export class EditJobProfileComponent implements OnInit {
  public jp: JobProfile;
  ckeConfig:any;
  public loggedUser: any;
  public jobProfileFrm: FormGroup;
  public jobPro_id: any;
  public jobShiftArr: JobShift[];
  public salaryCycleArr: SalaryCycle[];
  public jobExperienceArr: JobExperience[];
  public contractArr: Contract[];
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthenticationService, private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService) {

    this.jobPro_id = localStorage.getItem("jp_id");
    this.loggedUser = this.userService.getUserData();

    if (this.jobPro_id && this.loggedUser != "no") {
      this.jp = new JobProfile(this.loggedUser._id, this.loggedUser.companyName);
      this.getJobProfileById(this.jobPro_id);
    } else {
      this.router.navigate([this.loggedUser.userRole]);
    }

    this.jobShiftArr = [
      new JobShift(1, 'Day'),
      new JobShift(2, 'Night')
    ];

    this.salaryCycleArr = [
      new SalaryCycle(1, 'per Year'),
      new SalaryCycle(2, 'per Month'),
      new SalaryCycle(3, 'per Week')
    ];
    this.jobExperienceArr = [
      new JobExperience(1, '1 Year'),
      new JobExperience(2, '2 Years'),
      new JobExperience(3, '3 Years'),
      new JobExperience(4, '4 Years'),
      new JobExperience(5, '5 Years'),
      new JobExperience(6, '5 - 10 Years'),
      new JobExperience(7, '10+ Years')
    ];

    this.contractArr = [
      new Contract(1, '1 Year'),
      new Contract(2, '2 Years'),
      new Contract(3, '3 Years')
    ];

    this.jobProfileFrm = this.formBuilder.group({
      jobTitle: ['', Validators.compose([Validators.required])],
      jobBrief: ['', Validators.compose([Validators.required])],
      jobType: ['', Validators.compose([Validators.required])],
      jobLocation: ['', Validators.compose([Validators.required])],
      salaryFrom: ['', Validators.compose([Validators.required ])],
      salaryTo: ['', Validators.compose([Validators.required ])],
      salaryCycle: ['', Validators.compose([Validators.required])],
      salaryNegotiable: ['', Validators.compose([Validators.required])],
      minEducation: ['', Validators.compose([Validators.required])],
      experienceFrom: ['', Validators.compose([Validators.required])],
      experienceTo: ['', Validators.compose([Validators.required])],
      skills: ['', Validators.compose([Validators.required])],
      jobShift: ['', Validators.compose([Validators.required])],
      jobDescription: ['', Validators.compose([Validators.required])],
      contract: ['', Validators.compose([Validators.required])]
    },{validator: [this.checkSalary,this.checkExperience] });

  }



  get f() { return this.jobProfileFrm.controls; }

  ngOnInit() {
    jQuery('select').material_select();
    jQuery('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }

  getJobProfileById(_id) {
    this.spinner.show();
    this.bidEventService.getJobProfileById(_id).subscribe((data: JobProfile) => {
      if (data != null && data != undefined) {
        this.jp = data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error);
    });
  }

  goBack() {
    localStorage.removeItem('jp_id');
    this.router.navigate([`${this.loggedUser.userRole}/job-profile-list`]);
  }

  onSubmit() {
    if (this.jobProfileFrm.valid) {
      this.spinner.show();
      this.bidEventService.updateJobProfile(this.jp).subscribe((data: any) => {
        if (data.res === "updated") {
          Materialize.toast('Job Profile Updated Successfully', 1000)
          localStorage.removeItem('jp_id');
          this.spinner.hide();
          this.router.navigate([`/${this.loggedUser.userRole}/job-profile-list`]);
        } else {
          this.spinner.hide();
          Materialize.toast('Something Went Wrong !', 1000)
        }
      },
        (error) => {
          console.log(error);
          this.spinner.hide();
          if (error) {
            Materialize.toast('Something Went Wrong !', 4000)
            localStorage.removeItem('jp_id');
            this.router.navigate([`/${this.loggedUser.userRole}/job-profile-list`]);
          }
        });
    }
  }

  jobShiftVal(val) {
    this.jp.jobShift = val;
  }

  contractVal(val) {
    this.jp.contract = val;
  }

  /* experienceVal(val) {
    this.jp.experience = val;
  } */

  salaryCycleVal(val) {
    this.jp.salaryCycle = val;
  }

  // Validation of salary 
  checkSalary(group: FormGroup) {
    let fromSalary = group.controls.salaryFrom.value;
    let toSalary = group.controls.salaryTo.value;
    return Number(fromSalary) <= Number(toSalary) ? null : { invalidSalary: true }     
  }
  // Validation of reward Money 
checkExperience(group: FormGroup) {
  let fromExperience = group.controls.experienceFrom.value;
  let toExperience = group.controls.experienceTo.value;
  return Number(fromExperience) <= Number(toExperience) ? null : { invalidExperience: true }     
}
}
