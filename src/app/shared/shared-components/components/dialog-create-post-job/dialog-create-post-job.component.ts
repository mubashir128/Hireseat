import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from "@angular/forms";
import { UserService } from 'src/app/_services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { PostJob, dialogPopupType } from '../app-list/app-list.component';

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

  constructor(private formBuilder: FormBuilder, 
    private _userService: UserService, 
    @Inject(MAT_DIALOG_DATA) public data: DialogCreatePostJobComponent, 
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogCreatePostJobComponent>,
  ){
    super(data, dialogRef);
    this.jobPostForm = this.formBuilder.group({
      companyName: ["", Validators.compose([Validators.required])],
      jobSpecification: ["", Validators.compose([Validators.required])],
      location: ["", Validators.compose([Validators.required])]
    });

    if(this.data && this.data.jobList){
      this.jobList = this.data.jobList;
      this.btnName = (this.data.dialogType == dialogPopupType.editPostJob) ? "Update" : this.btnName;
    }else{
      this.jobList = new PostJob();
    }

  }

  ngOnInit(){
  }
  
  formSubmit() {
    if (!this.jobPostForm.valid) {
      Materialize.toast("Please complete the form.", 1000, "red");
      return ;
    }
    this._userService.postJob(this.jobList).subscribe((data)=>{
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
