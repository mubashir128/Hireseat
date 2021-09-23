import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { ShareVideoService } from 'src/app/_services/share-video.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { VideoCallingService } from 'src/app/_services/video-calling.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Plugins } from '@capacitor/core';
import { NgxSpinnerService } from 'ngx-spinner';
const { Share } = Plugins;
declare var jQuery;
declare var $: any;
declare var Materialize;

@Component({
  selector: 'app-friends-connections',
  templateUrl: './friends-connections.component.html',
  styleUrls: ['./friends-connections.component.css']
})
export class FriendsConnectionsComponent implements OnInit {

  requestedFriendAre =  [];
  friendsConnections = [];

  showRequest = true;
  showFriends = false;

  connectFriendObserver = new Subject();
  connectFriendObserver$ = this.connectFriendObserver.asObservable();

  loggedInUser: any;

  itemsIs = 0;

  cc: any;
  bcc: any;

  generateLink = true;

  createdUrl = "";
  shareResume: any;
  shareableVideoURL: any;
  recipientEmail = "";
  recipientName = "";

  comment1 = "";
  comment2 = "";
  comment3 = "";
  candidateNameIs = "";
  
  constructor(
    private _userService: UserService,
    private _candidateService: CandidateService,
    private _subList: SubscriberslistService,
    private _constants: ConstantsService,
    private _socket: WebsocketService,
    private _router: Router,
    private shareVideoService: ShareVideoService,
    private videoCallingService: VideoCallingService,
    private spinner: NgxSpinnerService
  ){
    this.loggedInUser = this._userService.getUserData();
    shareVideoService._sharableResumeRecruiter.subscribe((res) => {
      this.shareResume = res;
    });
  }

  async ngOnInit(){
    jQuery(".modal").modal();

    //add a observable for connection
    await this._socket.removeListener({ type: this._constants.connectionFriendType });
    this._socket.addListener({
      type: this._constants.connectionFriendType,
      callback: this.connectFriendObserver,
    });

    //when any activity of connection is happened, then this observable is called.
    this.connectFriendObserver$.subscribe((res: any) => {
      this.handleConnectionFriendData(res);
    });

    this.getFriendConnections();
  }

  handleConnectionFriendData(res: any) {
    switch (res.subType) {
      case this._constants.addFriendRequest :
        this.addRequestToRequestFriendConnection(res.data);
        break;
      case this._constants.generateLink:
        this.addCreatedLink(res);
        break;
      case this._constants.shareVideoViaRecruiterEmail:
        this.handleResponse(res.result);
      case this._constants.connectedAsFriend:
        this.friendsConnections = [res.data, ...this.friendsConnections]
        break;
      default:
        break;
    }
  }

  async addCreatedLink(res) {
    this.generateLink = false;
    this.createdUrl = res.result.link;
    this.copyLink();

    let shareRet = await Share.share({
      url: this.createdUrl,
      dialogTitle: 'Share with'
    });
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.createdUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    Materialize.toast("Link copied to clipboard", 1000);

    this.closeShareModal();
  }

  handleResponse(res) {
    if (res.message) {
      Materialize.toast(res.message, 3000, "green");
    } else {
      Materialize.toast(res.error, 3000, "red");
    }

    jQuery("#shareEmailModal").modal("close");
    this.spinner.hide();
  }

  getFriendConnections(){
    let payload = {};
    this._subList.loaderList.next({type : "1"});
    this._candidateService.getAllConnectedUsers(payload).subscribe((res) => {
      this._subList.loaderList.next({type : "0"});
      this.sortBasedOnStatusAsFriend(res.data);
    }, (err) => {
      console.log(err);
      this._subList.loaderList.next({type : "0"});
    });
  }

  sortBasedOnStatusAsFriend(data){
    data.forEach((friend, index) => {
      if(friend.status === this._constants.asAFriend){
        this.friendsConnections = [friend, ...this.friendsConnections];
      }else if(friend.recipient._id == this.loggedInUser._id && friend.status === this._constants.asARequested){
        this.requestedFriendAre = [friend, ...this.requestedFriendAre];
      }
    });
  }

