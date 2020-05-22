import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';
import { ShareVideoService } from '../_services/share-video.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-shared-video',
  templateUrl: './shared-video.component.html',
  styleUrls: ['./shared-video.component.css']
})
export class SharedVideoComponent implements OnInit, OnDestroy {
  @ViewChild('target') target: ElementRef;
  checkSharedTokenSubscription: Subscription;
  questionNumber: any;
  videoURL: any;
  player: videojs.Player;
  token: any;
  currentResume: any;
  questionsByRecruiter: any;
  resume: any;
  isTokenValid: boolean;
  constructor(
    private elementRef: ElementRef,
    private sharedVideoService: ShareVideoService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.paramMap.get('token');

    this.checkSharedTokenSubscription = this.sharedVideoService.checkSharedToken(this.token).subscribe((res) => {
      if (res) {
        // console.log(res);
        this.currentResume = res.bidData[0];
        this.questionsByRecruiter = this.currentResume.resumeKey.questionsByRecruiter[0];
        this.resume = this.currentResume.resumeKey;
        // console.log(this.resume);
        this.videoURL = res.videoUrl;
        this.isTokenValid = true;
      }
    }, err => {
      // console.log(err, '***************************look up*********************');
      this.isTokenValid = false;

    });
  }
  ngAfterViewInit() {
    // instantiate Video.js
    if (this.videoURL && this.isTokenValid) {
      this.player = videojs(this.target.nativeElement, {
        autoplay: true,
        controlls: true
      }, () => {
        // console.log('onPlayerReady', this);
      });
    } else {
      console.log('token is not valid');

    }

  }
  setCurrentTime(seconds, questionNumber) {
    this.questionNumber = questionNumber;
    console.log(this.questionNumber);

    try {
      this.target.nativeElement.currentTime = seconds;
    } catch (e) {
      console.log(e);

    }
  }
  transform(url) {
    if (url != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

  }
  ngOnDestroy(): void { }
}
