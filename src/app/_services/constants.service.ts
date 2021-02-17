import { Injectable } from '@angular/core';

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
  getQuestion = "getQuestion";

  private = "private";
  public = "public";
  all = "all";

  sharedCandidateProfileType = 10;
  
  sharedRecruiterProfileType = 9;
  candidateJobQuestionType = 11;
  constructor() { }
}

