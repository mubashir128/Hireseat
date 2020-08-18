import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { SuperAdminService } from '../_services/super-admin.service';
import { ForumService } from '../_services/forum.service';
import { BiddingEventService } from 'src/app/_services/bidding-event.service';
import { EnterpriseService } from '../_services/enterprise.service';

import { WebsocketService } from '../_services/websocket.service';
import { Subject } from 'rxjs';
import { PushNotificationService } from '../_services/push-notification.service';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class NavbarComponent implements OnInit {
  path: any = 'assets/img/navbar-logo.png';
  loggedInUser: any;
  isLoggedIn: boolean = false;
  isEmployer: boolean = false;
  isRecruiter: boolean = false;
  isAdmin: boolean = false;
  isSuperAdmin: boolean = false;
  isEnterprise: boolean = false;
  isCandidate: boolean = false;
  status: boolean = false;
  public show: boolean = false;
  public buttonName: any = 'Show';
  url: any;
  questDataLenght: any = [];
  suggestedQueData: any;
  suggestedQueCount: number = 0;
  suggestedQueAnsCount: number = 0;
  notificationLength: any = 0;
  showAdminDashboardButton: boolean = false;
  showEnterpriseDashboardButton: boolean = false;
  permaLink: any;
  candidate = false;

  notificationObserver = new Subject();
  notificationObserver$ = this.notificationObserver.asObservable();

  getAllNotifications = 'getAllNotifications';
  newNotification = 'newNotification';
  limit = 15;
  createdAt;
  selector: string = '.scrollNotification';

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    public supperAdmin: SuperAdminService,
    private route: ActivatedRoute,
    private _forum: ForumService,
    private bidEventService: BiddingEventService,
    private _socket: WebsocketService,
    private _eref: ElementRef,
    public enterpriseService: EnterpriseService,
    private _pushNotify: PushNotificationService
  ) {
    this.permaLink = window.location.href;
    this.loggedInUser = this.userService.getUserData();
    if (this.loggedInUser != 'no') {
      this.isLoggedIn = true;
      if (this.loggedInUser.userRole == 'employer') {
        this.isEmployer = true;
        this._pushNotify.pushNotification();
      } else if (this.loggedInUser.userRole == 'recruiter') {
        this.isRecruiter = true;
        this._pushNotify.pushNotification();
      } else if (this.loggedInUser.userRole == 'admin') {
        this.isAdmin = true;
      } else if (this.loggedInUser.userRole == 'super-admin') {
        this.isSuperAdmin = true;
      } else if (this.loggedInUser.userRole == 'enterprise') {
        this.isEnterprise = true;
      } else if (this.loggedInUser.userRole == 'candidate') {
        this.isCandidate = true;
      }
    }
    router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        // hiding notification while changes in route
        this.show = false;
        this.buttonName = 'Hide';

        if (val.url === '/video-call') {
          // console.log('On video call');
          if (!localStorage.getItem('currentUser')) {
            // console.log('****there is no user show candidates window');
            this.candidate = true;
          } else {
            // console.log('recruiter on video call');
            this.candidate = false;
          }
        }
      }
    });
  }

  async ngOnInit() {
    this.showAdminDashboardButton = false;
    this.showEnterpriseDashboardButton = false;

    let obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj !== null) {
      await this.initSocket(obj.token, obj.userInfo.userRole);
    }

    await this._socket.removeListener({ type: 1 });
    this._socket.addListener({
      type: 1,
      callback: this.notificationObserver
    });

    this.notificationObserver$.subscribe((res: any) => {
      this.handleNotificationData(res);
    });

    this._socket.sendMessage({
      type: 1,
      data: {
        subType: this.getAllNotifications,
        onLoad: true,
        limit: this.limit
      }
    });

    if (this.loggedInUser.userRole == 'employer') {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
      this._forum
        .getAllUnAnsQuestionsByEmployerId(this.loggedInUser._id)
        .subscribe((data) => {
          this.suggestedQueData = data;
          this.suggestedQueData.forEach((element) => {
            if (element.QueAnsStaus == 1) {
              this.suggestedQueCount++;
            }
          });
        });
    } else if (this.loggedInUser.userRole == 'recruiter') {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
      this._forum
        .getAllUnreadAnsQueByRecruiteId(this.loggedInUser._id)
        .subscribe((data) => {
          this.suggestedQueData = data;
          this.suggestedQueData.forEach((element) => {
            if (element.QueAnsStaus == 2) {
              this.suggestedQueAnsCount++;
            }
          });
        });
    } else if (this.loggedInUser.userRole == 'super-admin') {
      this.showAdminDashboardButton = true;
      this.showEnterpriseDashboardButton = false;
    } else if (this.loggedInUser.userRole == 'enterprise') {
      this.showEnterpriseDashboardButton = true;
      this.showAdminDashboardButton = false;
    } else {
      this.showAdminDashboardButton = false;
      this.showEnterpriseDashboardButton = false;
    }

    jQuery(document).ready(function () {
      jQuery('.button-collapse').sideNav();
    });
    this.show = false;
    this.buttonName = 'Hide';
  }

  async initSocket(token, userRole) {
    await this._socket.getInstance(token, userRole);
  }

  truncateHTML(text: string): string {
    let charlimit = 20;
    if (!text || text.length <= charlimit) {
      return text;
    }

    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let trim_space = without_html.trim().replace(/&nbsp;/g, '');
    let shortened = trim_space.substring(0, charlimit) + '...';
    return shortened;
  }

  handleNotificationData(res: any) {
    switch (res.subType) {
      case this.getAllNotifications:
        // add all notifications to list.
        if (res.data.length !== 0) {
          this.questDataLenght = [...this.questDataLenght, ...res.data];
          this.createdAt = this.questDataLenght[this.questDataLenght.length - 1].createdAt;
          this.notificationLength = res.count ? res.count : this.notificationLength;
        }
        break;
      case this.newNotification:
        //add notification to start of list.
        this.questDataLenght.unshift(res.result);
        this.incrementNotificationCount();
        break;
      default:
        break;
    }
  }

  incrementNotificationCount() {
    this.notificationLength += 1;
  }

  updateQueAns(id) {
    this._forum.updateQueAnsReadStatus(id).subscribe((data) => {
    })
  }

  navigate(path) {
    jQuery('.button-collapse').sideNav('hide');
    jQuery('body').css({ overflow: '', width: '' });
    jQuery('#sidenav-overlay').css('opacity', '0');
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.isAdmin = false;
    this.isLoggedIn = false;
    this._socket.socketClosed();
  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) this.buttonName = 'Hide';
    else this.buttonName = 'Show';
  }
  onClick(event) {
    // console.log('clicked ');

    if (!this._eref.nativeElement.contains(event.target)) {
      // or some similar check
      this.show = false;
    }
    this.buttonName = 'Hide';
  }

  onScroll() {
    this._socket.sendMessage({
      type: 1,
      data: {
        subType: this.getAllNotifications,
        createdAt: this.createdAt,
        limit: this.limit
      }
    });
  }

  getToQuestion(id) {
    this.router.navigate(['/question-details/', id]);
  }

}
