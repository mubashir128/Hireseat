import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../_services/user.service";
import { AuthenticationService } from "../../_services/authentication.service";

import { NgxSpinnerService } from "ngx-spinner";
// file upload
import { Directive, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Router } from "@angular/router";

declare var Materialize: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-create-admin",
  templateUrl: "./create-admin.component.html",
  styleUrls: ["./create-admin.component.css"],
  providers: [UserService]
})
@Directive({
  selector: "input[type=file]",
  host: {
    "(change)": "onChange($event.target.files)",
    "(blur)": "onTouched()"
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CreateAdminComponent,
      multi: true
    }
  ]
})
export class CreateAdminComponent implements OnInit, ControlValueAccessor {
  // file validator
  @HostListener("change", ["$event.target.files"]) onChange = _ => {};
  @HostListener("blur") onTouched = () => {};

  writeValue(value) {}
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  // end
  public signin: any;
  public message: string;
  filepath: any;
  imgURL: any;
  public imagePath;
  public suBtnActive: boolean = true;
  userroledata: any;
  public localRole: any;

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private router: Router,
    private _authService: AuthenticationService
  ) {
    this.signin = new FormGroup({
      fullname: new FormControl(),
      phoneNo: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      webSiteLink: new FormControl(),
      companyName: new FormControl(),
      file: new FormControl()
    });
  }

  ngOnInit() {
    // this.router.navigate(["/super-admin/user-list"]);

    const localUserInfo = JSON.parse(
      window.localStorage.getItem("currentUser")
    );
    const userRole = localUserInfo.userInfo.userRole;
    console.log(userRole);
  }

  // on submit form
  formSubmit() {
    var res = this.signin.value;

    // checking user role whether it is super-admin or not
    const localUserInfo = JSON.parse(
      window.localStorage.getItem("currentUser")
    );
    const userRole = localUserInfo.userInfo.userRole;

    this.signin = new FormGroup({
      fullname: new FormControl(res.fullname, [Validators.required]),
      phoneNo: new FormControl(res.phoneNo, Validators.required),
      email: new FormControl(res.email, [
        Validators.required,
        Validators.email
      ]),
      companyName: new FormControl(res.companyName, [Validators.required]),
      webSiteLink: new FormControl(res.webSiteLink, [Validators.required]),
      password: new FormControl(res.password, [
        Validators.required,
        Validators.minLength(5)
      ]),
      file: new FormControl(res.file, [Validators.required])
    });

    const fd = new FormData();
    this.localRole = "admin"; // admin role
    this.userroledata = 1;
    fd.append("userRole", this.localRole);
    fd.append("role", this.userroledata);
    fd.append("file", this.imagePath[0], this.imagePath[0].name);
    fd.append("fullname", this.signin.controls.fullname.value);
    fd.append("phoneNo", this.signin.controls.phoneNo.value);

    fd.append("email", this.signin.controls.email.value);

    fd.append("companyName", this.signin.controls.companyName.value);
    fd.append("webSiteLink", this.signin.controls.webSiteLink.value);
    fd.append("password", this.signin.controls.password.value);

    if (!this.signin.valid) {
      console.log("invalid form");
      Materialize.toast("Please complete the form.", 1000);
      this.spinner.hide();
    }

    if (userRole === "super-admin") {
      this.spinner.show();

      console.log("yes super admin is active");

      this.suBtnActive = true;
      var res = this.signin.value;

      if (this.signin.valid) {
        this.spinner.show();
        this.userService.register(fd).subscribe(
          data => {
            if (data.statustxt === "success") {
              this.spinner.hide();
              this.suBtnActive = true;
              jQuery("#registerMsg").modal("open");
              this.router.navigate(["/super-admin/user-list"]);
            }
            this.spinner.hide();
          },
          error => {
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
        this.suBtnActive = true;
        this.spinner.hide();
      }
    } else {
      // logout the user
      this.spinner.hide();
      Materialize.toast("Your not an authorized user...!", 1000);
      this._authService.logout();
    }
  }
  // end of subit
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
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
}
