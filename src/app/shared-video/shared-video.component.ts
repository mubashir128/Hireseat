import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
// import videojs from 'video.js';
import { ShareVideoService } from '../_services/share-video.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
// import { MatVideoComponent } from 'mat-video/app/video/video.component';

@Component({
  selector: 'app-shared-video',
  templateUrl: './shared-video.component.html',
  styleUrls: ['./shared-video.component.css']
})
export class SharedVideoComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  // @ViewChild('vid') matVideo: MatVideoComponent;
  @ViewChild('myVideo', { static: true }) myVideo: ElementRef;
  vid: HTMLVideoElement;
  checkSharedTokenSubscription: Subscription;
  questionNumber: any;
  videoURL: any;
  options: {
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  // player: videojs.Player;
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
  color = "primary"; // accent, primary, warn
  spinnerType = "spin";
  // hourglass , split-ring, dot , spin
  overlay = null;
  muted = false;
  isTokenValid = false;
  isShareFromRecruiter: boolean;
  isQuestion: boolean;
  comments: any;
  showError = false;
  showCustomLoader = false;
  buff: any;
  isbufferLoader = false;
  timeNow: number;
  recruiterDetails: any;
  constructor(
    private elementRef: ElementRef,
    private sharedVideoService: ShareVideoService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
    this.isTokenValid = false;
    this.showCustomLoader = false;
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
          this.showCustomLoader = true;
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
        this.showCustomLoader = false;
        if (!this.isTokenValid) {
          this.showError = true;
          this.showCustomLoader = true;

        }
        this.spinner.hide();
      });
    } else {
      this.checkSharedTokenSubscription = this.sharedVideoService.checkSharedToken(this.token).subscribe((res) => {
        this.spinner.show();
        // debugger
        if (res) {

          if (res.from === 'recruiter') {

            this.isShareFromRecruiter = true;
            this.isTokenValid = true;
            this.showCustomLoader = true;

            this.resume = res.resumeData[0];
            this.recruiterDetails = res.resumeData[1];
            this.videoURL = res.videoUrl;

            this.comments = this.resume.comments;
            this.questionsByRecruiter = this.resume.questionsByRecruiter ? this.resume.questionsByRecruiter[0] : undefined;

            if (this.questionsByRecruiter === null) {

              if (this.questionsByRecruiter.length <= 0) {
                this.isQuestion = false;
                this.spinner.hide();

              }
            }
            this.spinner.hide();

          } else if (res.from === 'employer') {
            this.isShareFromRecruiter = false;
            this.currentResume = res.bidData[0];
            this.questionsByRecruiter = this.currentResume.resumeKey.questionsByRecruiter ? this.currentResume.resumeKey.questionsByRecruiter[0] : undefined;
            if (this.questionsByRecruiter === null) {

              if (this.questionsByRecruiter.length <= 0) {
                this.isQuestion = false;
                this.spinner.hide();

              }
            }
            this.resume = this.currentResume.resumeKey;
            // console.log(this.resume);
            this.videoURL = res.videoUrl;

            this.isTokenValid = true;
            this.showCustomLoader = true;

            this.spinner.hide();
          }
        }
      }, err => {
        // console.log(err, '***************************look up*********************');
        this.isTokenValid = false;
        this.showCustomLoader = false;
        if (!this.isTokenValid) {
          this.showError = true;
          this.showCustomLoader = true;
        }
        this.spinner.hide();
      });
    }


  }

  ngAfterViewInit() {
    var media: any = document.getElementById("myVideo");

    // instantiate Video.js
    if (this.videoURL && this.isTokenValid) {
      this.spinner.show();

      if (this.target.nativeElement.paused) {
        console.log('play/pause');

        this.target.nativeElement.play();
      }
      setTimeout(() => {
        const playPromise = this.target.nativeElement.play();
        if (playPromise !== null) {
          playPromise.catch(() => { this.target.nativeElement.play(); })
        }
      }, 1000)

    } else {
      // console.log('token is not valid');
      this.spinner.hide();

    }

  }
  onClick(event) {
    console.log('***********', event);

  }
  play() {
    if (this.target.nativeElement.paused) {
      this.target.nativeElement.play();
    }
  }
  pause() {
    this.target.nativeElement.pause();
  }
  seek(seconds) {
    this.pause();
    this.target.nativeElement.currentTime = seconds;
    this.play();
  }
  setCurrentTime(seconds, questionNumber) {
    var media: any = document.getElementById("myVideo");


    this.questionNumber = questionNumber;
    this.target.nativeElement.loadingSpinner = true;
    this.isbufferLoader = true;
    try {
      this.seek(seconds);

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
  ngOnChanges() {

  }
  linkedIn(url) {
    window.open(url, "_blank");

  }
  ngOnDestroy(): void {
    if (this.checkSharedTokenSubscription) {
      this.checkSharedTokenSubscription.unsubscribe();
    }
  }
}
