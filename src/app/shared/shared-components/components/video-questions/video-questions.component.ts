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
  @ViewChild('juiceBar') juiceBar: ElementRef;
  @ViewChild('bar') bar: ElementRef;

  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
    }[],
    controls: boolean
  };
  @Input() resume: any;
  @Input() questionsByRecruiter: any;
  @Input() questionNumber: any;
  // @Input() videoURL: any;
  showPlay = false;
  player: videojs.Player;
  time: any;
  isPlaying: boolean;
  vid = document.getElementById('myVideo');
  juice = document.getElementById('juice');
  btn = document.getElementById('play-pause');
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
  updateButton() {
    // console.log('update icon');
    if (this.target.nativeElement.paused) {
      this.showPlay = true;
    } else {
      this.showPlay = false;

    }
    // const playPromise = this.target.nativeElement.play();
    // if (playPromise !== undefined) {
    //   playPromise.then(() => {
    //     this.target.nativeElement.pause()
    //   })

    //   playPromise.catch((e) => {
    //     console.log(e);
    //   })
    // }https://codepen.io/azad6026/pen/yqpBgM
  }
  scrub(event) {
    console.log('scrubb');
    const scrubTime = (event.offsetX / this.bar.nativeElement.offsetWidth) * this.target.nativeElement.duration;
    this.target.nativeElement.currentTime = scrubTime;
    // this.play();
  }
  ngOnInit() {

    // this.target.nativeElement.addEventListener('play', this.play.bind(this));
    // this.target.nativeElement.addEventListener('pause', this.pause.bind(this));

    // video js events
    // this.target.nativeElement.addEventListener('click', this.togglePlay.bind(this));
    // this.target.nativeElement.addEventListener('timeupdate', () => {
    //   var juicePos = this.target.nativeElement.currentTime / this.target.nativeElement.duration;
    //   // this.juice.style.width = juicePos * 100 + "%";
    //   this.juiceBar.nativeElement.style.width = juicePos * 100 + "%";
    //   if (this.target.nativeElement.ended) {
    //     this.showPlay = true;
    //   }
    // });
    // let mousedown = false;
    // this.bar.nativeElement.addEventListener('click', this.scrub.bind(this));
    // this.bar.nativeElement.addEventListener('mousemove', (e) => mousedown && this.scrub(e));
    // this.bar.nativeElement.addEventListener('mousedown', () => mousedown = true);
    // this.bar.nativeElement.addEventListener('mouseup', () => mousedown = false);
    // end of videojs events

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

  }

  // play() {
  //   this.isPlaying =
  //     this.target.nativeElement.currentTime > 0
  //     && !this.target.nativeElement.paused
  //     && !this.target.nativeElement.ended
  //     && this.target.nativeElement.readyState > 2;
  //   console.log(this.isPlaying);

  //   if (!this.isPlaying) {
  //     this.target.nativeElement.play();
  //     if (!this.target.nativeElement.paused) {
  //       this.isPlaying = true;
  //       this.updateButton();
  //     }
  //   }
  // }
  // pause() {
  //   // console.log('while pause', this.isPlaying);

  //   if (this.isPlaying) {
  //     console.log('paused');

  //     this.target.nativeElement.pause();
  //     if (this.target.nativeElement.paused) {
  //       this.isPlaying = false;
  //       this.updateButton();
  //     }

  //   }
  // }
  seek(seconds) {

    // this.pause();
    // this.target.nativeElement.currentTime = seconds;
    // this.play();
  }
  setCurrentTime(seconds, questionNumber) {
    var video = document.getElementsByTagName('video')[0];
    const playPromise = video.play();
    // if (playPromise !== undefined) {
    //   playPromise.then(() => {
    //     video.pause()
    //   })

    //   playPromise.catch((e) => {
    //     console.log(e);
    //   })
    // }
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
    // this.seek(seconds);
    this.questionNumber = questionNumber;
    // this.target.nativeElement.loadingSpinner = true;
    try {
      // this.seek(seconds);

    } catch (e) {
      console.log(e);
      this.spinner.hide();


    }
  }
  // togglePlay() {
  //   const vid: HTMLMediaElement = document.getElementsByTagName('video')[0];
  //   // const method = vid.paused ? 'play' : 'pause';
  //   // vid[method]();
  //   if (this.target.nativeElement.paused) {
  //     this.play();
  //     // this.showPlay = false;
  //   } else {
  //     this.pause();
  //     // this.showPlay = true;

  //   }
  // }
  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
