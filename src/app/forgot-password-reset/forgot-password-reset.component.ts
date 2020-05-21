
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
declare var Materialize: any;
@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css']
})
export class ForgotPasswordResetComponent implements OnInit {
  public forgotResetPassfrm: FormGroup;
  public isValid: boolean = false;
  public loginShow: boolean = false;
  public email: String = "";
  public token: String = "";
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.forgotResetPassfrm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    this.route.params.subscribe(params => { this.handleRequest(params['key']); });
  }

  get f() { return this.forgotResetPassfrm.controls; }

  handleRequest(key) {
    this.userService.checkForgotToken(key).subscribe((data: any) => {
      if (data.msg == "success") {
        this.isValid = true;
        this.email = data.result;
        this.token = data.token;
      } else {
        this.isValid = false;
        this.email = "";
      }
    }, (error) => {
      console.log(error);
    })
  }

  onSubmit() {
    if (this.forgotResetPassfrm.valid) {
      this.userService.resetPassword({ password: this.forgotResetPassfrm.value.password, email: this.email, token: this.token }).subscribe((data) => {
        if (data.result == "success") {
          Materialize.toast('Password Updated Successfully', 1000, 'rounded');
          this.loginShow = true;
        }
      }, (error) => {
        console.log(error);
      })
    }
  }

}
