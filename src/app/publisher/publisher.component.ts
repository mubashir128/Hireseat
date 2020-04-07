import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../_services/opentok.service';
import { NgxSpinnerService } from 'ngx-spinner';
const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})


export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @ViewChild('visioStopBtn') visioStopBtn: ElementRef;

  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  publisherOptions: any;
  constructor(
    private opentokService: OpentokService,
    private spinner: NgxSpinnerService
  ) {
    this.publishing = false;
    this.publisherOptions = {
      insertMode: 'append',
      width: '300px',
      height: '300px',
      name: 'Publisher',
      fitMode: 'contain',
      style: { nameDisplayMode: 'off', buttonDisplayMode: 'on' },
      publishAudio: true,
      publishVideo: true,
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: false,
      alignItems: 'center',
      bigClass: 'OT_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigAlignItems: 'center',
      smallAlignItems: 'center',
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
      window: window,
      ignoreClass: 'OT_ignore',
    };
    // this.opentokService._publishedStream.subscribe(publisher => {
    //   // console.log('publisher status', publisher);

    // });

  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, this.publisherOptions);

    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
      this.session.on('sessionDisconnected', ((event) => {
        // console.log('sessionDisconnected', event);

        alert('The session disconnected. ' + event.reason);
      }));
    }
  }

  publish() {
    this.spinner.show();
    this.session.publish(this.publisher, (err) => {
      if (err) {
        this.spinner.hide();

        alert(err.message);
      } else {
        this.spinner.hide();

        // // console.log('******************', this.publisher);
        this.opentokService.setPublisher(this.publisher);
        this.publishing = true;
      }
    });
  }
  // unpublish() {
  //   this.session.unpublish(this.publisher);
  // }
}