  acceptClick(id){
    let payload = {
      id : id
    };

    this._candidateService.acceptFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
      this.addFriendToFriendConnection(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  removeRequestFromFriendRequest(res){
    this.requestedFriendAre.forEach((frdRequest, index) => {
      if(res._id == frdRequest._id){
        this.requestedFriendAre.splice(index, 1);
      }
    });
  }

  addFriendToFriendConnection(res){
    this.friendsConnections = [res, ...this.friendsConnections];
  }

  addRequestToRequestFriendConnection(res){
    this.requestedFriendAre = [res, ...this.requestedFriendAre];
  }

  cancelClick(id){
    let payload = {
      id : id
    };

    this._candidateService.cancelFriendRequest(payload).subscribe((res) => {
      this.removeRequestFromFriendRequest(res.data);
    }, (err) => {
      console.log(err);
    });
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.showRequest = true;
      this.showFriends = false;
    }else{
      this.showFriends = true;
      this.showRequest = false;
    }
  }

  // share process
  showShareModal(resume) {
    this.cc = resume.candidate_id.email;
    this.bcc = this.loggedInUser.email ? this.loggedInUser.email : "";
    this.cc = this.cc + ", " + this.bcc;
    this.generateLink = true;
    jQuery("#shareEmailModal").modal("open");
    this.shareVideoService.setResume(resume);
  }

  goToUserChat(resume){
    let id = resume.candidate_id._id;
    if(id !== ""){
      this._router.navigate(["/"+this.loggedInUser.userRole+"/chat-record", id]);
    }
  }

  closeShareModal() {
    jQuery("#shareEmailModal").modal("close");
  }

  async generateLinkForVideo() {
    let payload = {};

    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;

    if (this.shareResume.interviewLinkedByRecruiter || this.shareResume.recordedId) {
      const archiveIdPayload = {
        archivedId: this.shareResume.interviewLinkedByRecruiter ? this.shareResume.interviewLinkedByRecruiter : this.shareResume.recordedId,
      };

      // getting url
      this.videoCallingService.getArchivedVideo(archiveIdPayload).subscribe((res) => {
        if (res) {

          this.shareableVideoURL = res.url;

          if (this.shareableVideoURL) {
            payload = {
              recruiterId: this.loggedInUser._id,
              resumeId: this.shareResume._id,
              videoUrl: this.shareableVideoURL,
              fullName: candidateName,
              comment: this.shareResume.comments,
              candidateProfile: this.shareResume.resumeType ? false : true,
            };

            this._socket.sendMessage({
              type: this._constants.connectionFriendType,
              data: {
                payload: payload,
                subType: this._constants.generateLink
              },
            });

          }

        }
      });
    } else {
      console.log('no archive link available ');
      payload = {
        recruiterId: this.loggedInUser._id,
        resumeId: this.shareResume._id,
        fullName: candidateName,
        videoUrl: '',
        comment: this.shareResume.comments,
        candidateProfile: this.shareResume.resumeType ? false : true,
      };

      this._socket.sendMessage({
        type: this._constants.connectionFriendType,
        data: {
          payload: payload,
          subType: this._constants.generateLink
        },
      });

    }
  }
  
  introduceUser(){
    if(this.recipientName == ""){
      Materialize.toast("Please fill recipient name", 800, "res");
    }else if(this.recipientEmail == ""){
      Materialize.toast("Please fill email field", 800, "res");
    }else{
      this.candidateNameIs = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
      this.comment1 = this.shareResume.comments;
      this.comment2 = this.shareResume.comment2;
      this.comment3 = this.shareResume.comment3;
      jQuery("#shareEmailModal").modal("close");
      jQuery("#emaiPreviewModal").modal("open");
    }
  }

  async share(intruduce) {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!EMAIL_REGEXP.test(this.recipientEmail)) {
      Materialize.toast("Invalid email", 800);
      return;
    }

    jQuery("#emaiPreviewModal").modal("close");
    this.spinner.show();

    const candidateName = this.shareResume.resumeType ? this.shareResume.candidateName : this.shareResume.candidate_id.fullName;
    const subject =
      "Hireseat" +
      " - " +
      this.loggedInUser.companyName +
      " - " +
      this.shareResume.jobTitle +
      " - " +
      candidateName +
      " Profile.";

    const archiveIdPayload = {
      archivedId: this.shareResume.interviewLinkedByRecruiter,
    };

    // getting url
    this.videoCallingService
      .getArchivedVideo(archiveIdPayload)
      .subscribe(
        async(res) => {
          if (res) {
            this.shareableVideoURL = res.url;

            this.spinner.hide();
            if (this.shareableVideoURL) {
              const payload = {
                recruiterId: this.loggedInUser._id,
                resumeId: this.shareResume._id,
                recipientEmail: this.recipientEmail,
                cc: this.cc,
                bcc: this.bcc,
                videoUrl: this.shareableVideoURL,
                fullName: candidateName,
                subject: subject,
                comment: this.shareResume.comments,
                comment2: this.shareResume.comment2,
                comment3: this.shareResume.comment3,
                candidateProfile: this.shareResume.resumeType ? false : true,
                intruduce : intruduce, //only when hitting a introduce
                senderName : this.loggedInUser.fullName,
                fileURL : this.shareResume.fileURL,
                recipientName : this.recipientName,
                onlyCandidate : true,
                linkedIn : this.shareResume.linkedIn,
                profileUserId : this.shareResume.candidateKey ? this.shareResume.candidateKey._id : this.shareResume.candidate_id._id
              };

              // let finalStatementsArr = await this._readResume.readResume(this.shareResume);
              // console.log("finalStatementsArr : ",finalStatementsArr);

              let userInfo = JSON.parse(localStorage.getItem("currentUser")).userInfo;
              this._socket.sendMessage({
                type: this._constants.connectionFriendType,
                data: {
                  type: userInfo.userRole,
                  payload: payload,
                  subType: this._constants.shareVideoViaRecruiterEmail
                },
              });

            } else {
              // console.log('no sharable video available');
              Materialize.toast("no sharable video available", 3000);
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
          }
        },
        (err) => {
          console.log("none responses");

          this.spinner.hide();
          return false;
        }
      );
    // got url
  }

  //unscubscribe the subscribed variables.
  ngOnDestroy() {
    this.connectFriendObserver.unsubscribe();
  }

}
