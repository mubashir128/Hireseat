import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import videojs from 'video.js';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-video-questions',
  templateUrl: './video-questions.component.html',
  styleUrls: ['./video-questions.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoQuestionsComponent implements OnInit, OnChanges, OnDestroy {
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
  // @Input() videoURL: any;

  player: videojs.Player;
  time: any;
  constructor(
    private elementRef: ElementRef,
    private spinner: NgxSpinnerService,

  ) {

  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.target.nativeElement.addEventListener('change', () => {
    //   console.log('changes');

    // })

  }
  ngOnInit() {
    // console.table(this.resume);
    // console.log(this.questionsByRecruiter);

    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      // console.log('onPlayerReady', this);
      this.on('ended', () => {
        // videojs.log('Awww...over so soon?!');
        // console.log('ended');

      });
      this.on('play', () => {
        // console.log('play');

      });
      this.on('pause', () => {
        // console.log('pause');

      });
      // this.on('loadedmetadata', () => {
      //   this.currentTime(this.time)
      // })
      this.one('seeked', (event) => {
        // console.log(event);

      });

      const playPromise = this.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.play();
        })

        playPromise.catch((e) => {
          // console.log(e);
          this.pause()
        })
      }
    });
    var media: any = document.getElementById("myVideo");
    // console.log(media.duration);

  }

  play() {
    const playPromise = this.target.nativeElement.play();
    if (playPromise !== null) {
      playPromise.catch(() => { this.target.nativeElement.play(); })
    }
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
    var video = document.getElementsByTagName('video')[0];
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.pause()
      })

      playPromise.catch((e) => {
        console.log(e);
      })
    }
    video.currentTime = seconds;
    // this.player.currentTime(seconds);
    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.play()
      })

      playPromise.catch((e) => {
        console.log(e);
        video.pause()
      })
    }

    // video.play();
    // this.time = seconds;

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
      // this.seek(seconds);

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
