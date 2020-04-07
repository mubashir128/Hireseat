import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as OT from '@opentok/client';
import * as config from '../globalPath';

@Injectable()
export class OpentokService {
  private publisher = new BehaviorSubject([]);
  private streamToCheck = new Subject();
  private meetingEnd = new BehaviorSubject(false);
  // subscribe to this sub
  _publishedStream = this.publisher.asObservable();
  _streamToChecked = this.streamToCheck.asObservable();
  _meetingEnd = this.meetingEnd.asObservable();
  session: OT.Session;
  token: string;

  constructor() { }

  getOT() {
    return OT;
  }
  setMeetingStatus(status) {
    this.meetingEnd.next(status);
  }
  setStream(stream) {
    this.streamToCheck.next(stream);
  }
  // setting up newly generated stream event by publisher
  setPublisher(publishedStreamEvent) {
    this.publisher.next(publishedStreamEvent);
  }
  initSession() {
    return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
      .then((data) => data.json())
      .then((json) => {
        this.session = this.getOT().initSession(json.apiKey, json.sessionId);
        this.token = json.token;
        return this.session;
      });

  }
  room(name) {
    return fetch(config.SAMPLE_SERVER_BASE_URL + '/room/:name')
      .then((data) => data.json())
      .then((json) => {
        console.log(json);

      });
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
  forceUnpublish(stream) {
    this.session.forceUnpublish(stream, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log('Connection forced to disconnect: ' + stream.id);
      }
    });
  }
  unpublishSession(publisher) {
    this.session.unpublish(publisher);
    this.setMeetingStatus(true);
  }
}
