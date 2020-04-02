import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})

export class SubscriberComponent implements AfterViewInit {
  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  subscriberOptions: any;
  constructor() {
    this.subscriberOptions = {
      insertMode: 'append',
      width: '200px',
      height: '200px',
      name: 'Subscriber',
      fitMode: 'cover',
      style: { nameDisplayMode: 'on', buttonDisplayMode: 'on' },
      publishAudio: false,
      publishVideo: false
    };
  }

  ngAfterViewInit() {
    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, this.subscriberOptions, (err) => {
      if (err) {
        alert(err.message);
      }
      console.log('from subscriber*******', this.stream);

    });
  }
}
