
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FeedbackService } from 'src/app/_services/feedback.service';
declare var $: any;
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'app-feedback-resumes',
  templateUrl: './feedback-resumes.component.html',
  styleUrls: ['./feedback-resumes.component.css']
})
export class FeedbackResumesComponent implements OnInit {
  ResumeList: any[] = [];
  errorMsg: boolean = false;
  noRecords: boolean = false;
  public FeedObj: any = {};
  public skillsPt: Number;
  public experiencePt: Number;
  public personalityPt: Number;
  resumeVisible: number = 0;
  public resumeUrl: String = "";
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.route.params.subscribe(params => { this.handleRequest(params['key']); });
  }

  selectRating(event) {
    $(event.srcElement).parent().find("label").css({ "color": "#D8D8D8" });
    $(event.srcElement).css({ "color": "#FFC107" });
    $(event.srcElement).nextAll().css({ "color": "#FFC107" });
  }

  handleRequest(key) {
    this.feedbackService.getBidsById(key).subscribe((data) => {
      if (data != null) {
        this.ResumeList = data
        if (!(this.ResumeList.length > 0)) {
          this.errorMsg = true;
        }
      } else {
        this.noRecords = true;
      }
    }, (error) => {
      console.log(error);
    })
  }


  feedBack(resumeBidId, interviewOrReject, commentId) {
    this.skillsPt = ($("input[name='" + 'rating1' + resumeBidId + "']:checked").val())
    this.experiencePt = ($("input[name='" + 'rating2' + resumeBidId + "']:checked").val())
    this.personalityPt = ($("input[name='" + 'rating3' + resumeBidId + "']:checked").val())
    if (this.skillsPt != undefined && this.experiencePt != undefined && this.personalityPt != undefined) {
      this.FeedObj.skillsPt = this.skillsPt;
      this.FeedObj.experiencePt = this.experiencePt;
      this.FeedObj.personalityPt = this.personalityPt;
      this.FeedObj.interviewOrReject = (interviewOrReject == "yes" ? true : false);
      this.FeedObj.BidId = resumeBidId;
      this.FeedObj.Comment = $("#" + commentId).val() == "" && $("#" + commentId).val() == undefined ? "" : $("#" + commentId).val();

      this.feedbackService.saveFeedBack(this.FeedObj).subscribe((data: any) => {
        if (data.res == "success") {
          Materialize.toast('Feedback Submitted Successfully !', 1000)
          this.ngOnInit();
        } else {
          Materialize.toast('Something Went Wrong', 1000)
        }
      }, (error) => {
        console.log(error)
      })
    } else {
      Materialize.toast('Please give the rating first', 1000)
    }
  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  showResume(url) {
    jQuery('html, body').css('overflow', 'hidden');
    this.resumeVisible = 1;
    this.resumeUrl = url;
  }

  closeResume() {
    jQuery('html, body').css('overflow', 'auto');
    this.resumeVisible = 0;
  }
}
