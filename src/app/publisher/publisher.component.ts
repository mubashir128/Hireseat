import { Component, ElementRef, AfterViewInit, ViewChild, Input, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { OpentokService } from '../_services/opentok.service';
import { NgxSpinnerService } from 'ngx-spinner';
const publish = () => {

};

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

// width: '141px',
// height: '103px',
export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv', { static: true }) publisherDiv: ElementRef;
  @ViewChild('visioStopBtn') visioStopBtn: ElementRef;

  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  publisherOptions: any;
  hideVideo = false;
  width:string;
  height:string;
  constructor(
    private opentokService: OpentokService,
    private spinner: NgxSpinnerService,
    private renderer: Renderer2
  ) {
    this.publishing = false;
    var x = window.matchMedia("(max-width: 700px)");
    console.log('screen size',x.matches);
    if(x.matches == true){
      this.width = '100%';
      this.height = '300px';
    }else{
      this.width = '100%';
      this.height = '350px';
    }
    this.publisherOptions = {
      insertMode: 'append',
      // width: '200px',
      // height: '150px',
      width: this.width,
      height: this.height,
      name: 'Publisher',
      fitMode: 'cover',
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
      position: 'relative',
      insertDefaultUI:true
    };
    // this.opentokService._publishedStream.subscribe(publisher => {
    //   // console.log('publisher status', publisher);

    // });

  }
  isVideo(status) {
    // console.log('************', event);
    this.hideVideo = status;
    // this.publisher.publishVideo(false);

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

        // alert('The session disconnected. ' + event.reason);
      }));
      this.session.on('streamDestroyed', (event) => {
        event.preventDefault();
        console.log("Publisher stopped streaming.");
        
      
        // this.publisherDiv.nativeElement.afterClosed()
      })
    }
  }
 
  publish() {
    this.spinner.show();
    this.session.publish(this.publisher, (err) => {
      if (err) {
        this.spinner.hide();

        // alert(err.message);
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
