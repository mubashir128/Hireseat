import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services/authentication.service";
import { UserService } from "../_services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BlogService } from "../_services/blog.service";
import { DomSanitizer } from "@angular/platform-browser";

declare var jQuery: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  verifyEmail: FormGroup;
  verifyOtp: FormGroup;
  askQues: FormGroup;
  emailValues = "";
  public users: any = [];
  leaders: any[] = [];
  resumeVisible: number = 0;
  videoUrl: string = "";
  verifyEmailData: any;
  verifyOtpData;
  any;
  askQuesData: any;
  verfStatus: boolean = false;
  msgForPopup = "";
  askusersData: any;
  submitted = false;
  emailSubmitted = false;
  otpSubmitted = false;
  blogPOstData: any[] = [];
  meetUpsData: any;
  limit = 1000;
  article: any = [];

  loggedInUser : any;
  isLoggedIn = false;
  btnName = "Login";

  constructor(
    private formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _AuthService: AuthenticationService,
    private _blogservice: BlogService,
    private router: Router,
    private _Userservice: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    window.addEventListener("scroll", this.scroll, true);

    this.loggedInUser = this._Userservice.getUserData();
    if (this.loggedInUser != "no") {
      this.isLoggedIn = true;
      this.btnName = "Enter";
    }

  }

  ngOnInit() {
    // scroll to top
    $(document).ready(function () {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        1500
      );
    });
    jQuery(".modal").modal();
    this.spinner.show();
    this._Userservice.getmeetup().subscribe(
      (data) => {
        if (data) {
          this.meetUpsData = data;
        } else {
          console.log("data not received");
          this.spinner.hide();
        }
      },
      (err) => {
        console.log("error ouccured");

        this.spinner.hide();
      }
    );
    // this._Userservice.getTopRecruiter().subscribe((data) => {
    //   if (data.length > 0) {
    //     this.leaders = data;
    //   } else {
    //     this.leaders = [];
    //   }
    //   this.spinner.hide();

    // }, (error) => {
    //   this.spinner.hide();
    //   console.log(error)
    // });

    this.limit = this.pageCount() + 10;
    this._blogservice.getAllBlogPost(this.limit).subscribe(
      (res) => {

        this.article = res.data;
        this.spinner.hide();
        // console.log(this.article);
        // video uplodad
        //  res.data.forEach((data,i) => {
        //    if(data.video || data.embbedded ){
        //     // console.log(data);

        //    this.blogPOstData.push({title:data.title,description:data.description,blogurl:data.blogurl,categories:data.categories,video:data.video,embbedded:data.embbedded});

        //    }
        //  });
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );

    this.route.params.subscribe((params) => {
      this.handleRequest(params["id"]);
    });
    this.verifyEmail = this.formBuilder.group({
      emailVerify: ["", [Validators.required, Validators.email]]
    });
    this.verifyOtp = this.formBuilder.group({
      otpVerify: ["", [Validators.required]]
    });
    this.askQues = this.formBuilder.group({
      addQuestions: ["", [Validators.required]]
    });

    this.askusersData = this._Userservice.getaskQuesUserId();
  }

  pageCount() {
    return this.article.length;
  }
  truncateHTML(text: string): string {
    let charlimit = 450;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, "");
    let trim_space = without_html.trim().replace(/&nbsp;/g, "");
    let shortened = trim_space.substring(0, charlimit) + "...";
    return shortened;
  }
  handleRequest(id) {
    if (id != undefined) {
      let scrollTo: any = jQuery("#" + id);
      jQuery("html,body").animate({ scrollTop: scrollTo.offset().top });
    }
  }

  scrollToNextSlide() {
    //console.log('scrollToNextSlide');
    let scrollTo: any = jQuery("#slide-2");
    jQuery("html,body").animate({ scrollTop: scrollTo.offset().top });
  }

  createNewAccount(role) {
    localStorage.setItem("Role", role);
    this.router.navigate(["/register"]);
  }

  logout() {
    this._AuthService.logout();
    this.router.navigate(["/login"]);
  }

  scroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      jQuery("#myBtn").show();
    } else {
      jQuery("#myBtn").hide();
    }
  }

  topFunction() {
    this.scrollToTop();
    /*   document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; */
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 10);
      }
    })();
  }

  closeVideoModal() {
    jQuery("#VideoModal").modal("close");
  }

  showVideo(videoUrl) {
    this.videoUrl = videoUrl;
    jQuery("#VideoModal").modal("open");
    var media: any = document.getElementById("selectedVideo");
    media.pause();
    setTimeout(() => {
      const playPromise = media.play();
      if (playPromise !== null) {
        playPromise.catch(() => {
          media.play();
        });
      }
    }, 1000);
    //document.getElementById('VideoModal').play();
    //this.resumeVisible = 1;
  }
  showforumPopup() {
    jQuery("#forumsPop").modal("open");
  }
  emailConfirmPopup() {
    jQuery("#emailConfirmPop").modal("open");
  }
  closeEmailConfirmpopup() {
    jQuery("#emailConfirmPop").modal("close");
  }
  closeForumModel() {
    jQuery("#forumsPop").modal("close");
  }
  get f() {
    return this.verifyEmail.controls;
  }
  get otpVali() {
    return this.verifyOtp.controls;
  }
  // get quesValid(){return this.askQues.controls;}

  verifyUser() {
    this.submitted = true;
    if (this.verifyEmail.invalid) {
      return;
    }
    this.verifyEmailData = this.verifyEmail.value;
    const email = this.verifyEmailData;

    this._Userservice.userverification(email).subscribe(
      (res) => {
        // console.log(res)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.emailSubmitted = true;
    if (this.verifyEmail.invalid) {
      return;
    }
    this.verifyEmailData = this.verifyEmail.value;
    //console.log(this.verifyEmailData.emailVerify)
    const email = this.verifyEmailData;

    this._Userservice.sendEmail(email).subscribe(
      (res) => {
        if ((res.status = "success")) {
          this.msgForPopup = res.message;
          //console.log(res)
          if (res.data) {
            this.verfStatus = res.data.isVerified;
            localStorage.setItem("askQuestionUser", JSON.stringify(res.data));
          }
          this.emailConfirmPopup();
        }
      },
      (err) => console.log(err)
    );
  }
  //verify otp functionality
  checkOtp() {
    this.otpSubmitted = true;
    if (this.verifyOtp.invalid) {
      return;
    }
    this.verifyEmailData = this.verifyEmail.value;
    this.verifyOtp.value["email"] = this.verifyEmailData.emailVerify;

    this.verifyOtpData = this.verifyOtp.value;
    //console.log(this.verifyOtpData);
    const data = this.verifyOtpData;
    this._Userservice.checkOtpEm(data).subscribe(
      (res) => {
        //console.log(res);
        this.verfStatus = res.data.isVerified;

        localStorage.setItem("askQuestionUser", JSON.stringify(res.data));
        if ((res.status = "success")) {
          this.msgForPopup = res.message;
          this.emailConfirmPopup();
        } else if ((res.status = "failed")) {
          this.msgForPopup = res.message;
          this.emailConfirmPopup();
        }
      },
      (err) => {
        //console.log(err)
        this.msgForPopup = err;
        this.emailConfirmPopup();
      }
    );
  }
  navigate(url) {
    this.router.navigate(["/blog/", url]);
  }
  //add question functionality
  addQuest() {
    this.askusersData = this._Userservice.getaskQuesUserId();

    let userD = JSON.parse(this.askusersData);
    //  console.log(userD)
    console.log(userD);
    if (userD == null) {
      //console.log('failed')
      this.msgForPopup = "Please Verfiy with Email  then ask Questions";
      this.emailConfirmPopup();
    } else if (userD.isVerified == true || this.verfStatus == true) {
      this.submitted = true;
      //console.log('check')

      // this.verifyEmailData=(this.verifyEmail.value);
      // this.verifyOtpData=(this.verifyOtp.value);
      //console.log(this.verifyOtpData)
      //  this.askQues.value['email'] = this.verifyEmailData.emailVerify;
      // this.askQues.value['otp'] = this.verifyOtpData.otpVerify;
      this.askQuesData = this.askQues.value;

      const data = this.askQuesData;
      data.otp = userD.Otp;
      data.email = userD.email;
      console.log(data);
      this._Userservice.addQuestion(data).subscribe(
        (res) => {
          if ((res.status = "success")) {
            this.msgForPopup = res.message;
            this.emailConfirmPopup();
            setTimeout(() => {
              this.router.navigate(["/forum"]);
            }, 2000);
          }
        },
        (err) => console.log(err)
      );
    } else {
      this.askQuesData = this.askQues.value;

      const data = this.askQuesData;
      data.otp = userD.Otp;
      data.email = userD.email;
      //console.log(data)
      this._Userservice.addQuestion(data).subscribe(
        (res) => {
          if ((res.status = "success")) {
            this.msgForPopup = res.message;
            this.emailConfirmPopup();
            setTimeout(() => {
              this.router.navigate(["/forum"]);
            }, 2000);
          }
        },
        (err) => console.log(err)
      );
    }
  }
}
