import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../_services/opentok.service';

const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})


export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  publisherOptions: any;
  constructor(private opentokService: OpentokService) {
    this.publishing = false;
    this.publisherOptions = {
      insertMode: 'append',
      width: '400px',
      height: '400px',
      name: 'Publisher',
      fitMode: 'contain',
      style: { nameDisplayMode: 'on', buttonDisplayMode: 'on' },
      publishAudio: false,
      publishVideo: false
    };
  }

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, this.publisherOptions);

    if (this.session) {
      if (this.session['isConnected']()) {
        this.publish();
      }
      this.session.on('sessionConnected', () => this.publish());
    }
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        console.log('******************', this.publisher);

        this.publishing = true;
      }
    });
  }

}
