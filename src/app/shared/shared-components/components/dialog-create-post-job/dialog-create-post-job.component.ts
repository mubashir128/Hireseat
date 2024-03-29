import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from 'src/app/_services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { PostJob, dialogPopupType } from '../app-list/app-list.component';
import { PostJobService } from 'src/app/_services/post-job.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-dialog-create-post-job',
  templateUrl: './dialog-create-post-job.component.html',
  styleUrls: ['./dialog-create-post-job.component.css']
})
export class DialogCreatePostJobComponent extends AbstractDialogComponent implements OnInit {

  jobPostForm: any;
  jobList: PostJob;

  btnName: string = dialogPopupType.createPostJob;
  anyUsers: any;

  constructor(private formBuilder: FormBuilder, 
    private _userService: UserService, 
    @Inject(MAT_DIALOG_DATA) public data: DialogCreatePostJobComponent, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogCreatePostJobComponent>,
    private _postJobService: PostJobService
  ){
    super(data, dialogRef);
    this.jobPostForm = this.formBuilder.group({
      companyName: ["", Validators.compose([Validators.required])],
      jobTitle : ["", Validators.compose([Validators.required])],
      jobSpecification: ["", Validators.compose([Validators.required])],
      location: ["", Validators.compose([Validators.required])],
      point1: ["", Validators.compose([Validators.required])],
      point2: ["", Validators.compose([Validators.required])],
      point3: ["", Validators.compose([Validators.required])],
      salary: [""]
    });

    if(this.data && this.data.jobList){
      this.jobList = this.data.jobList;
      this.btnName = (this.data.dialogType == dialogPopupType.editPostJob) ? "Update" : this.btnName;
    }else{
      this.jobList = new PostJob();
    }

  }

  ngOnInit(){
    this.getUsersWithRole();
  }
  
  getUsersWithRole() {
    let userRole = "candidate";
    this._userService.getUsersWithField(userRole, 'asARecruiterWithLimit', true).subscribe((data: any) => {
      if(data){
        this.anyUsers = data.result;
      }
    });
  }
  
  formSubmit() {
    if (!this.jobPostForm.valid) {
      Materialize.toast("Please complete the form.", 1000, "red");
      return ;
    }
    this._postJobService.postJob(this.jobList).subscribe((data)=>{
      if(this.jobList && this.jobList._id){
        Materialize.toast("Job post updated : ", 1000, "green");
      }else{
        Materialize.toast("Job post created : ", 1000, "green");
      }
      this.closeScreen(data);
    }, (err) => {
      console.log(err);
    });
  }

  closeScreen(data){
    this.dialogRef.close(data);
  }

}
