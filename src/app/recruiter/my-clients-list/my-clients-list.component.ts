import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MyClient } from 'src/app/models/myClient';
import { UserService } from 'src/app/_services/user.service';

declare var jQuery;
declare var $: any;
declare var Materialize;

@Component({
  selector: 'app-my-clients-list',
  templateUrl: './my-clients-list.component.html',
  styleUrls: ['./my-clients-list.component.css']
})
export class MyClientsListComponent implements OnInit {
  @Input() client: MyClient;
  @Output() selectedForEdit = new EventEmitter(false);
  @Output() selectedForDelete = new EventEmitter(false);
  loggedUser: any;

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.loggedUser = this.userService.getUserData();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    jQuery(".modal").modal();
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
