import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { UserService } from 'src/app/_services/user.service';
import * as myGlobals from '../../../../globalPath';
import { PostJobService, eTypes } from 'src/app/_services/post-job.service';
import { PostJob } from '../app-list/app-list.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogInputBigMessageComponent } from '../dialog-input-big-message/dialog-input-big-message.component';
import { DialogSelectUserComponent } from '../dialog-select-user/dialog-select-user.component';

declare var Materialize;

@Component({
  selector: 'app-suggest-introduce',
  templateUrl: './suggest-introduce.component.html',
  styleUrls: ['./suggest-introduce.component.css']
})
export class SuggestIntroduceComponent implements OnInit {

  suggestIntro: PostJob[] = [];
  searchFilters = new Map();

  createdUrl: string = "";
  public baseurl: any;

  loggedUser: any;
  showLoader: boolean = true;

  suggestIntro2: any[] = [];

  applyPostJobs: any[] = [];

  postJobId;

  constructor(
    protected _userService: UserService,
    private _router: Router,
    private _biddingEventService: BiddingEventService,
    private _postJobService: PostJobService,
    protected _dialog: MatDialog,
    private _route: ActivatedRoute
  ){
    this.baseurl = myGlobals.redirecUrl;
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.postJobId = this._route.snapshot.queryParams["postJobId"];
    if(this.postJobId){
      this.searchFilters.set("companyId", this.postJobId);
    }
    this.jobsAre();
    // this.getSuggestIntroduce();
  }

  jobsAre(){
    let promises = [];
    promises.push(this._postJobService.getPostJob(null, true, this.searchFilters).toPromise());
    // promises.push(this._biddingEventService.getJobProfiles(true).toPromise());
    promises.push(this._postJobService.getApplyPostJob(null, null).toPromise());
    Promise.all(promises).then(result => {
      console.log(result);
      this.showLoader = false;
      this.suggestIntro = result[0].result;
      // this.suggestIntro2 = result[1];
      this.applyPostJobs = result[1];
      if(result){
        // this.suggestIntro = [...this.suggestIntro, ...this.suggestIntro2];
      }
    });
  }

  getSuggestIntroduce(){
    this._postJobService.getPostJob(null, true, this.searchFilters).subscribe((data)=>{
      this.showLoader = false;
      this.suggestIntro = data.result;
    }, (err) => {
      console.log(err);
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

  shareClick(companyId){
    this.createdUrl = this.baseurl + "shareIntroduceCompany/" + companyId;
    this._userService.shareToMedia(this.createdUrl);
  }

  gotoUsers(companiesAre){
    if(companiesAre && companiesAre.candidate.length){
      this._router.navigate(["/"+this.loggedUser.userRole+"/friends-connections"], { queryParams: { companyName: companiesAre.companyName}});
    }
  }

  showHideJobSpec(company){
    if(company.expanded){
      jQuery("#jobSpec_"+company._id).css("display", "none");
      company.expanded = false;
    }else{
      jQuery("#jobSpec_"+company._id).css("display", "block");
      company.expanded = true;
    }
  }

  checkApply(companiesAre){
    let check = true;
    for(let apply of this.applyPostJobs){
      if(apply.postJobId._id == companiesAre._id){
        check = false;
      }
    }
    return check;
  }

  checkApplyPoints(companiesAre, field){
    let check = false;
    for(let apply of this.applyPostJobs){
      if(companiesAre?._id == apply?.postJobId?._id && apply[field]){
        check = true;
      }
    }
    return check;
  }

  allreadApplyForJobPost(companiesAre){
    Materialize.toast("You Already applied for this Post job", 1000, "red");
  }

  applyForJobPost(companiesAre){
    if(!companiesAre.pointBoolean1 || !companiesAre.pointBoolean2 || !companiesAre.pointBoolean3){
      Materialize.toast("Please select all three points!", 1000, "red");
      return ;
    }

    this.inputBigMessageDialogOpen(companiesAre, eTypes.apply, [], companiesAre.jobSpecification);
  }

  refer(companiesAre){
    const dialogSelectUserRef = this._dialog.open(DialogSelectUserComponent,{
      data: {
        dialogType : "select-candidates",
        dialogTitle : "Select One Candidates to refer",
        btns : ["select"],
        multiSelect : false,
        selectUserCount : 1
      }
    });

    dialogSelectUserRef.afterClosed().subscribe(result => {
      if(result){
        this.inputBigMessageDialogOpen(companiesAre, eTypes.refer, result);
      }
    });
  }

  inputBigMessageDialogOpen(companiesAre, type: eTypes, selectedUsers = [], jobDescription: string = ""){
    const dialogIntroduceRef = this._dialog.open(DialogInputBigMessageComponent,{
      data: {
        dialogType : "enterMessage",
        dialogTitle : "Message",
        dialogText : "Please provide 3 quick reasons highlighting to the hiring manager why you think you are the best candidate (less than 150 characters).",
        btns  : ["apply"],
        jobDescription : jobDescription,
        type : type,
        userId : (type == eTypes.apply) ? this.loggedUser._id : selectedUsers[0]
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if(result.status){
        let promises = [];
        let payload = {
          postJobId : companiesAre._id,
          point1 : companiesAre.pointBoolean1,
          point2 : companiesAre.pointBoolean2,
          point3 : companiesAre.pointBoolean3,
          message1 : result.message1,
          message2 : result.message2,
          message3 : result.message3,
          selectedUsers : selectedUsers
        };

        if(type == eTypes.apply){
          promises.push(this._postJobService.applyPostJob(payload).toPromise());
          Promise.all(promises).then(result => {
            this.applyPostJobs = [...this.applyPostJobs, ...result];
            Materialize.toast("Applied for this Post job", 1000, "green");
          }).catch(err=>{
            Materialize.toast("You Already applied for this Post job", 1000, "red");
          });
        }else if(type == eTypes.refer){
          promises.push(this._postJobService.referPostJob(payload).toPromise());
          Promise.all(promises).then(result => {
            Materialize.toast("Refered for this Post job", 1000, "green");
          }).catch(err=>{
            Materialize.toast("You Already refered for this Post job", 1000, "red");
          });
        }
      }
    });
  }

  getJobSpecification(jobSpec){
    let textArray = jobSpec ? jobSpec.split('.') : [];
    return textArray;
  }

  changedValue(event, companiesAre, field){
    companiesAre[field] = event.target.checked;
  }
}
