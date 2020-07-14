import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { VideoCallingService } from '../_services/video-calling.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-video-interview-room',
  templateUrl: './video-interview-room.component.html',
  styleUrls: ['./video-interview-room.component.css']
})
export class VideoInterviewRoomComponent implements OnInit {
  employerInterviewList: any;
  recruiterInterviewList: any;
  userRole: any;
  userId: any;
  interviewList: any;
  tags: any;
  searchTerm : string;
  skillsSetsAre=[];
  public skillSets = [];
  public SearchFrm: FormGroup;
  @ViewChild('searchByName') searchByName: ElementRef;

  constructor(
    private router: Router,
    private videoCallingService: VideoCallingService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.userRole = JSON.parse(localStorage.getItem("currentUser")).userInfo
      .userRole;
    this.userId = JSON.parse(localStorage.getItem("currentUser")).userInfo
      ._id;

      this.SearchFrm = this.formBuilder.group({
        tags: ["", Validators.required],
        searchTerm : [""]
      });

  }

  ngOnInit() {
    this.spinner.show();
    if (this.userRole === 'recruiter') {
      this.getSkillsets();

      const payload = {
        recruiterId: this.userId
      };
      // get all candidates for interview
      this.getAllRecruitersCandidates(payload);
      
    } else if (this.userRole === 'employer') {
      this.spinner.hide();
      const payload = {
        employersId: this.userId
      };
      // get all candidates for interview
      this.getAllEmployersCandidates(payload);

    }

  }

  ngAfterViewInit() {
    // server-side search
    this.searchTermByName();
  }

  searchTermByName(){
    fromEvent(this.searchByName.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {

      })
    )
    .subscribe();
  }

  getAllRecruitersCandidates(payload){
    this.videoCallingService.getAllRecruitersCandidates(payload).subscribe(res => {
      console.log(res);
      if (res) {
        this.spinner.hide();
        this.interviewList = res;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getAllEmployersCandidates(payload){
    this.videoCallingService.getAllEmployersCandidates(payload).subscribe(res => {
      if (res) {
        this.spinner.hide();
        this.interviewList = res;
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getSkillsets() {
    this.videoCallingService.getSkillSets().subscribe(
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

  onInterview(candidateId) {
    // window.open('http://' + window.location.hostname + '/video-call');
    // console.log('calling', candidateId);

    this.router.navigate(['video-call/' + candidateId]);
  }
  trashCandidate(candidate) {
    this.spinner.show();
    // console.log(candidate);
    const payload = {
      candidateId: candidate.candidateId
    };
    if (this.userRole === 'recruiter') {
      this.videoCallingService.traashCandidateFromInterviewList(payload).subscribe((res) => {
        if (res) {

          this.interviewList.map((can: any) => {
            if (can.candidateId === payload.candidateId) {
              const removeCandidate = this.interviewList.indexOf(can);
              if (removeCandidate > -1) {
                this.interviewList.splice(removeCandidate, 1);
                this.spinner.hide();

              }
            }
          });
        } else {
          this.spinner.hide();

        }
      }, err => {
        this.spinner.hide();

      });
    } else if (this.userRole === 'employer') {
      this.videoCallingService.traashCandidateFromInterviewListEmployer(payload).subscribe((res) => {
        if (res) {

          this.interviewList.map((can: any) => {
            if (can.candidateId === payload.candidateId) {
              const removeCandidate = this.interviewList.indexOf(can);
              if (removeCandidate > -1) {
                this.interviewList.splice(removeCandidate, 1);
                this.spinner.hide();

              }
            }
          });
        } else {
          this.spinner.hide();

        }
      }, err => {
        this.spinner.hide();

      });
    } else {
      console.log('error user role not specified');

    }
  }

  onadd(event) {
    var skillSets = [];
    if (this.SearchFrm.valid) {
      this.SearchFrm.value.tags.forEach(element => {
        skillSets.push(element.value);
      });
    } else {
      skillSets = null;
    }

    this.skillsSetsAre=skillSets;
    console.log(this.skillsSetsAre);
    this.skillsSetsAre=skillSets;
    this.getAllRecruitersCandidates({
      skillsets : skillSets,
      searchType : "skills",
      recruiterId: this.userId,
      searchTerm : this.SearchFrm.value.searchTerm
    });
    this.interviewList = [];
  }

}
