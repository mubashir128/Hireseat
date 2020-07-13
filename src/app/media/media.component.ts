
import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from '../_services/home.service';
declare var jQuery: any;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  videoUrl: any = "";
  homeVideos: any;
  theBiggestDiff = "http://d2sxx94kqj1yrr.cloudfront.net/The%20biggest%20difference%20between%20Agency%20and%20Corp%20Recruiters%20-%20Rockstar%20HR%20Manager%20Sonia%20Chaves.mp4";
  nervousness = "http://d2sxx94kqj1yrr.cloudfront.net/How to control nervousness in an interview- Amy Beaulieu.mp4";
  nyc = "https://hireseat-home-videos.s3-us-west-2.amazonaws.com/NYC+Best+Recruiter+explains+what+is+important+in++a+resume.mp4";
  fixing = "https://hireseat-home-videos.s3-us-west-2.amazonaws.com/Fixing+the+Job+Interview+Process+-+Hireseat++-+Raya+Rahbari.mp4";
  bestWay = "http://d2sxx94kqj1yrr.cloudfront.net/Best way to prepare for an interview - HIRESEAT - LIZ OTTO [CAREER SERVICES].mp4";
  howToAnsBigg = "http://d2sxx94kqj1yrr.cloudfront.net/How to answer the biggest weakness question.mp4 ";
  toxic = "https://hireseat-home-videos.s3-us-west-2.amazonaws.com/How+to+improve+a+toxic+work+culture+-+Hireseat++-+Raya+Rahbari.mp4";
  fakeConfidence = "http://d2sxx94kqj1yrr.cloudfront.net/Can you fake confidence- Amy Beaulieu.mp4";
  constructor(
    private homeService: HomeService
  ) {

  }

  ngOnInit() {
    jQuery('.modal').modal();
    this.getAllHomeScreenVideos();
  }
  getAllHomeScreenVideos() {
    this.homeService.getAllHomeVideos().subscribe(data => {
      this.homeVideos = data;
    });
  }

  showVideo(videoUrl) {
    this.videoUrl = videoUrl;
    jQuery('#VideoModal').modal('open');
    var media: any = document.getElementById("selectedVideo");
    media.pause();
    // media.currentTime = 20;
    setTimeout(() => {
      const playPromise = media.play();
      if (playPromise !== null) {
        playPromise.catch(() => { media.play(); })
      }
    }, 1000)
    //document.getElementById('VideoModal').play();
    //this.resumeVisible = 1;
  }
  topFunction() {
    this.scrollToTop();
    /*   document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; */

  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 10));
      }
    })();
  }

  closeVideoModal() {
    var media: any = document.getElementById("selectedVideo");
    media.pause();
    //   jQuery("#VideoModal").on('hidden.bs.modal', function (e) {
    //     jQuery("#VideoModal video").attr("src", jQuery("#VideoModal video").attr("src"));
    // });
    jQuery('#VideoModal').modal('close');

  }

}
