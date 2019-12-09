
import { Component, OnInit,Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

// import { Angular2Csv } from 'angular2-csv/Angular2-csv';
// import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
 
})
export class SidebarComponent implements OnInit {
  data
  
  constructor(private _Userservice: UserService,) { }
filename ='SubscriberList'+Date.now();
  ngOnInit() {
  }
  Export(){
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
    this._Userservice.getAllEmailCsv().subscribe((data)=>{
      console.log(data);
       this.data = data.result;
      console.log(this.data);

    })
    new AngularCsv(this.data, this.filename, options);
  }
}
