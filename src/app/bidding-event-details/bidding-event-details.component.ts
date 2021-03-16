import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";
import { IBiddingEvent, BiddingEvent } from "../models/bidding-event";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { BiddingEventService } from "../_services/bidding-event.service";
import { RemainingTime } from "../models/remaining-time";
import { Utils } from "../models/utils/utils";
import { BiddingInfoComponent } from "../bidding-info/bidding-info.component";
import { FeedbackService } from "../_services/feedback.service";
import { PushNotificationService } from "../_services/push-notification.service";
import { WebsocketService } from "../_services/websocket.service";
import { ContentObserver } from "@angular/cdk/observers";
import { CandidateService } from "../_services/candidate.service";
declare var CryptoJS: any;
declare var jQuery: any;
@Component({
  selector: "app-bidding-event-details",
  templateUrl: "./bidding-event-details.component.html",
  styleUrls: ["./bidding-event-details.component.css"]
})
export class BiddingEventDetailsComponent implements OnInit {
  public loggedUser: any;
  public biddingEvent: IBiddingEvent;
  public jobProfileData: any;
  public employerProfile: any;
  biddingStatus: number = 0;
  public queid: any;
  remainingTime: RemainingTime = new RemainingTime();
  userRole: number = 0;
  Base64: any;
  resumecount: any;
  interviewcount: any;
  hiredcount: any;

  id: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _AuthService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private bidEventService: BiddingEventService,
    private feedbackService: FeedbackService,
    private _pushNotify: PushNotificationService,
    private _socket: WebsocketService,
    private _candidateService: CandidateService
  ) {
    let a = this;
    this.Base64 = {
      // private property
      _keyStr:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

      // public method for encoding
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = a.Base64._utf8_encode(input);

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output =
            output +
            a.Base64._keyStr.charAt(enc1) +
            a.Base64._keyStr.charAt(enc2) +
            a.Base64._keyStr.charAt(enc3) +
            a.Base64._keyStr.charAt(enc4);
        }

        return output;
      },

      // public method for decoding
      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
          enc1 = a.Base64._keyStr.indexOf(input.charAt(i++));
          enc2 = a.Base64._keyStr.indexOf(input.charAt(i++));
          enc3 = a.Base64._keyStr.indexOf(input.charAt(i++));
          enc4 = a.Base64._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }

        output = a.Base64._utf8_decode(output);

        return output;
      },

      // private method for UTF-8 encoding
      _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }

        return utftext;
      },

      // private method for UTF-8 decoding
      _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c2 = 0;
        var c3 = 0;

        while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(
              ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
            );
            i += 3;
          }
        }
        return string;
      }
    };
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("key");

    this.feedbackService.getBidsByIdCount(this.id).subscribe(res => {
      this.resumecount = res;
    });
    this.feedbackService.getInterviewdResumeCount(this.id).subscribe(res => {
      this.interviewcount = res;
    });
    this.feedbackService.getHiredResumeCount(this.id).subscribe(res => {
      this.hiredcount = res;
    });

    this.loggedUser = this.userService.getUserData();
    jQuery(".tabs").tabs();

    if (this.loggedUser != "no") {
      this.route.params.subscribe(params => {
        this.handleRequest(params["key"]);
      });
      if(this.loggedUser.userRole == "employer"){
        this.userRole = 1;//if employer login userRole should be 1
      }else if(this.loggedUser.userRole == "recruiter"){
        this.userRole = 2;//if recruiter login userRole should be 2
      }else if(this.loggedUser.userRole == "candidate"){
        this.userRole = 3;//if recruiter login userRole should be 3
      }
      // this.userRole = this.loggedUser.userRole == "employer" ? 1 : 2;
      this.biddingEvent = new BiddingEvent();
    } else {
      this.router.navigate(["login"]);
    }
  }

  handleRequest(_id) {
    this.spinner.show();
    this.bidEventService.getBiddingEventById(_id).subscribe(
      (data: any) => {
        if (data != null && data != undefined && data != "") {
          this.biddingEvent = data;
          this.biddingEvent.jobTitle = data.jobProfileKey.jobTitle;
          this.biddingEvent.$key = data._id;
          this.jobProfileData = data.jobProfileKey;
          this.employerProfile = data.employerKey;
          if (this.biddingEvent) {
            this.remainingTime = Utils.getRemainingTime(this.biddingEvent);
            if (this.biddingEvent.status === BiddingEvent.STATUS_ACTIVE) {
              this.biddingStatus = 1;
            } else if (
              this.biddingEvent.status === BiddingEvent.STATUS_EXPIRED
            ) {
              this.biddingStatus = -1;
            } else {
              this.biddingStatus = 0;
            }

            if(this.loggedUser.userRole == "recruiter" && this.employerProfile._id === this.loggedUser._id){
              this.feedbackService.getRecrutierCandidateBidsByIdCount(this.id).subscribe(res => {
                this.resumecount = res;
              });
            }

            if(this.loggedUser.userRole == "candidate"){
              this._candidateService.getCandidateProfileBid(this.biddingEvent.$key).subscribe((res) => {
                if(res.isSubmited){
                  this.resumecount = 1;
                }
              });
            }

          }
          this.configureMuut();
          // this.ngOnInit();
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  numberWithCommas(x) {
    if (x != null) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  showDiv: any = "jobprofile";

  addActiveClass(event, divId = "jobprofile") {
    if (divId == "jobprofile") {
      this.showDiv = "jobprofile";
    } else if (divId == "jobprofilecost") {
      this.showDiv = "jobprofilecost";
    } else if (divId == "quetions") {
      this.showDiv = "quetions";
    } else if (divId == "resume") {
      this.showDiv = "resume";
    } else if (divId == "interview") {
      this.showDiv = "interview";
    } else if (divId == "hire") {
      this.showDiv = "hire";
    } else {
      this.showDiv = "resume";
    }

    jQuery(".bx-pager-item").removeClass("active");
    jQuery(event.target)
      .parent()
      .addClass("active");
  }

  configureMuut() {
    var id = this.loggedUser.email;
    var displayname = this.loggedUser.fullName;
    var email = this.loggedUser.email;

    var user = {
      user: {
        id: id, // required
        displayname: displayname, // required
        email: email,
        is_admin: false
      }
    };

    var message = this.BASE64(JSON.stringify(user));
    var timestamp = Math.round(Date.now() / 1000);
    var signature = this.SHA1(
      "Vi13o9HvxxN1mjhh78lW8gBb" + " " + message + " " + timestamp
    );

    jQuery("#my-community").muut({
      sso: true,
      api: {
        // API key for "hseat"- community
        key: "ZlhQY8ywDJ",
        // generate following on the server side (see below)
        message: message,
        signature: signature,
        timestamp: timestamp
      }
    });
  }

  SHA1(str) {
    return CryptoJS.SHA1(str).toString();
  }

  BASE64(str) {
    return this.Base64.encode(str);
  }

  resumeCount(count: any) {
    if(this.loggedUser.userRole == "recruiter" && this.employerProfile._id === this.loggedUser._id){
      return ;
    }
    this.resumecount = count;
  }

  funcInterviewCount(count: any) {
    this.interviewcount = count;
  }
  hiredCount(count: any) {
    this.hiredcount = count;
  }

  logout() {
    this._AuthService.logout();
  }

  scrollTo(divName: string) {
    jQuery("html,body").animate(
      {
        scrollTop: jQuery("#" + divName).offset().top
      },
      "slow"
    );
  }
}
