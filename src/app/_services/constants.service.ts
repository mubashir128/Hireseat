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
  notification = 1;

  constructor() { }
}

