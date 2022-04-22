import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AuthenticationService } from "../_services/authentication.service";

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public login: any;
  public abc: any;
  public userInfo: any = [];
  public chkLoggedInUser: any;
  public userData: any;
  public suBtnActive: boolean = true;
  status: string = null;
  returnUrl: any;

  showTextPassword = false;

  constructor(
    private _AuthService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.login = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        this.router.navigate(["employer/share-candidate-profile"]);
      } else if (this.chkLoggedInUser.userRole == "recruiter") {
        this.router.navigate(["recruiter/share-candidate-profile"]);
      } else if (this.chkLoggedInUser.userRole == "admin") {
        this.router.navigate(["/user-list"]);
      } else if (this.chkLoggedInUser.userRole == "super-admin") {
        this.router.navigate(["super-admin/user-list"]);
      } else if (this.chkLoggedInUser.userRole == "enterprise") {
        this.router.navigate(["enterprise/user-list"]);
      }else if (this.chkLoggedInUser.userRole == "candidate") {
        this.router.navigate(["candidate/timeline"]);
      }
    }
  }

  ngOnInit() {
    // scroll to top
    $(document).ready(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1500
      );
    });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  formSubmit() {
    this.suBtnActive = false;
    this.status = null;
    var res = this.login.value;
    this.login = new FormGroup({
      email: new FormControl(res.email.toLowerCase(), [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(res.password, [Validators.required]),
    });
    res = this.login.value;
    if (this.login.valid) {
      this._AuthService.login(res).subscribe(
        (data) => {
          if (data == "success") {
            this.userData = this.userService.getUserData();
            if (this.userData.userRole == "employer") {
              this.router.navigate(["employer/share-candidate-profile"]);
            } else if (this.userData.userRole == "recruiter") {
              // if (this.returnUrl) {
              //   this.router.navigate([this.returnUrl]);
              // } else {
              this.router.navigate(["recruiter/share-candidate-profile"]);
              // }
            } else if (this.userData.userRole == "admin") {
              this.router.navigate(["user-list"]);
            } else if (this.userData.userRole == "super-admin") {
              this.router.navigate(["super-admin/user-list"]);
            } else if (this.userData.userRole == "enterprise") {
              this.router.navigate(["enterprise/user-list"]);
            } else if (this.userData.userRole == "candidate") {
              this.router.navigate(["candidate/timeline"]);
            }
            
          } else if (data == "wrongpass") {
            this.status = "wrongpass";
            Materialize.toast("Enter valid Password", 1000, "rounded");

            this.suBtnActive = true;
          } else if (data == "emailnotfound") {
            this.status = "emailnotfound";
            Materialize.toast("Email Id Not Found", 1000, "rounded");
            this.suBtnActive = true;
          } else if (data == "fail") {
            Materialize.toast("Enter valid details", 1000, "rounded");
            this.suBtnActive = true;
          }
        },
        (error) => {
          console.log(error);
          if (error == "wrong") {
            Materialize.toast("Enter valid details", 1000, "rounded");
          } else if (error == "fail") {
            Materialize.toast("Enter valid Password", 1000, "rounded");
          } else {
            Materialize.toast(error, 1000, "rounded");
          }
          this.status = null;
          this.suBtnActive = true;
        }
      );
    } else {
      this.suBtnActive = true;
    }
  }

  focusFunction(e) {
    this.status = null;
  }

  signUp() {
    this.router.navigate(["/mobileRegister"]);
  }

  redirectToForgotPassword() {
    this.router.navigate(["/Forgot-Password"]);
  }

  showPassword($event){
    this.showTextPassword = $event.target.checked;
  }

}
