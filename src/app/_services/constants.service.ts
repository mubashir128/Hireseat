import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  ratingPoints;
  sharedPoints;
  ReplyAdvicePoints;
  adviceLikedPoints;
  advicePoints;
  notificationLimit;

  notificationType;
  getAllNotifications;
  newNotification;
  decreaseNotificationCount;

  profileQuestionType;
  getAllQuestions;
  question;
  answer;

  recruiterDoughnutChartType;
  getDoughnutChartData;
  getAllRecruiterComment;

  recruiterLineChartType;
  getRecruiterLineChartData;

  recruiterPieChartType;
  getRecruiterPieChartData;

  sharedProfileType;
  getAllSharedProfiles;
  addComment;
  addNote;
  likeComment;
  shareVideoViaRecruiterEmail;
  editComment;
  deleteComment;
  replyComment;

  barChartType;
  getAllBarChartData;
  increaseRatingPoints;
  increaseHiredCount;
  pushNewCreatedBid;

  askQuestionType;
  addQuestion;

  private;
  public;
  all;

  sharedCandidateProfileType;

  sharedRecruiterProfileType;
  candidateJobQuestionType;

  askedQuestion;
  postAnswer;
  replyAdvicePoints;
  comment;
  reply;
  like;
  askQuestion;
  profileQuestion;
  profileAnswer;
  shareCandidateProfile;
  id;
  employerKey;
  recruiterKey;
  ACTIVE;
  SCHEDULED;
  recruiterComment;

  mobileNotificationIncrementType;
  getMobileNotificationIncrementType;

  generateLink;

  getAllMultiSharedProfiles;

  //check below
  multiSharedCandidateProfileCount;
  multiSharedCandidateProfileCountType;

  userChatType;
  userChat;
  getAllUsers;
  getOnlyUserChats;
  
  userChatMessageType;
  userChatMessage;
  addNewChat;
  getAllChats;
  onlyForCandidateSharedProfileType;
  getAllOnlyForCandidateSharedProfileType;

  asAAddFriend;
  asARequested;
  asAPending;
  asAFriend;

  connectionFriendType;
  addFriendRequest;
  connectFriend;

  getGroupChatUsers;
  createAndAddGroup;
  getAllGroupChats;
  addNewGroupChat;

  updateGroupMembers;

  deleteUserChat;
  leftGroupChat;
  deleteGroupChat;
  deleteGroupChatNoteMessage;

  generalEmailIntro;
  offerEmailIntro;

  userIsOnline;
  userIsOffline;

  swapChatNotification;

  timelineType;
  getTimelinesType;
  actualTimeline;
  connectionRequest;
  sayThanks;
  publicProfile;

  eventCheckIn;
  eventAttendingAre;

  newChatComeForTop;
  
  // ratingPoints = 1000;
  // sharedPoints = 200;
  // ReplyAdvicePoints = 25;
  // adviceLikedPoints = 50;
  // advicePoints = 100;
  // notificationLimit = 15;

  // notificationType = 1;
  // getAllNotifications = "getAllNotifications";
  // newNotification = "newNotification";
  // decreaseNotificationCount = "decreaseNotificationCount";

  // profileQuestionType = 3;
  // getAllQuestions = "getAllQuestions";
  // question = "question";
  // answer = "answer";

  // recruiterDoughnutChartType = 6;
  // getDoughnutChartData = "getDoughnutChartData";
  // getAllRecruiterComment = "getAllRecruiterComment";

  // recruiterLineChartType = 8;
  // getRecruiterLineChartData = "getRecruiterLineChartData";

  // recruiterPieChartType = 7;
  // getRecruiterPieChartData = "getRecruiterPieChartData";

  // sharedProfileType = 5;
  // getAllSharedProfiles = "getAllSharedProfiles";
  // addComment = "addComment";
  // addNote = "addNote";
  // likeComment = "likeComment";
  // shareVideoViaRecruiterEmail = "shareVideoViaRecruiterEmail";
  // editComment = "editComment";
  // deleteComment = "deleteComment";
  // replyComment = "replyComment";

  // barChartType = 4;
  // getAllBarChartData = "getAllBarChartData";
  // increaseRatingPoints = "increaseRatingPoints";
  // increaseHiredCount = "increaseHiredCount";
  // pushNewCreatedBid = "pushNewCreatedBid";

  // askQuestionType = 2;
  // addQuestion = "addQuestion";

  // private = "private";
  // public = "public";
  // all = "all";

  // sharedCandidateProfileType = 10;

  // sharedRecruiterProfileType = 9;
  // candidateJobQuestionType = 11;

  // askedQuestion = "askedQuestion";
  // postAnswer = "postAnswer";
  // replyAdvicePoints = "replyAdvicePoints";
  // comment = "comment";
  // reply = "reply";
  // like = "like";
  // askQuestion = "askQuestion";
  // profileQuestion = "profileQuestion";
  // profileAnswer = "profileAnswer";
  // shareCandidateProfile = "shareCandidateProfile";
  // id = "YW5hbmRQamFndGFwOTU5NTA3MTgyOA==";
  // employerKey = 2;
  // recruiterKey = 3;
  // ACTIVE = "ACTIVE";
  // SCHEDULED = "SCHEDULED";
  // recruiterComment = "recruiterComment";

  // mobileNotificationIncrementType = 12;
  // getMobileNotificationIncrementType = "getMobileNotificationIncrementType";

  // generateLink = "generateLink";

  // getAllMultiSharedProfiles = "getAllMultiSharedProfiles"

  // //check below
  // multiSharedCandidateProfileCount = 13;
  // multiSharedCandidateProfileCountType = "multiSharedCandidateProfileCountType";

  // userChatType = 14;
  // userChat = "userChat";
  // getAllUsers = "getAllUsers";
  // getOnlyUserChats = "getOnlyUserChats";
  
  // userChatMessageType = 15;
  // userChatMessage = "userChatMessage";
  // addNewChat = "addNewChat";
  // getAllChats = "getAllChats";

  constructor() {
  }
  
  async setVariables(obj){
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
    
    //check below
    this.multiSharedCandidateProfileCount = obj.multiSharedCandidateProfileCount;
    this.multiSharedCandidateProfileCountType = obj.multiSharedCandidateProfileCountType;
    this.userChatType = obj.userChatType;
    this.userChat = obj.userChat;
    this.getAllUsers = obj.getAllUsers;
    this.getOnlyUserChats = obj.getOnlyUserChats;
    this.userChatMessageType = obj.userChatMessageType;
    this.userChatMessage = obj.userChatMessage;
    this.addNewChat = obj.addNewChat;
    this.getAllChats = obj.getAllChats;
    this.mobileNotificationIncrementType = obj.mobileNotificationIncrementType;
    this.getMobileNotificationIncrementType = obj.getMobileNotificationIncrementType;
    this.addNote = obj.addNote;
    this.onlyForCandidateSharedProfileType = obj.onlyForCandidateSharedProfileType;
    this.getAllOnlyForCandidateSharedProfileType = obj.getAllOnlyForCandidateSharedProfileType;

    this.asAAddFriend = obj.asAAddFriend;
    this.asARequested = obj.asARequested;
    this.asAPending = obj.asAPending;
    this.asAFriend = obj.asAFriend;

    this.connectionFriendType = obj.connectionFriendType;
    this.addFriendRequest = obj.addFriendRequest;
    this.connectFriend = obj.connectFriend;

    this.getGroupChatUsers = obj.getGroupChatUsers;
    this.createAndAddGroup = obj.createAndAddGroup;
    this.getAllGroupChats = obj.getAllGroupChats;
    this.addNewGroupChat = obj.addNewGroupChat;

    this.updateGroupMembers = obj.updateGroupMembers;

    this.deleteUserChat = obj.deleteUserChat;
    this.leftGroupChat = obj.leftGroupChat;
    this.deleteGroupChat = obj.deleteGroupChat;
    this.deleteGroupChatNoteMessage = obj.deleteGroupChatNoteMessage;

    this.generalEmailIntro = obj.generalEmailIntro;
    this.offerEmailIntro = obj.offerEmailIntro;

    this.userIsOnline = obj.userIsOnline;
    this.userIsOffline = obj.userIsOffline;

    this.swapChatNotification = obj.swapChatNotification;

    this.timelineType = obj.timelineType;
    this.getTimelinesType = obj.getTimelinesType;
    this.actualTimeline = obj.actualTimeline;
    this.connectionRequest = obj.connectionRequest;
    this.sayThanks = obj.sayThanks;
    this.publicProfile = obj.publicProfile;

    this.eventCheckIn = obj.eventCheckIn;
    this.eventAttendingAre = obj.eventAttendingAre;

    this.newChatComeForTop = obj.newChatComeForTop;
  }

}