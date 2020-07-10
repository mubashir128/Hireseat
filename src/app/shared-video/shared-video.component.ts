import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';
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
export class SharedVideoComponent implements OnInit, OnDestroy {
  @ViewChild('target') target: ElementRef;
  // @ViewChild('vid') matVideo: MatVideoComponent;
  @ViewChild('myVideo') myVideo: ElementRef;
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
          this.options = {
            autoplay: true,
            sources: [{
              src: this.videoURL,
              type: 'video/mp4'
            }]
          };
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

          // console.log(res);
          if (res.from === 'recruiter') {

            this.isShareFromRecruiter = true;
            this.isTokenValid = true;
            this.showCustomLoader = true;

            this.resume = res.resumeData[0];
            this.videoURL = res.videoUrl;
            this.options = {
              autoplay: true,
              sources: [{
                src: this.videoURL,
                type: 'video/mp4'
              }]
            };
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
            this.options = {
              autoplay: true,
              sources: [{
                src: this.videoURL,
                type: 'video/mp4'
              }]
            };
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


    // video mat 
    // this.vid = this.matVideo.getVideoTag();

    // Use Angular renderer or addEventListener to listen for standard HTML5 video events

    // this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    // this.vid.addEventListener('ended', (event) => console.log('video ended', event))
  }

  ngAfterViewInit() {

    // instantiate Video.js
    if (this.videoURL && this.isTokenValid) {
      this.spinner.show();
      // this.options = {
      //   autoplay: true,
      //   sources: [{
      //     src: this.videoURL,
      //     type: 'video/mp4'
      //   }]
      // };
      // {
      //   "autoplay": true,
      //   controlls: true,
      //   preload: true
      // }
      this.player = videojs(this.target.nativeElement, {
        autoplay: true,
        controls: true,
        preload: true,
        fluid: true,
        aspectRatio: '4:3',
        plugins: {
          hotkeys: {}
        }
      }, function onPlayerReady() {
        this.target.nativeElement.play();
        this.spinner.hide();
        console.log('onPlayerReady', this);
      }, err => {
        this.spinner.hide();

      });

      // console.log(this.player.onwaiting());
      if (this.target.nativeElement.paused) {
        this.target.nativeElement.play();
      }

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
    this.questionNumber = questionNumber;
    this.target.nativeElement.loadingSpinner = true;
    this.isbufferLoader = true;
    // this.spinner.show();
    try {
      this.time = seconds;
      this.autoPlay = true;
      this.seek(seconds);
      // this.buff = this.target.nativeElement.buffered.end(0) - this.target.nativeElement.buffered.start(0);
      // this.target.nativeElement.currentTime = seconds;
      // this.target.nativeElement.controlls = true;
      // this.target.nativeElement.autoplay = true;
      // this.target.nativeElement.play();
      // setTimeout(() => {
      //   this.spinner.hide();
      //   this.target.nativeElement.loadingSpinner = false;
      // }, this.buff);
      // this.target.nativeElement.addEventListener('click', this.onClick.bind(this));

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
