import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-video-questions',
  templateUrl: './video-questions.component.html',
  styleUrls: ['./video-questions.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoQuestionsComponent implements OnInit, OnDestroy {
  @ViewChild('target') target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
  };
  @Input() resume: any;
  @Input() questionsByRecruiter: any;
  @Input() questionNumber: any;
  @Input() videoURL: any;

  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit() {
    // console.table(this.resume);
    // console.log(this.questionsByRecruiter);

    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
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

    // setTimeout(() => {
    //   const playPromise = this.target.nativeElement.play();
    //   if (playPromise !== null) {
    //     playPromise.catch(() => { this.target.nativeElement.play(); })
    //   }
    // }, 1000);
    // console.log(media);

    this.questionNumber = questionNumber;
    this.target.nativeElement.loadingSpinner = true;
    try {
      this.seek(seconds);

    } catch (e) {
      console.log(e);
      this.spinner.hide();


    }
  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
