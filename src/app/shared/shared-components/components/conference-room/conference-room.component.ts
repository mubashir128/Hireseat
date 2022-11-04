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

  postMyConferencecmt(event) {
    if (event.review === "" || event.review === null || event.review === undefined) {
      Materialize.toast("Comment box is empty!");
    } else {
      const payload = {
        profileId: event.profileId,
        review: event.review
      };

      this._conferenceRoom.postMyComment(payload).subscribe((res) => {
        if(res){
          this.addReviewToConference(event.conferenceId, res);
        }
      }, (err) => {
        Materialize.toast("Unable to post!", 5000);
      });
    }
  }

  addReviewToConference(conferenceId, res){
    this.conferenceRooms.forEach(conference => {
      if(conference?._id == conferenceId){
        conference.candidate_id.canconferenceRoom = [...conference?.candidate_id?.canconferenceRoom, res];
      }
    });
  }
  
}
