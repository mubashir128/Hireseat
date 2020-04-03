import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as OT from '@opentok/client';
import * as config from '../globalPath';

@Injectable()
export class OpentokService {
  private publisher = new BehaviorSubject([]);
  // subscribe to this sub
  _publishedStream = this.publisher.asObservable();
  session: OT.Session;
  token: string;

  constructor() { }

  getOT() {
    return OT;
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
        console.log("Connection forced to disconnect: " + stream.id);
      }
    });
  }
}
