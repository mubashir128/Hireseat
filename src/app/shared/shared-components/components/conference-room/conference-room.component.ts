import { Component, OnInit } from '@angular/core';
import { ConferenceRoomService } from 'src/app/_services/conference-room.service';

@Component({
  selector: 'app-conference-room',
  templateUrl: './conference-room.component.html',
  styleUrls: ['./conference-room.component.css']
})
export class ConferenceRoomComponent implements OnInit {

  conferenceRooms: any[] = [];
  showLoader: boolean = true;

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
}
