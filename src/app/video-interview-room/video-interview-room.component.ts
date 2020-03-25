import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-interview-room',
  templateUrl: './video-interview-room.component.html',
  styleUrls: ['./video-interview-room.component.css']
})
export class VideoInterviewRoomComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  onInterview() {

    this.router.navigate(['video-call']);
  }
}
