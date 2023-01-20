import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyClient } from 'src/app/models/myClient';
import { MyClientService } from 'src/app/_services/my-client.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-new-my-client',
  templateUrl: './new-my-client.component.html',
  styleUrls: ['./new-my-client.component.css']
})
export class NewMyClientComponent implements OnInit {
  public chkLoggedInUser: any;
  client: MyClient;
  public newClientFrm: FormGroup;
  userRole: any;

  constructor(
    private formBuilder: FormBuilder,
    private _myClient: MyClientService,
    private userService: UserService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.client = new MyClient();
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != 'no') {
      if (this.chkLoggedInUser.userRole === 'recruiter') {
      } else if (this.chkLoggedInUser.userRole === 'employer') {
      }
    } else {
    }
    this.userRole = this.chkLoggedInUser.userRole;
  }

  ngOnInit() {
    this.newClientFrm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      phoneNumber: [''],
      email: ['', [
        Validators.email
      ]],
      comments: [''],
      contact_name :  ['', Validators.compose([Validators.required])],
      contact_email :  ['', Validators.compose([Validators.required])],
      contact_phoneNumber :  ['', Validators.compose([Validators.required])],
      contact_title :  ['']
    });
  }

  get f() {
    return this.newClientFrm.controls;
  }

  submit() {
    this.spinner.show();
    if (this.userRole === 'recruiter') {
      this.createNewMyClient();
    }
  }

  createNewMyClient() {
    this._myClient.createNewMyClient(this.client).subscribe((data: any) => {
      this.spinner.hide();
      this._router.navigate(["/recruiter/my-clients"]);
    }, (error) => {
      if (error === 'Conflict') {
        Materialize.toast(
          'Network error...!',
          1000
        );
      } else if (error) {
        Materialize.toast('Something Went Wrong !', 1000);
      }
      this.spinner.hide();
    }
    );
  }

  cancle() {
    this.newClientFrm.reset();
  }

}
