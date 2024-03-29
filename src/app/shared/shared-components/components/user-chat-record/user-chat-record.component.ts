import { AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { MobileServiceService } from 'src/app/_services/mobile-service.service';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { DialogAddMembersComponent } from '../dialog-add-members/dialog-add-members.component';
import { DialogAskToSendProfileLinkComponent } from '../dialog-ask-to-send-profile-link/dialog-ask-to-send-profile-link.component';
import { DialogGroupMembersComponent } from '../dialog-group-members/dialog-group-members.component';
import { DialogImagePreviewComponent } from '../dialog-image-preview/dialog-image-preview.component';
import { DialogSettingComponent } from '../dialog-setting/dialog-setting.component';
import { DialogUploadPictureComponent } from '../dialog-upload-picture/dialog-upload-picture.component';
import * as myGlobals from "../../../../globalPath";
import { ChatService } from 'src/app/_services/chat.service';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-user-chat-record',
  templateUrl: './user-chat-record.component.html',
  styleUrls: ['./user-chat-record.component.css']
})
export class UserChatRecordComponent implements OnInit, AfterViewChecked, OnChanges {

  receiverId: any;
  loggedInUser: any;
  user: any;
  messageIs: any = "";

  userMessages: any;
  userChatId;

  userChatMessageObserver = new Subject();
  userChatMessageObserver$ = this.userChatMessageObserver.asObservable();

  groupChat;
  groupMessages;

  groupUserAre = "";

  @ViewChild('chatDiv', { static: false }) private chatDiv: ElementRef;

  settingLists = [];
  addGrpMembers = [];
  updateGrpMembers = [];
  allUpdateGrpMembers = [];

  imgURL: any;

  allNewMembers = [];
  addNewGrpMembers = [];

  groupIsMore = true;
  showType: boolean = false;

  createdUrl = "";

  userCandidateProfileData: any;

  defaultMessage: string = "";

  showChatLoader: boolean = true;
  showGroupChatLoader: boolean = true;

