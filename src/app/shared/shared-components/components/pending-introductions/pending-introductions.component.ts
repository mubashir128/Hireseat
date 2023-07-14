import { Component, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/_services/constants.service';
import { IntroduceService } from 'src/app/_services/introduce.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-pending-introductions',
  templateUrl: './pending-introductions.component.html',
  styleUrls: ['./pending-introductions.component.css']
})
export class PendingIntroductionsComponent implements OnInit {
  pendingIntroductions: any[] = [];
  loggedUser: any;

  showLoader: boolean = true;

  constructor(
    protected _userService: UserService,
    protected _introduceService: IntroduceService,
    protected _constants: ConstantsService,
  ) {
    this.loggedUser = this._userService.getUserData();
  }

  ngOnInit(): void {
    this.getIntroduce();
  }

  getIntroduce() {
    this._introduceService.getIntroduce().subscribe((res) => {
      this.showLoader = false;
      this.pendingIntroductions = res;
    }, (err) => {
      console.log(err);
    });
  }

  getType(entry) {
    return (this.loggedUser._id == entry?.toId?._id) ? this._constants.toIdAccept : this._constants.introduceIdAccept;
  }

  getAcceptCheck(entry) {
    let type = this.getType(entry);
    return !entry[type];
  }

  accept(entry) {
    let type = this.getType(entry);
    let payload = {
      type: type,
      _id: entry._id
    };
    this._introduceService.updateStatus(payload).subscribe((res) => {
      entry[type] = true;
    }, (err) => {
      console.log(err);
    });
  }

  open(link) {
    window.open(link, "_blank");

  }

  onLinkedIn(user) {
    this._userService.getUserDetails({ receiverId: user._id }).subscribe((res: any) => {
      let link = res?.data?.candidate_id?.linkedIn;
      console.log(link)
      if (link.includes("https")) {
        this.open(link);

      } else {
        this.open("https://" + link)

      }
    });
  }
}
