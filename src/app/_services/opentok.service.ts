import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import * as OT from '@opentok/client';
import * as config from '../globalPath';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as myGlobals from '../globalPath';
@Injectable()
export class OpentokService {
  public baseurl: any;

  private publisher = new BehaviorSubject([]);
  private streamToCheck = new Subject();
  private meetingEnd = new BehaviorSubject(false);
  private archivingID = new Subject();
  private candidateID = new Subject();

  // subscribe to this sub
  _publishedStream = this.publisher.asObservable();
  _streamToChecked = this.streamToCheck.asObservable();
  _meetingEnd = this.meetingEnd.asObservable();
  _archivingID = this.archivingID.asObservable();
  _getCandidateID = this.candidateID.asObservable();
  session: OT.Session;
  token: string;

  constructor() {
    this.baseurl = myGlobals.baseUrl;
  }

  getOT() {
    return OT;
  }

  setArchivingID(archivingID) {
    // console.log('##########setting archive ID######################', archivingID);

    this.archivingID.next(archivingID);
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
  setCandidateId(id) {
    this.candidateID.next(id);
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
  initSessionAPI(name) {

    return fetch(this.baseurl + 'api/room/' + name)
      .then((data) => data.json())
      .then((json) => {
        // console.log('nodejs', json);
        this.session = this.getOT().initSession(json.apiKey, json.sessionId);
        this.token = json.token;
        return this.session;
      });

  }
  room(name) {
    return fetch(config.SAMPLE_SERVER_BASE_URL + '/room/:name')
      .then((data) => data.json())
      .then((json) => {
        // console.log(json);

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
        // console.log(error);
      } else {
        // console.log('Connection forced to disconnect: ' + stream.id);
      }
    });
  }
  unpublishSession(publisher) {
    this.session.unpublish(publisher);
    this.setMeetingStatus(true);
  }
}
