import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ResumeService } from 'src/app/_services/resume.service';
import { VideoCallingService } from 'src/app/_services/video-calling.service';

declare var jQuery;
declare var $: any;
declare var Materialize;
@Component({
  selector: 'app-shared-candidate-profiles',
  templateUrl: './shared-candidate-profiles.component.html',
  styleUrls: ['./shared-candidate-profiles.component.css']
})
export class SharedCandidateProfilesComponent implements OnInit {
  resumes: any;
  getVideoURLSubscription: Subscription;
  getAllSharedCandidateProfileSubscription: Subscription;
  constructor(
    private resumeService: ResumeService,
    private sanitizer: DomSanitizer,
    private videoCallingService: VideoCallingService
  ) { }

  ngOnInit() {
    this.getAllSharedResumes();
  }
  getAllSharedResumes() {
    this.getAllSharedCandidateProfileSubscription = this.resumeService.getAllSharedCandidateProfile().subscribe(res => {
      if (res) {
        console.log(res);

        this.resumes = res;
      }
    }, err => {

    })
  }
  getVideo(payload) {
    this.getVideoURLSubscription = this.videoCallingService.getArchivedVideo(payload).subscribe((url) => {
      if (url) {
        window.open(url.url);
        // console.log(url);
      } else {
        // console.log('unable to load url');
        Materialize.toast('unable to load url', 3000);
      }
    });
  }
  linkedIn(url) {
    window.open(url, "_blank");

  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
