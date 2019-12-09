
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalaryCycle } from '../../models/salary-cycle';
import { JobExperience } from '../../models/job-experience';
import { LanguageProficiency } from '../../models/language-proficiency';
import { JobShift } from '../../models/job-shift';
import { Contract } from '../../models/contract';
import { JobProfile } from '../../models/job-profile';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BiddingEventService } from '../../_services/bidding-event.service';

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-create-job-profile',
  templateUrl: './create-job-profile.component.html',
  styleUrls: ['./create-job-profile.component.css']
})
export class CreateJobProfileComponent implements OnInit {
  public jp: JobProfile;
  ckeConfig:any;
  public loggedUser: any;
  public jobExperienceArr: JobExperience[];
  public jobShiftArr: JobShift[];
  public salaryCycleArr: SalaryCycle[];
  public contractArr: Contract[];
  public jobProfileFrm: FormGroup;
  languageProficiencyArr: LanguageProficiency[];

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthenticationService, private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService) {

    this.loggedUser = this.userService.getUserData();
    if (this.loggedUser != "no") {
      this.jp = new JobProfile(this.loggedUser._id, this.loggedUser.companyName);
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
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
      salaryFrom: ['', Validators.compose([Validators.required])],
      salaryTo: ['', Validators.compose([Validators.required])],
      salaryCycle: ['', Validators.compose([Validators.required])],
      salaryNegotiable: ['', Validators.compose([Validators.required])],
      minEducation: ['', Validators.compose([Validators.required])],
      experienceFrom: ['', Validators.compose([Validators.required])],
      experienceTo: ['', Validators.compose([Validators.required])],
      skills: ['', Validators.compose([Validators.required])],
      /* jobShift:['', Validators.compose([Validators.required])], */
      jobDescription: ['', Validators.compose([Validators.required])],
      /*  contract:['', Validators.compose([Validators.required])] */
    },{validator: [this.checkSalary,this.checkExperience] });
  }

  ngOnInit() {
    this.jp.jobType = 1;
    // this.jobProfileFrm.controls['jobType'].setValue("1");
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

  get f() { return this.jobProfileFrm.controls; }

  onSubmit() {
    if (this.jobProfileFrm.valid) {
      this.spinner.show();  
      this.bidEventService.createJobProfile(this.jp).subscribe((data: any) => {
        if (data.result === "inserted") {
          Materialize.toast('Job Profile Created Successfully', 1000)
          this.spinner.hide();
          this.router.navigate(["/employer/job-profile-list"]);
        } else {
          this.spinner.hide();
        }
      },
        (error) => {
          console.log(error);
          this.spinner.hide();
          if (error) {
            Materialize.toast('Something Went Wrong !', 1000)
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

 /*  experienceVal(val) {
    this.jp.experience = val;
  }
 */
  salaryCycleVal(val) {
    this.jp.salaryCycle = val;
  }


  goBack() {
    this.router.navigate(['/employer/job-profile-list']);
  }
  onChange(event){
    this.jp.jobDescription;
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
