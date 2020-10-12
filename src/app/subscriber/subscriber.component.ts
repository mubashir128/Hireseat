import { Component, ElementRef, AfterViewInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../_services/opentok.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class SubscriberComponent implements AfterViewInit {
  // @ViewChild('subscriberDiv', { static: true }) subscriberDiv: ElementRef;
  @ViewChild('subscriberDiv', { static: true }) subscriberDiv: ElementRef;

  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  subscriberOptions: any;
  constructor(
    private opentokService: OpentokService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.subscriberOptions = {
      insertMode: 'append',
      // width: '600px',
      // height: '600px',
      name: 'Subscriber',
      fitMode: 'cover',
      style: { nameDisplayMode: 'off', buttonDisplayMode: 'on' },
      publishAudio: true,
      publishVideo: true
    };
    // this.opentokService._publishedStream.subscribe(publisher => {
    //   // console.log('publisher status', publisher);

    // });
    this.opentokService._meetingEnd.subscribe((status) => {
      // // console.log('status', status);
      if (status) {

      }
    });
  }

  ngAfterViewInit() {
    this.spinner.show();

    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, this.subscriberOptions, (err) => {
      if (err) {
        this.spinner.hide();

        // alert(err.message);
      }
      this.spinner.hide();

      // console.log('from subscriber*******', this.stream);

    });
    this.session.signal(
      {
        data: "hello"
      },
      function (error) {
        if (error) {
          // console.log("signal error ("+ error.name + "): " + error.message);
        } else {
          // console.log("signal sent.");
        }
      }
    );
    this.session.on('streamDestroyed', (event) => {
      console.log('subscrier disconnected');

    })
  }
  unsubscribe(subscriber) {
    this.session.unsubscribe(subscriber);
    this.router.navigate(['/'])
  }

}
