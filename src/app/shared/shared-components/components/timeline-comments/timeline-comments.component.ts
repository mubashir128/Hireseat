import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ConstantsService } from 'src/app/_services/constants.service';
import { TimelineService } from 'src/app/_services/timeline.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsocketService } from 'src/app/_services/websocket.service';

@Component({
  selector: 'app-timeline-comments',
  templateUrl: './timeline-comments.component.html',
  styleUrls: ['./timeline-comments.component.css']
})
export class TimelineCommentsComponent implements OnInit {

  comments: any[] = [];
  loggedUser: any;
  timelineId: any;

  url_1 = "https://lh3.googleusercontent.com/_2TR5w4RMhrYm3g13rNCezKbmaNpAlCm9kfqOFhy8h0uyouqECwPl-E_Zi3O-XCcM393U942GV7q89wSY3e7jWl_N-zKzUjxTm2Vlw9pxs9Dxf8nox5E9zJrb2UN0CD8BmDp8ECGOaNZAEIhCe7DdpczWCcHfnOyOtEjehVNS4jDlbPq1JApAn6wquLLs3jj6n6-m5qB9IfBxm_YaZwx0dSjYB7B-ukjcJz8Zd3ElA_d1hLJH7-wWznZsx1Z9Bl77RwSpdxMrSIpb8bX1dvC6SPD0gCPaBu7ay-9MO3NykXulUjPe8Ndydjrq8qPKyAyT2i2LyHK28rUXiVm6HYoGjPZLRBu6lEnDpX3U4T7twU9FaNGPke1NINGF51WZUmS4wHOjFm37Cpvuf0WEQFzubUUQEYk-FaJRazS--W1EsCaLlwCpVecl8lW9xBNmdozjCyPA5Soataej3U9teIb1ciriBLRGBMYYyEbw0C8QJHrqif89ZrAyhOPMpd9fS0NqllcwyNlL85Bn2W6S59pigGRHp5Zc9R6chekp6aNhCRiJCzKIQffeNSk7x7yeGzIPMq1P-N3vO7NtqgGewIyT9DwkVgk7tRp9zeklcHaBwBGQZMZxSWfkfEXkDmKfRfAW9bzT6bZthijs6XKWxEgMsARek8lGdXj-Du5gYVpjI7VOcAKK9hFHmrn8qqHTN6vTkboV63roMfUjSSq2_tQmVZ3=s800-no?authuser=0";
  url_2 = "https://lh3.googleusercontent.com/YdmDDLkzLXtqADhfwqiKysQAjIiVTxXKG3DZ8iPN5WsAUsKQm4dyftJERAQhzlp9X7lu-eU1zim7DWMGZS9Y6y3_VvXWE6kJDuW8-go9Nyle8vq3wvdTPnhg6ezkuRCDGah31fbWKHZeOiMaIA8E8ZTII8NlrBaLZpFd2K9HOuyzk3jqS-XwY59MOaAIIi_4uhJ-VIM9PGyI5Rc3HmENvEJc5lR2m2F4dGi1zA4E7edlQVX49C3EM53rkUdgHgGzkHPiRmes6pzd04Eg7C0Kpwg-sShQ6hlfsXMWR3YXTBtBcmxdScdBR5ELL7LUSRt5Cau1llsa9ZlAwNZKMQWrxQEjBy6hNdzkZ4-UXl15qukN8WJhY8rlQDNnb4_ojAfbgMJKX2U6ZEjjJHj1VjwBRAIFhhsE_4XcufKBqaMbnVXgEw9S8u_T8QbhieT0ddb5RvzQKW5Nd_W7rTxWkMG4Bhc-ib1dYFzcUjJuBIO33Y38rFvJWGc-WvEyPH4QVkiG-KgqTCmlylUN0JjZXJRV_5KMnm0diGa_JezhZN9wACU9j3sQv1nqj3Ydns5pMbXwyBROI7YJEebOKyugZuOLROq6lCVe68_Y6ACKpMUGNLIXbQ56nuiJRur0M8U3KO-ESnSE5YTQkWFg3AdAqLZIck3aOpjqu5x40beRAeEKqRzMdJ6syDdcYOzp3CYDjVoqrMHm7MlJ41FJAeylBWIrUe1l=s200-no?authuser=0";
  url_3 = "https://lh3.googleusercontent.com/ShNsYqXcoXv4Vegm5qma2NQlMucSbl-4RvedIZsrEi00pLzxtlkzHE4PBPuPkm23lGlLRXBAnGXZWkAFfQvzAEGcbzZcBVH92X-FwIP_1Qxlg6h5ZVBFHWZgULd1CKdJMpE9HjiLOduYy9zOiJG2KUQgHjcEbSLqG5cnVx9x6Vbj7nrlcnXLViTIvJac8aHkzdO8PFTVZqY0XLCZCSCwVOHeTzCdJ-DjuNzGKRq46GnLd2rwsRwB9_RdOG_Z0RsD2w_zCM4NlJ0vpxBKNYFs42OTAgjTducOFdfMZKsPKBmv6FOntFZfqzlgPFe8syT5qtdKA2elgD-TXA1fWDjaCPYyMBYCkW5stP_xVkpVHmWGZG31unAieheITvtD5MPfDqXf-ftDdsurJJ1NsqwrNj0hjSbCzNqmzAl3NPOVRxibrE1eMKIg-Ah2SJkU5Yh2hknON7XbHV8y9_NvZjO5oI7Xj_wKwKlIemMcbeY2-5S3vhr8tSTvq2vaneYXsWhoWAmITFcaH-I2BkXFESt1sZn8RaR_ud3Ml4Fa-T3y-Nr66T2t9Mg8ZF4REFNhRy5D_TvkQALKEqgP8atBPJDlDcqRNEVe8ptqkdo4PocTtVJpLG11gxNXOQV-OfvWl5pWmHNHy0nOpqLt6eat1NZlh2-vbHENRCj2deiKIaCI_frjMo8cOKf3PsdlZbjn1s5WmhDBrtuAFXIYmNXZH6e3JA69=s225-no?authuser=0";