  imagePath: any;
  message: string;
  filepath: File;
  progress: Observable<any>;
  progressPercent: Number;
  inProgress: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _socket: WebsocketService,
    private _constants: ConstantsService,
    public dialog: MatDialog,
    private _subList: SubscriberslistService,
    private _mobileService: MobileServiceService,
    private _chatService: ChatService
  ) {
    // this.messageIs = '';
    this.loggedInUser = this.userService.getUserData();
    this.route.params.subscribe(params => {
      this.receiverId = params.id;
      this.groupChat = this.route.snapshot.queryParams["groupChat"] == 'true' ? true : false;
      this.defaultMessage = this.route.snapshot.queryParams["message"];
      if (!this.groupChat) {
        this.handleUserData();
      }
    });

  }

  adjustFormHeight() {
    const form = document.getElementById('myForm');
    const textarea = document.getElementById('myTextarea');
    const chatContainer = document.getElementById('chatContainer');
    const scrollbarWidth = textarea.offsetWidth - textarea.clientWidth;
    const oldHeight = textarea.style.height;

    textarea.style.height = "43px"
    textarea.style.height = (textarea.scrollHeight - scrollbarWidth) + 'px';
    form.style.height = (textarea.scrollHeight - scrollbarWidth) + 'px';

    const newHeight = textarea.style.height;
    const heightDiff = parseInt(newHeight) - parseInt(oldHeight);
    console.log(heightDiff)
    if (heightDiff < 0) {
      chatContainer.scrollBy(0, heightDiff);
    } else if (heightDiff > 0) {
      chatContainer.scrollBy(0, heightDiff);
    }
  }

  async ngOnInit() {
    jQuery(".modal").modal();
    setTimeout(() => {
      this._subList.mobileMenuTabSub.next({ show: false });
    }, 500);

    //add a observable for userChat
    await this._socket.removeListener({ type: this._constants.userChatMessageType });
    this._socket.addListener({
      type: this._constants.userChatMessageType,
      callback: this.userChatMessageObserver,
    });

    //when any activity of userChat is happened, then this observable is called.
    this.userChatMessageObserver$.subscribe((res: any) => {
      this.handleChatMessage(res);
    });

    this.getAllChats();

    if (this.defaultMessage) {
      this.messageIs = this.defaultMessage;
      this.sendChatMessage();
    }
  }

  ngOnChanges() {
    jQuery(".modal").modal();
  }

  ngAfterViewChecked() {
    // this.goToBottom();
  }

  isUrl(s) {
    let result = false;
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(s)) {
      result = s.includes(myGlobals.platformUrl);
    }
    return result;
  }

  isUrl2(s) {
    let result = false;
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (regexp.test(s)) {
      result = !s.includes(myGlobals.platformUrl);
    }
    return result;
  }

  openUrl(url) {
    // window.open(url, "_blank");
    let token = url?.split("/")[4];
    this.router.navigate(["/shared-video/", token], { queryParams: { userChatId: this.receiverId } });
  }

  openUrl2(url) {
    window.open(url, "_blank");
  }

  getAllChats() {
    if (this.groupChat) {
      //call to get all group chats.
      this._socket.sendMessage({
        type: this._constants.userChatMessageType,
        data: {
          subType: this._constants.getAllGroupChats,
          payload: {
            groupId: this.receiverId
          }
        }
      });
    } else {
      //call to get all chats.
      this._socket.sendMessage({
        type: this._constants.userChatMessageType,
        data: {
          subType: this._constants.getAllChats,
          receiverId: this.receiverId
        }
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      let height = jQuery(".message-box").last().offset().top;
      jQuery('.chat-box').animate({ scrollTop: height });
    }, 500);
  }

  showTypeFlag() {
    this.showType = true;
  }

  //handle all user chat message.
  handleChatMessage(res: any) {
    switch (res.subType) {
      case this._constants.getAllChats:
        this.showTypeFlag();
        if (res.data) {
          this.showChatLoader = false;
          this.userMessages = res.data;
          this.userChatId = this.userMessages._id;
          this.insertTwoWayChatSettingList();
        }
        setTimeout(() => {
          this.goToBottomFirst();
        }, 700);
        break;
      case this._constants.getAllGroupChats:
        this.showTypeFlag();
        if (res.data) {
          this.showGroupChatLoader = false;
          this.groupMessages = res.data;
          this.user = this.groupMessages;
          this.insertGroupSettingList();
          this.insertGrpMembers();
          this.getAllUsers();
          this.setGroupProfilePicture();
        }
        setTimeout(() => {
          this.goToBottomFirst();
        }, 700);
        break;
      case this._constants.addNewChat:
        if (res.data) {
          this.insertChat(res);
        }
        break;
      case this._constants.addNewGroupChat:
        if (res.data) {
          if (res.data._id == this.receiverId || res.sameUser) {
            if (this.groupMessages == undefined) {
              this.groupMessages = res.data;
            } else {
              this.groupMessages.message = [...this.groupMessages.message, res.data.message[res.data.message.length - 1]];
            }
            this.goToBottom();
          }
        }
        break;
      case this._constants.updateGroupMembers:
        if (res.data) {
          this.groupMessages = res.data;
          this.user = this.groupMessages;
          this.addGrpMembers = [];
          this.insertGrpMembers();
          this.updateGrpMembers = [];
          this.addAllNewMembers();
          this.addNewGrpMembers = [];
        }
        break;
      case this._constants.getAllUsers:
        this.allUpdateGrpMembers = res.data;
        this.addAllNewMembers();
        break;
      case this._constants.deleteUserChat:
        if (res.data) {
          Materialize.toast("Chat deleted sucessfully...", 700, "green");
          this.backToChat();
        }
        break;
      case this._constants.leftGroupChat:
        if (res.data) {
          Materialize.toast("Lefted from group sucessfully...", 700, "green");
          this.backToChat();
        }
        break;
      case this._constants.deleteGroupChat:
        if (res.data) {
          Materialize.toast("Permantly deleted group...", 700, "green");
          this.backToChat();
        }
        break;
      case this._constants.deleteGroupChatNoteMessage:
        if (res.data) {
          Materialize.toast("This group is no more available...", 700, "red");
          // this.backToChat();
          this.groupIsMore = false;
          jQuery(".right-chat").css("display", "none");
        }
        break;
      case this._constants.generateLink:
        if (res) {
          this.messageIs = res.link.link;
          this.createdUrl = res.link.link;
          this.sendChatMessage();
          this._mobileService.copyLinkViaClipbord(this.createdUrl, "Link copied to clipbord");
          // this.copyLink();
        }
        break;
      default:
        break;
    }
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
  }

  setGroupProfilePicture() {
    this.imgURL = this.groupMessages.profileimage;
  }

  addAllNewMembers() {
    this.allUpdateGrpMembers.forEach((ele, index) => {
      let temp = true;
      this.user.members.forEach((eleMatch, index2) => {
        if (ele._id == eleMatch.memberId._id) {
          temp = false;
        }
      });
      if (temp) {
        this.updateGrpMembers.push(ele);
      }
    });
  }

  getAllUsers() {
    //call to get all users.
    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.getAllUsers
      },
    });
  }

  insertGrpMembers() {
    this.groupMessages.members.forEach((member) => {
      this.addGrpMembers.push(member.memberId._id);
      this.groupUserAre += member.memberId.fullName + ", ";
    });
  }

  insertGroupSettingList() {
    this.settingLists = [{
      id: 1,
      status: true,
      name: "Show Members"
    }, {
      id: 2,
      status: (this.loggedInUser._id == this.user.createdBy?._id),
      name: "Add Members"
    }, {
      id: 3,
      status: true,
      name: "Upload Profile Picture"
    }, {
      id: 4,
      status: (this.loggedInUser._id == this.user.createdBy?._id),
      name: "Delete Group Chat Permanantly"
    }, {
      id: 5,
      status: true,
      name: "Leave Group Chat"
    }];
  }

  insertTwoWayChatSettingList() {
    this.settingLists = [{
      id: 11,
      status: true,
      name: "Create Group"
    }, {
      id: 22,
      status: true,
      name: "Delete Chat"
    }];
  }

  handleUserData() {
    this.getCandidateUserDetails();
    this.getCurrentUserDetails();
  }

  getCandidateUserDetails() {
    this.userService.getCandidateUserDetails({ userId: this.loggedInUser._id }).subscribe((res: any) => {
      this.userCandidateProfileData = res.data;
    });
  }

  getCurrentUserDetails() {
    this.userService.getUserDetails({ receiverId: this.receiverId }).subscribe((res: any) => {
      this.user = res.data;
    });
  }

  backToChat() {
    this.router.navigate(["/" + this.loggedInUser.userRole + "/user-chat"], { queryParams: { groupChatActive: this.groupChat ? 3 : 1 } });
  }

  sendChatMessage() {
    if (this.messageIs == '' || this.messageIs == undefined) {
      return;
    }

    if (!this.groupChat) {
      let payload = {
        receiverId: this.receiverId,
        message: this.messageIs
      };

      if (this.messageIs) {
        this._socket.sendMessage({
          type: this._constants.userChatMessageType,
          data: {
            subType: this._constants.addNewChat,
            data: payload
          },
        });
      }
    } else {
      let payload = {
        groupId: this.receiverId,
        message: this.messageIs
      };

      if (this.messageIs) {
        this._socket.sendMessage({
          type: this._constants.userChatMessageType,
          data: {
            subType: this._constants.addNewGroupChat,
            payload: payload
          },
        });
      }
    }

    this.messageIs = "";
  }

  goToBottomFirst() {
    try {
      setTimeout(() => {
        if (this.chatDiv && this.chatDiv.nativeElement && this.chatDiv.nativeElement.scrollHeight) {
          this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
          return;
        } else {
          this.goToBottomFirst();
        }
      }, 500);
    } catch (err) {
      console.log(err);
    }
  }

  goToBottom() {
    try {
      if (this.chatDiv && this.chatDiv.nativeElement && this.chatDiv.nativeElement.scrollHeight) {
        let height = this.chatDiv.nativeElement.scrollHeight;
        jQuery('.conversation-container').animate({ scrollTop: height });
      }
    } catch (err) {
      console.log(err);
    }
  }

  showImageModal(showValue) {
    const dialogIntroduceRef = this.dialog.open(DialogImagePreviewComponent, {
      data: {
        dialogType: "imagePreview",
        dialogTitle: "Image Preview...",
        imgUrl: showValue.profileimage,
        fullName: showValue.fullName
      }
    });

    dialogIntroduceRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  setting() {
    const dialogSettingRef = this.dialog.open(DialogSettingComponent, {
      data: {
        dialogType: "setting",
        dialogTitle: "Setting...",
        settingLists: this.settingLists
      }
    });

    dialogSettingRef.afterClosed().subscribe(result => {
      if (result) {
        this.openListsModals(result.id);
      }
    });
  }

  openListsModals(id) {
    switch (id) {
      case 1:
        this.openMembersModal();
        break;
      case 2:
        this.openAddMemberModal();
        break;
      case 3:
        this.openUpdateProfilePictureModal();
        break;
      case 4:
        //Delete Group Chat Permanantly
        this.deleteGroupChat();;
        break;
      case 5:
        // Left Group Chat
        this.leftGroupChat();
        break;
      case 11:
        this.gotoCreateGroup();
        break;
      case 22:
        this.deleteUserChat();
        break
      default:
        break;
    }
  }

  leftGroupChat() {
    let payload = {
      receiverId: this.receiverId,
    }

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.leftGroupChat,
        payload: payload
      },
    });
  }

  deleteGroupChat() {
    let payload = {
      receiverId: this.receiverId,
    }

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.deleteGroupChat,
        payload: payload
      },
    });
  }

  deleteUserChat() {
    let payload = {
      userChatId: this.userChatId,
    }
    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.deleteUserChat,
        payload: payload
      },
    });
  }

  gotoCreateGroup() {
    let userData = (this.userMessages.user1._id == this.loggedInUser._id) ? this.userMessages.user2 : this.userMessages.user1;
    this.router.navigate(["/" + this.loggedInUser.userRole + "/user-chat"], { queryParams: { groupChatActive: 3, openCreateGroupModal: true, userData: JSON.stringify(userData) } });
  }

  openMembersModal() {
    const dialogGroupMembersRef = this.dialog.open(DialogGroupMembersComponent, {
      data: {
        dialogType: "groupMembers",
        dialogTitle: "Group Members...",
        groupMessages: this.groupMessages,
        groupChat: this.groupChat,
        loggedInUser: this.loggedInUser,
        user: this.user,
        addGrpMembers: this.addGrpMembers
      }
    });

    dialogGroupMembersRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMembers(result);
      }
    });
  }

  openUpdateProfilePictureModal() {
    const dialogUploadPictureRef = this.dialog.open(DialogUploadPictureComponent, {
      data: {
        dialogType: "uploadProfilePicture",
        dialogTitle: "Picture...",
        imgURL: this.imgURL,
      }
    });

    dialogUploadPictureRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProfilePicture(result);
      }
    });
  }

  openAddMemberModal() {
    const dialogAddGroupMembersRef = this.dialog.open(DialogAddMembersComponent, {
      data: {
        dialogType: "addGroupMembers",
        dialogTitle: "Add Group Members...",
        groupChat: this.groupChat,
        loggedInUser: this.loggedInUser,
        addNewGrpMembers: this.addNewGrpMembers,
        updateGrpMembers: this.updateGrpMembers
      }
    });

    dialogAddGroupMembersRef.afterClosed().subscribe(result => {
      if (result) {
        this.addMoreGroupMembers(result);
      }
    });
  }

  updateMembers(result) {
    let payload = {
      groupId: this.receiverId,
      members: result.addGrpMembers
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.updateGroupMembers,
        payload: payload
      },
    });

  }

  addMoreGroupMembers(result) {
    let previousMembers = [];
    this.user.members.forEach((item) => {
      previousMembers.push(item.memberId._id);
    });

    let payload = {
      groupId: this.receiverId,
      members: [...previousMembers, ...result.addNewGrpMembers]
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.updateGroupMembers,
        payload: payload
      }
    });
  }

  updateProfilePicture(result) {
    if (result.filepath) {
      if (!result.imagePath) {
        Materialize.toast(
          "Please click on the plus Icon to upload a Picture !",
          4000
        );
      } else {
        let fddd = new FormData();
        fddd.append("file", result.imagePath[0], result.imagePath[0].name);
        fddd.append("id", this.receiverId);
        this.userService.updateGroupProfileImg(fddd).subscribe(
          (res) => {
            this.user.profileimage = res.data.profileimage;
            Materialize.toast(res.message, 1000, "green");
          }, (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  askShare() {
    const dialogCreateGroupRef = this.dialog.open(DialogAskToSendProfileLinkComponent, {
      data: {
        dialogType: "askProfileLink",
        dialogTitle: "Profile link send..."
      }
    });

    dialogCreateGroupRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendProfiledata();
      }
    });
  }

  sendProfiledata() {
    let payload = {
      recruiterId: this.loggedInUser._id,
      resumeId: this.userCandidateProfileData._id
    };

    this._socket.sendMessage({
      type: this._constants.userChatMessageType,
      data: {
        subType: this._constants.generateLink,
        data: payload
      },
    });

  }

  getImage(obj) {
    obj.showCreatedLogo = true;
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    if (this.filepath) {
      this.uploadChatFile();
    }
  }

  uploadChatFile() {
    const fd = new FormData();
    if (!this.imagePath) {
      Materialize.toast("Please click on the plus Icon to upload a Picture !", 4000);
    } else {
      fd.append("file", this.imagePath[0], this.imagePath[0].name);
      fd.append("fromId", this.loggedInUser._id);
      fd.append("chatId", this.receiverId);

      if (this.groupChat) {
        this._chatService.uploadGroupChatFile(fd).subscribe((res) => {
          if (res.data) {
          }
        }, (error) => {
          console.log(error);
        });
      } else {
        this._chatService.uploadChatFile(fd).subscribe((res) => {
          if (res.data) {
          }
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  downloadFile(message, filePath) {
    this.progress = this._chatService.downloadChatFile(filePath, message);
    this.progressPercent = 0;
    this.progress.subscribe(progress => {
      this.progressPercent = progress.percent;
      console.log(`Upload ${this.progressPercent}% completed`);
      this.inProgress = true;
      if (progress.completeStatus && progress.body) {
        this._chatService.download(progress.body, message);
      }
    }, error => {
      console.error(error);
      this.inProgress = false;
      this.progressPercent = 0;
    }, () => {
      console.log("completed : ");
    });
  }

  insertChat(res) {
    if (res.data.user1._id === this.receiverId || res.data.user2._id === this.receiverId) {
      if (this.userMessages === undefined) {
        res.data.message = [res.data.message];
        this.userMessages = res.data;
      } else {
        this.userMessages.message = [...this.userMessages.message, res.data.message];
      }
      this.goToBottom();
    }
  }
}
