
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
declare var Materialize: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  data: any;

  constructor(private _Userservice: UserService,) {
    this.data = [];
  }
  filename = 'SubscriberList' + Date.now();
  ngOnInit() {
  }
  Export() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Your title',
      useBom: true,
      noDownload: false,
      headers: ["_id", "Email", "date"],
      nullToEmptyString: true,
    };
    this._Userservice.getAllEmailCsv().subscribe((data) => {
      if (data) {
        this.data = data.result;

        if (this.data.length > 0) {
          new AngularCsv(this.data, this.filename, options);

        } else {
          Materialize.toast('No subscribers', 3000);

        }
      }


    })

  }
}