  // observer
  timelineCommentsObserver = new Subject();
  timelineCommentsObserver$ = this.timelineCommentsObserver.asObservable();

  comment: string;

  constructor(
    private userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _timelineService: TimelineService,
    private _socket: WebsocketService,
    private _constants: ConstantsService
  ) {
    this._route.params.subscribe(params => {
      this.timelineId = params.timelineId;
    });
  }

  ngOnInit() {
    this.loggedUser = this.userService.getUserData();
    this._socket.addListener({
      type: this._constants.timelineCommentsType,
      callback: this.timelineCommentsObserver,
    });
    this.timelineCommentsObserver$.subscribe((res: any) => {
      this.handleTimelineCommentsData(res);
    });

    this.getTimelineComments();
  }

  handleTimelineCommentsData(res) {
    switch (res.subType) {
      case this._constants.addTimelineComment:
        this.comment = "";
        this.comments = [res.data, ...this.comments];
        break;
    }
  }

  getTimelineComments() {
    this._timelineService.getTimelineComments(this.timelineId).subscribe(res => {
      this.comments = res.comments;
    });
  }

  backToPage() {
    this._router.navigate(["/" + this.loggedUser.userRole + "/timeline"]);
  }

  sendTimelineComments() {
    this._socket.sendMessage({
      type: this._constants.timelineCommentsType,
      data: {
        subType: this._constants.addTimelineComment,
        timelineId: this.timelineId,
        comment: this.comment
      }
    });
  }

  ngOnDestroy() {
    this._socket.removeListener({ type: this._constants.timelineCommentsType });
    this.timelineCommentsObserver.unsubscribe();
  }
}
