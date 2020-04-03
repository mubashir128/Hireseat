import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';
import { OpentokService } from '../_services/opentok.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private opentokService: OpentokService,
    private spinner: NgxSpinnerService

  ) {
    this.subscriberOptions = {
      insertMode: 'append',
      width: '200px',
      height: '200px',
      name: 'Subscriber',
      fitMode: 'cover',
      style: { nameDisplayMode: 'on', buttonDisplayMode: 'on' },
      publishAudio: false,
      publishVideo: true
    };
    // this.opentokService._publishedStream.subscribe(publisher => {
    //   console.log('publisher status', publisher);

    // });
  }

  ngAfterViewInit() {
    this.spinner.show();

    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, this.subscriberOptions, (err) => {
      if (err) {
        this.spinner.hide();

        alert(err.message);
      }
      this.spinner.hide();

      console.log('from subscriber*******', this.stream);

    });
  }


}
