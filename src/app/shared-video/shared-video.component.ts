import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';
import { ShareVideoService } from '../_services/share-video.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
// import { MatVideoComponent } from 'mat-video/lib/video.component';

@Component({
  selector: 'app-shared-video',
  templateUrl: './shared-video.component.html',
  styleUrls: ['./shared-video.component.css']
})
export class SharedVideoComponent implements OnInit, OnDestroy {
  @ViewChild('target') target: ElementRef;
  @ViewChild('matVideo') matVideo: ElementRef;
  checkSharedTokenSubscription: Subscription;
  questionNumber: any;
  videoURL: any;
  player: videojs.Player;
  token: any;
  currentResume: any;
  questionsByRecruiter: any;
  resume: any;
  // mat 
  ngclass = "mat-video-responsive";
  time: any;
  autoPlay = true;
  preload = true;
  loop = false;
  quality = true;
  download = true;
  fullscreen = true;
  playsinline = false;
  showFrameByFrame = false;
  keyboard = true;
  color = "primary";
  spinnerType = "spin";
  overlay = null;
  muted = true;
  isTokenValid = false;
  isShareFromRecruiter: boolean;
  isQuestion: boolean;
  comments: any;
  showError = false;
  buff: any;
  isbufferLoader = false;
  timeNow: number;
  constructor(
    private elementRef: ElementRef,
    private sharedVideoService: ShareVideoService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
    this.isTokenValid = false;
    this.spinner.show();
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    const isCandidate = this.token.split('@')[1];
    // console.log('welcome to lazyloading', this.token, isCandidate);
    if (isCandidate === 'candidate') {
      const candidateToken = this.token.split('@')[0];
      this.checkSharedTokenSubscription = this.sharedVideoService.checkCandidateSharedToken(candidateToken).subscribe((res) => {
        this.spinner.show();
        // debugger
        if (res) {
          // console.log(res);
          // if (res.from === 'recruiter') {

          this.isShareFromRecruiter = true;
          this.isTokenValid = true;
          this.resume = res.resumeData[0];
          this.videoURL = res.videoUrl;
          this.questionsByRecruiter = this.resume.questionsByRecruiter[0];
          // console.log('questionsByRecruiter', this.questionsByRecruiter);

          this.comments = this.resume.comments;
          if (this.questionsByRecruiter === null) {

            if (this.questionsByRecruiter.lenghth <= 0) {
              this.isQuestion = false;
              this.spinner.hide();

            }
          }
          this.spinner.hide();

          // }
        }
      }, err => {
        // console.log(err, '***************************look up*********************');
        this.isTokenValid = false;
        if (!this.isTokenValid) {
          this.showError = true;
        }
        this.spinner.hide();
      });
    } else {
      this.checkSharedTokenSubscription = this.sharedVideoService.checkSharedToken(this.token).subscribe((res) => {
        this.spinner.show();
        // debugger
        if (res) {
          // console.log(res);
          if (res.from === 'recruiter') {

            this.isShareFromRecruiter = true;
            this.isTokenValid = true;
            this.resume = res.resumeData[0];
            this.videoURL = res.videoUrl;
            this.questionsByRecruiter = this.resume.questionsByRecruiter[0];
            // console.log('questionsByRecruiter', this.questionsByRecruiter);

            this.comments = this.resume.comments;
            if (this.questionsByRecruiter === null) {

              if (this.questionsByRecruiter.lenghth <= 0) {
                this.isQuestion = false;
                this.spinner.hide();

              }
            }
            this.spinner.hide();

          } else if (res.from === 'employer') {
            this.isShareFromRecruiter = false;
            this.currentResume = res.bidData[0];
            this.questionsByRecruiter = this.currentResume.resumeKey.questionsByRecruiter[0];
            if (this.questionsByRecruiter === null) {

              if (this.questionsByRecruiter.lenghth <= 0) {
                this.isQuestion = false;
                this.spinner.hide();

              }
            }
            this.resume = this.currentResume.resumeKey;
            // console.log(this.resume);
            this.videoURL = res.videoUrl;
            this.isTokenValid = true;
            this.spinner.hide();
          }
        }
      }, err => {
        // console.log(err, '***************************look up*********************');
        this.isTokenValid = false;
        if (!this.isTokenValid) {
          this.showError = true;
        }
        this.spinner.hide();
      });
    }
    if (this.player) {
      this.target.nativeElement.play();

    }
  }

  ngAfterViewInit() {
    // instantiate Video.js
    if (this.videoURL && this.isTokenValid) {
      this.spinner.show();

      // this.player = videojs(this.target.nativeElement, {
      //   "autoplay": true,
      //   controlls: true,
      //   preload: true,
      //   currentTime: 10
      // }, function onPlayerReady() {
      //   this.target.nativeElement.play();
      //   this.spinner.hide();
      //   console.log('onPlayerReady', this);
      // }, err => {
      //   this.spinner.hide();

      // });
      // console.log(this.player.onwaiting());

    } else {
      // console.log('token is not valid');
      this.spinner.hide();

    }

  }
  setCurrentTime(seconds, questionNumber) {
    this.questionNumber = questionNumber;
    // this.target.nativeElement.loadingSpinner = true;
    this.isbufferLoader = true;
    this.spinner.show();
    try {
      this.time = seconds;
      // this.buff = this.target.nativeElement.buffered.end(0) - this.target.nativeElement.buffered.start(0);
      // this.target.nativeElement.currentTime = seconds;
      // this.target.nativeElement.controlls = true;
      // this.target.nativeElement.autoplay = true;
      // this.target.nativeElement.play();
      // setTimeout(() => {
      this.spinner.hide();
      //   // this.target.nativeElement.loadingSpinner = false;
      // }, this.buff);

    } catch (e) {
      console.log(e);
      this.spinner.hide();
      this.isbufferLoader = false;

    }
  }
  transform(url) {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  }

  ngOnDestroy(): void {
    if (this.checkSharedTokenSubscription) {
      this.checkSharedTokenSubscription.unsubscribe();
    }
  }
}
