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
    console.log('on interview');

    this.router.navigate(['recruiter/video-interview-room/video-call']);
  }
}
