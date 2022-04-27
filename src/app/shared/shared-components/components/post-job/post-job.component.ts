import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePostJobComponent } from '../dialog-create-post-job/dialog-create-post-job.component';
import { actionType, List, SearchFilter, dialogPopupType } from '../../components/app-list/app-list.component';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  jobList: List;
  searchFilters = new Map();
  actionType : actionType = actionType.postJob;
  columnNames : string[] = ['_id','companyName', 'jobSpecification','location'];

  constructor(protected dialog: MatDialog, 
    private _userService: UserService
  ){ }

  ngOnInit(): void {
    this.getJobList();
    this.jobList = new List(
      ['_id','companyName'],
      []
    );
  }

  getJobList(){
    this._userService.getPostJob(null, false, this.searchFilters).subscribe((data)=>{
      this.jobList.dataSource = data.result;
    }, (err) => {
      console.log(err);
    });
  }

  filter(searchFilter: SearchFilter){
    this.searchFilters.set(searchFilter.column, searchFilter.value);
  }

  createPostJob(){
    this.openPostJobDialog(dialogPopupType.createPostJob, "Create Job Post...");
  }

  filterModules(event){
    console.log("filterModules : ");
  }

  edit(event){
    this.openPostJobDialog(dialogPopupType.editPostJob, "Edit Job Post...", JSON.parse(JSON.stringify(event)));
  }

  openPostJobDialog(dialogType?, dialogTitle?, job?){
    const dialogIntroduceRef = this.dialog.open(DialogCreatePostJobComponent,{
      autoFocus: false,
      width: '40vh',
      data: {
        dialogType : dialogType,
        dialogTitle : dialogTitle,
        jobList : job
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if(result){
        switch(dialogType){
          case dialogPopupType.createPostJob : 
            this.jobList.dataSource = [result, ...this.jobList.dataSource];
            break;
          case dialogPopupType.editPostJob : 
            this.updatePostJob(result);
            break;
        }
      }
    });
  }

  updatePostJob(result){
    this.jobList.dataSource.forEach((jobPost)=>{
      if(jobPost._id == result._id){
        jobPost.companyName = result.companyName;
        jobPost.jobSpecification = result.jobSpecification;
        jobPost.location = result.location;
      }
    });
  }
}
