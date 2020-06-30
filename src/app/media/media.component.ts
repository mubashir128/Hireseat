
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
