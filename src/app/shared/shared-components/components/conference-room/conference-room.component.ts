import { Component, OnInit } from '@angular/core';
import { ConferenceRoomService } from 'src/app/_services/conference-room.service';
declare var Materialize;
@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.css']
})
export class ConferenceRoomComponent implements OnInit {

  conferenceRooms: any[] = [];
  showLoader: boolean = true;
  myComment = [];

  constructor(
    private _conferenceRoom: ConferenceRoomService
  ) { }

  ngOnInit(): void {
    this.getConferenceRooms();
  }

  getConferenceRooms() {
    this._conferenceRoom.getConferenceRooms().subscribe(res => {
      this.showLoader = false;
      this.conferenceRooms = res;
      console.log("this.conferenceRooms : ",this.conferenceRooms);
    }, res=>{
      this.showLoader = false;
    });
  }

  transform(url) {
    if (url != null) {
      window.open(url, '_blank');
    }
  }

  linkedIn(url) {
    if (url != null) {
      window.open(url, "_blank");
    }
  }
  
  getImage(obj){
    obj.showCreatedLogo = true;
  }

  postMycmt(event) {
    console.log("event : ",event);
    if (event.review === "" || event.review === null || event.review === undefined) {
      Materialize.toast("Comment box is empty!");
    } else {
      const payload = {
        profileId: event.conference.candidate_id._id,
        review: event.review
      };

      console.log("payload : ",payload);
      this._conferenceRoom.postMyComment(payload).subscribe((res) => {
        console.log("res : ",res);
      }, (err) => {
        Materialize.toast("Unable to post!", 5000);
      });
    }
  }
}
