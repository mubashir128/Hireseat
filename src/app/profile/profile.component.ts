import { Component, OnInit, Input } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { IProfile, Profile } from "./model/user-profile";
import { UserService } from "../_services/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RewardSummary } from "./model/reward-summary";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
declare var Materialize: any;
declare var jQuery: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  //
  public userProfile: IProfile;
  public userInfoDetails: any;
  public profilefrm: FormGroup;
  public updateProfileimg: FormGroup;
  public userData: any;
  public loggedinUser: any;
  public obj: any = {};
  public token: String;
  public imagePath;
  currentUserId: any;
  ckeConfig: any;
  ratePerMin: any;
  filepath: any;
  imgURL: any;
  public message: string;
  public PointsSummary = new RewardSummary();
  isRecruiter: boolean;
  dropdownOptions: any;
  available: any;
  days: any[];
  config = {
    displayKey: "day", // if objects array passed which key to be displayed defaults to description
    limitTo: 6,
  };
  editor = ClassicEditor;
  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userProfile = new Profile();
    this.getUsersProfile();
    this.dropdownOptions = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
    this.days = [
      { day: "Sunday", dayId: 0 },
      { day: "Monday", dayId: 1 },
      { day: "Tuesday", dayId: 2 },
      { day: "Wednesday", dayId: 3 },
      { day: "Thursday", dayId: 4 },
      { day: "Friday", dayId: 5 },
      { day: "Saturday", dayId: 6 },
    ];
    this.available = [
      {
        id: 1,
        day: "",
        from: "",
        dayId: "",
        to: "",
      },
    ];
  }

  ngOnInit() {
    this.loggedinUser = this.userService.getUser();
    // console.log(this.loggedinUser.userInfo.userRole);
    if (this.loggedinUser.userInfo.userRole === "recruiter") {
      this.isRecruiter = true;
    } else {
      this.isRecruiter = false;
    }
    jQuery(".modal").modal();
    this.spinner.show();
    this.currentUserId = JSON.parse(
      localStorage.getItem("currentUser")
    ).userInfo._id;

    this.updateProfileimg = this.formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
    });

    this.profilefrm = this.formBuilder.group({
      companyName: ["", Validators.compose([Validators.required])],
      aboutComp: [""],
      locOfHeadOff: [""],
      noOfEmp: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")]),
      ],
      webSiteLink: ["", Validators.compose([Validators.required])],
      fbLink: [""] /*  Validators.compose([Validators.required]) */,
      twittLink: [""],
      youtubeLink: [""],
      linkedInLink: [""],
      fullName: ["", Validators.compose([Validators.required])],
      phoneNo: [
        "",
        Validators.compose([Validators.required, Validators.pattern("[0-9]+")]),
      ],
      email: [""],
      file: ["", Validators.compose([Validators.required])],
      yearOfExperience: [""],
      // industries: [''],
      roles: [""],
      companies: [""],
      bio: [""],
      rate: [0],
      mins: [0],
      post: [false],
    });
  }
  get f() {
    return this.profilefrm.controls;
  }
  get img() {
    return this.updateProfileimg.controls;
  }
  addDay() {
    const availableDayLength = this.available.length;
    this.available.push({
      id: availableDayLength + 1,
      day: "",
      from: "",
      to: "",
    });
  }
  onChanges(ch,event,item){
   
    var time = event.value.toLocaleTimeString();
    switch (ch) {
      case "from":
        this.available.map((ele) => {
          if (ele.id === item.id) {
            ele.from = time;
          }
        });
        console.log(this.available);
        this.userProfile.available = this.available;
        break;
      case "to":
        this.available.map((ele) => {
          if (ele.id === item.id) {
            ele.to = time;
          }
        });
        console.log(this.available);
        this.userProfile.available = this.available;

        break;
      default:
        break;
    }
  }
  timeUpdate(ch, event, item) {
    console.log(ch, item, event.target.value);

    switch (ch) {
      case "from":
        this.available.map((ele) => {
          if (ele.id === item.id) {
            ele.from = event.target.value;
          }
        });
        console.log(this.available);
        this.userProfile.available = this.available;
        break;
      case "to":
        this.available.map((ele) => {
          if (ele.id === item.id) {
            ele.to = event.target.value;
          }
        });
        console.log(this.available);
        this.userProfile.available = this.available;

        break;
      default:
        break;
    }
  }
  getUsersProfile() {
    this.userService
      .getUserProfile(this.userService.getUserData().userRole)
      .subscribe(
        (data: any) => {
          if (data != null && data != undefined && data != "") {
            this.userProfile = data.res;
            if (data.res.available) {
              this.available = this.userProfile.available;
            }
            if (data.res.imageData !== "") {
              this.imgURL = "data:image/jpeg;base64," + data.res.imageData;
            }
          } else {
            Materialize.toast("Something went wrong", 1000);
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  selectionChanged(type, event, item) {
    console.log(event);
    switch (type) {
      case "min":
        this.ratePerMin = event.value;
        this.userProfile.mins = event.value;
        break;
      case "day":
        this.available.map((ele) => {
          if (ele.id === item.id) {
            ele.day = event.value;
          }
        });
        // console.log(this.available);
        this.userProfile.available = this.available;

        break;
    }
  }
  onSubmit() {
    if (this.userProfile && this.profilefrm.value.companyName) {
      this.spinner.show();
      this.userService.updateUserProfile(this.userProfile).subscribe(
        (data: any) => {
          if (data.result === "OK") {
            this.loggedinUser = this.userService.getUser();
            this.obj.email = this.userProfile.email;
            this.obj.phoneNo = this.userProfile.phoneNo;
            this.obj.fullName = this.userProfile.fullName;
            this.obj.companyName = this.userProfile.companyName;
            this.obj._id = this.loggedinUser.userInfo._id;
            this.obj.role = this.loggedinUser.userInfo.role;
            this.obj.userRole = this.loggedinUser.userInfo.userRole;
            this.obj.available = this.available;
            this.obj.yearOfExperience = this.userProfile.yearOfExperience;
            // this.obj.industries = this.userProfile.industries;
            this.obj.roles = this.userProfile.roles;
            this.obj.companies = this.userProfile.companies;
            this.obj.bio = this.userProfile.bio;
            this.obj.post = this.userProfile.post;

            this.token = this.loggedinUser.token;
            localStorage.setItem(
              "currentUser",
              JSON.stringify({ userInfo: this.obj, token: this.token })
            );
            Materialize.toast("Profile Updated Successfully", 3000);
          } else {
            Materialize.toast("Something went wrong", 1000);
          }
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          if (error === "Conflict") {
            Materialize.toast(
              "Email Id / Phone Number Already Registered !",
              1000
            );
          }
          this.spinner.hide();
        }
      );
    } else {
      this.spinner.hide();
      Materialize.toast("Add valid information !", 1000);
      return;
    }
  }

  updateProfileImg() {
    const fd = new FormData();
    fd.append("file", this.imagePath[0], this.imagePath[0].name);
    fd.append("id", this.currentUserId);

    this.userService.updateProfileImg(fd).subscribe(
      (res) => {
        Materialize.toast(res.message, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showSummary() {
    this.spinner.show();
    this.userService.getRewardLoosePointsSummary().subscribe(
      (data: any) => {
        this.PointsSummary.skillsLosePt = data.skillsLosePt;
        this.PointsSummary.experienceLosePt = data.experienceLosePt;
        this.PointsSummary.personalityLosePt = data.personalityLosePt;
        this.getEarnreward();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getEarnreward() {
    this.userService.getEarnreward().subscribe(
      (data) => {
        this.PointsSummary.skillsErn = data.skillsErn;
        this.PointsSummary.personalityErn = data.personalityErn;
        this.PointsSummary.experienceEarn = data.experienceEarn;
        this.spinner.hide();
        jQuery("#RewardModel").modal("open");
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
  gotoHome() {
    this.router.navigate(["/recruiter/bidding-event-list"]);
  }
}
