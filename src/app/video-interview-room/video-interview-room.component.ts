import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-interview-room',
  templateUrl: './video-interview-room.component.html',
  styleUrls: ['./video-interview-room.component.css']
})
export class VideoInterviewRoomComponent implements OnInit {
  employerInterviewList: any;
  recruiterInterviewList: any;
  constructor(
    private router: Router
  ) {
    this.employerInterviewList = [
      {
        id: 1,
        name: 'Tom',
        role: 'Backend developer',
        skills: [
          'nodejs',
          'mongodb',
          'javascript'
        ]
      },
      {
        id: 2,
        name: 'Shina',
        role: 'UI/UX developer',
        skills: [
          'Figma Software',
          'angular',
          'javascript'
        ]
      },
      {
        id: 3,
        name: 'Eric',
        role: 'Frontend developer',
        skills: [
          'PHP',
          'angular',
          'javascript'
        ]
      },
      {
        id: 4,
        name: 'Max',
        role: 'Cloud architect',
        skills: [
          'AWS',
          'Asure',
          'Goolge cloude'
        ]
      }
    ];
  }

  ngOnInit() {
    // console.log(window.location.hostname);

  }
  onInterview() {
    // window.open('http://' + window.location.hostname + '/video-call');
    this.router.navigate(['video-call/1']);
  }
}
