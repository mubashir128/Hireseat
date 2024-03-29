import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "../_services/user.service";
declare var Materialize: any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public signin: any;
  public abc: any;
  public userInfo: any = [];
  public UserRoleSet: boolean;
  public chkLoggedInUser: any;
  acceptedTermsCond;
  acceptedTermsCondUnread;
  public localRole: any;
  public suBtnActive: boolean = true;
  public imagePath;
  userroledata: any;
  filepath: any;
  imgURL: any;
  fileModel: any;
  public message: string;
  value: string | number | string[];
  confirmPasswordError = false;

  email: string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _route: ActivatedRoute
  ) {
    this.signin = new FormGroup({
      fullname: new FormControl(),
      phoneNo: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      webSiteLink: new FormControl(),
      companyName: new FormControl(),
    });
    // file: new FormControl()

    this._route.queryParams.subscribe(params => {
      this.email = params.email
    });

    this.localRole = localStorage.getItem("Role");
    if (this.localRole == "employer") {
      this.UserRoleSet = true;
    } else if (this.localRole == "recruiter") {
      this.UserRoleSet = true;
    } else if (this.localRole == "candidate") {
      this.UserRoleSet = true;
    } else {
      this.UserRoleSet = false;
      this.router.navigate(["/home"]);
    }

    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        this.router.navigate(["employer"]);
      }
      if (this.chkLoggedInUser.userRole == "recruiter") {
        this.router.navigate(["recruiter"]);
      }
      if (this.chkLoggedInUser.userRole == "candidate") {
        this.router.navigate(["candidate"]);
      }
    }
  }

  ngOnInit() {
    jQuery(".modal").modal();
    jQuery("select").material_select();
    // this.formSubmit()
  }

  unReadTermsAndConditions() {
    this.value = $("#acceptTermsUnread").is(":checked");
    // console.log("accepted terms and conditions", this.value);
  }

  onFocusOutEvent(event){
    this.checkPassword();
  }

  checkPassword(){
    if(this.signin.controls.confirmPassword.value !== "" && this.signin.controls.confirmPassword.value !== null && (this.signin.controls.password.value !== this.signin.controls.confirmPassword.value)){
      this.confirmPasswordError = true;
    }else{
      this.confirmPasswordError = false;
    }
  }

  formSubmit() {
    // console.log(this.signin.value);

    // this.spinner.show();
    if (!this.signin.valid) {
      console.log("invalid form");
      this.spinner.hide();
      Materialize.toast("Please complete the form.", 1000);
    }
    this.value = $("#acceptTermsUnread").is(":checked");
    // console.log(this.value);
    this.suBtnActive = true;
    //this.signin.value['file']=this.imagePath[0];
    var res = this.signin.value;
    //console.log(res);
    if (this.localRole !== "candidate") {
      this.signin = new FormGroup({
        fullname: new FormControl(res.fullname, [Validators.required]),
        phoneNo: new FormControl(res.phoneNo),
        email: new FormControl(res.email, [
          Validators.required,
          Validators.email,
        ]),
        companyName: new FormControl(res.companyName, [Validators.required]),
        webSiteLink: new FormControl(res.webSiteLink, [Validators.required]),
        password: new FormControl(res.password, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$")
        ]),
        confirmPassword: new FormControl(res.confirmPassword, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$")
        ]),
      });
    } else {
      this.signin = new FormGroup({
        fullname: new FormControl(res.fullname, [Validators.required]),
        phoneNo: new FormControl(res.phoneNo),
        email: new FormControl(res.email, [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl(res.password, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$")
        ]),
        confirmPassword: new FormControl(res.confirmPassword, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$")
        ]),
      });
    }

    // file: new FormControl(res.file, [Validators.required])

    const fd = new FormData();
    // fd.userRole=this.localRole;
    // fd.role=this.localRole == "employer" ? 2 : 3;
    if (this.localRole == "employer") {
      this.userroledata = 2;
    } else if (this.localRole == "recruiter") {
      this.userroledata = 3;
    } else if (this.localRole == "candidate") {
      this.userroledata = 4;
    }
    // this.userroledata = this.localRole == "employer" ? 2 : 3;
    fd.append("userRole", this.localRole);
    fd.append("role", this.userroledata);
    if (this.imagePath) {
      fd.append("file", this.imagePath[0], this.imagePath[0]?.name);
    } else {
      fd.append("file", "");
    }
    fd.append("fullname", this.signin.controls.fullname.value);
    fd.append("phoneNo", this.signin.controls.phoneNo.value);
    const emailTrim = this.signin.controls.email.value.replace(
      /^\s+|\s+$/gm,
      ""
    );
    const emailLower = emailTrim.toLowerCase();

    fd.append("email", emailLower);

    fd.append("companyName", this.signin.controls.companyName?.value);
    fd.append("webSiteLink", this.signin.controls.webSiteLink?.value);
    fd.append("password", this.signin.controls.password.value);
    fd.append("confirmPassword", this.signin.controls.confirmPassword.value);

    if (this.signin.valid && (this.signin.controls.password.value === this.signin.controls.confirmPassword.value)) {
      if (this.acceptedTermsCondUnread) {
        this.spinner.show();
        if (this.localRole !== "candidate") {
          this.userService.register(fd).subscribe(
            (data) => {
              if (data.statustxt === "success") {
                this.spinner.hide();
                localStorage.removeItem("Role");
                Materialize.toast(
                  "Registered Successfully Please check the e-mail !",
                  5000
                );

                Materialize.toast("Please check Spam. Junk, and Promotions folders for the email if you do not see it in your Inbox", 5000, "red");

                this.suBtnActive = true;
                jQuery("#registerMsg").modal("open");
              }
            },
            (error) => {
              console.log(error);
              if (error == "Conflict") {
                Materialize.toast(
                  "Email Id / Phone Number Already Registered !",
                  1000
                );
                this.spinner.hide();
              }

              this.suBtnActive = true;
              this.spinner.hide();
            }
          );
        } else {
          this.userService.registerCandidate(fd).subscribe(
            (data) => {
              if (data.statustxt === "success") {
                this.spinner.hide();
                localStorage.removeItem("Role");
                // Materialize.toast(
                //   "Registered Successfully Please check the e-mail !",
                //   5000
                // );
                this.suBtnActive = true;
                jQuery("#registerMsg").modal("open");
              }
            },
            (error) => {
              console.log(error);
              if (error == "Conflict") {
                Materialize.toast(
                  "Email Id / Phone Number Already Registered !",
                  1000
                );
                this.spinner.hide();
              }

              this.suBtnActive = true;
              this.spinner.hide();
            }
          );
        }
      } else {
        this.suBtnActive = true;
        Materialize.toast("Please accept the terms and conditions", 5000);
        this.spinner.hide();
      }
    } else {
      this.suBtnActive = true;
      this.spinner.hide();
    }
  }

  showTermsAndCond() {
    jQuery("#TermsAndCond").modal("open");
  }

  goHome() {
    jQuery("#registerMsg").modal("close");
    this.router.navigate(["login"]);
  }
  preview(files) {
    if (files.length === 0) return;
    if (files) {
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
    // console.log(this.imagePath[0]['File'])
    // console.log(this.filepath)
  }
}
