import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as myGlobals from "../globalPath";
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  ratingPoints = 1000;
  sharedPoints = 200;
  ReplyAdvicePoints = 25;
  adviceLikedPoints = 50;
  advicePoints = 100;
  notificationLimit = 15;

  notificationType = 1;
  getAllNotifications = "getAllNotifications";
  newNotification = "newNotification";
  decreaseNotificationCount = "decreaseNotificationCount";

  profileQuestionType = 3;
  getAllQuestions = "getAllQuestions";
  question = "question";
  answer = "answer";

  recruiterDoughnutChartType = 6;
  getDoughnutChartData = "getDoughnutChartData";
  getAllRecruiterComment = "getAllRecruiterComment";

  recruiterLineChartType = 8;
  getRecruiterLineChartData = "getRecruiterLineChartData";

  recruiterPieChartType = 7;
  getRecruiterPieChartData = "getRecruiterPieChartData";

  sharedProfileType = 5;
  getAllSharedProfiles = "getAllSharedProfiles";
  addComment = "addComment";
  likeComment = "likeComment";
  shareVideoViaRecruiterEmail = "shareVideoViaRecruiterEmail";
  editComment = "editComment";
  deleteComment = "deleteComment";
  replyComment = "replyComment";

  barChartType = 4;
  getAllBarChartData = "getAllBarChartData";
  increaseRatingPoints = "increaseRatingPoints";
  increaseHiredCount = "increaseHiredCount";
  pushNewCreatedBid = "pushNewCreatedBid";

  askQuestionType = 2;
  addQuestion = "addQuestion";

  private = "private";
  public = "public";
  all = "all";

  sharedCandidateProfileType = 10;

  sharedRecruiterProfileType = 9;
  candidateJobQuestionType = 11;

  askedQuestion = "askedQuestion";
  postAnswer = "postAnswer";
  replyAdvicePoints = "replyAdvicePoints";
  comment = "comment";
  reply = "reply";
  like = "like";
  askQuestion = "askQuestion";
  profileQuestion = "profileQuestion";
  profileAnswer = "profileAnswer";
  shareCandidateProfile = "shareCandidateProfile";
  id = "YW5hbmRQamFndGFwOTU5NTA3MTgyOA==";
  employerKey = 2;
  recruiterKey = 3;
  ACTIVE = "ACTIVE";
  SCHEDULED = "SCHEDULED";
  recruiterComment = "recruiterComment";

  mobileNotificationIncrementType = 12;
  getMobileNotificationIncrementType = "getMobileNotificationIncrementType";

  generateLink = "generateLink";

  getAllMultiSharedProfiles = "getAllMultiSharedProfiles"

  multiSharedCandidateProfileCount = 13;
  multiSharedCandidateProfileCountType = "multiSharedCandidateProfileCountType";

  userChatType = 14;
  userChat = "userChat";
  getAllUsers = "getAllUsers";
  getOnlyUserChats = "getOnlyUserChats";
  
  userChatMessageType = 15;
  userChatMessage = "userChatMessage";
  addNewChat = "addNewChat";
  getAllChats = "getAllChats";
  
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  async getAllConstants(){
    // this.http.get<any>(this.baseurl + "api/getAllConstants").subscribe(res=>{
    //   this.setVariables(res);
    //   return true;
    // });
  }
  
  setVariables(obj){
    this.getAllNotifications = obj.getAllNotifications;
    this.newNotification = obj.newNotification;
    this.addQuestion = obj.addQuestion;
    this.getAllQuestions = obj.getAllQuestions;
    this.askedQuestion = obj.askedQuestion;
    this.answer = obj.answer;
    this.question = obj.question;
    this.postAnswer = obj.postAnswer;
    this.getAllBarChartData = obj.getAllBarChartData;
    this.increaseRatingPoints = obj.increaseRatingPoints;
    this.increaseHiredCount = obj.increaseHiredCount;
    this.pushNewCreatedBid = obj.pushNewCreatedBid;
    this.getAllSharedProfiles = obj.getAllSharedProfiles;
    this.addComment = obj.addComment;
    this.likeComment = obj.likeComment;
    this.replyAdvicePoints = obj.replyAdvicePoints;
    this.getDoughnutChartData = obj.getDoughnutChartData;
    this.getRecruiterPieChartData = obj.getRecruiterPieChartData;
    this.getRecruiterLineChartData = obj.getRecruiterLineChartData;
    this.getAllRecruiterComment = obj.getAllRecruiterComment;
    this.shareVideoViaRecruiterEmail = obj.shareVideoViaRecruiterEmail;
    this.comment = obj.comment;
    this.reply = obj.reply;
    this.like = obj.like;
    this.askQuestion = obj.askQuestion;
    this.profileQuestion = obj.profileQuestion;
    this.profileAnswer = obj.profileAnswer;
    this.decreaseNotificationCount = obj.decreaseNotificationCount;
    this.shareCandidateProfile = obj.shareCandidateProfile;
    this.editComment = obj.editComment;
    this.deleteComment = obj.deleteComment;
    this.replyComment = obj.replyComment;
    this.ratingPoints = obj.ratingPoints;
    this.sharedPoints = obj.sharedPoints;
    this.ReplyAdvicePoints = obj.ReplyAdvicePoints;
    this.adviceLikedPoints =  obj.adviceLikedPoints;
    this.advicePoints = obj.advicePoints;
    this.notificationType = obj.notificationType;
    this.profileQuestionType = obj.profileQuestionType;
    this.recruiterDoughnutChartType = obj.recruiterDoughnutChartType,
    this.recruiterLineChartType = obj.recruiterLineChartType;
    this.recruiterPieChartType = obj.recruiterPieChartType;
    this.sharedProfileType = obj.sharedProfileType;
    this.barChartType = obj.barChartType;
    this.askQuestionType = obj.askQuestionType;
    this.id = obj.id;
    this.employerKey = obj.employerKey;
    this.recruiterKey = obj.recruiterKey;
    this.private = obj.private;
    this.public = obj.public;
    this.all = obj.all;
    this.ACTIVE = obj.ACTIVE;
    this.SCHEDULED = obj.SCHEDULED;
    this.recruiterComment = obj.recruiterComment;
    this.sharedCandidateProfileType = obj.sharedCandidateProfileType;
    this.sharedRecruiterProfileType = obj.sharedRecruiterProfileType;
    this.candidateJobQuestionType = obj.candidateJobQuestionType;
    this.notificationLimit = obj.notificationLimit;
    this.generateLink = obj.generateLink;
    this.getAllMultiSharedProfiles = obj.getAllMultiSharedProfiles;
  }

}

