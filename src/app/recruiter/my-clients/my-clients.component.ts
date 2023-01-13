import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Resume, IResume } from '../../models/resume';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyClient } from 'src/app/models/myClient';
import { MyClientService } from 'src/app/_services/my-client.service';

declare var Materialize: any;
declare var jQuery: any;

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrls: ['./my-clients.component.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class MyClientsComponent implements OnInit {

  p = 1;
  clients: MyClient[];
  
  @ViewChild('searchByName') searchByName: ElementRef;
  @ViewChild('searchAll') searchAll: ElementRef;

  constructor(
    private router: Router,
    private _myClientService: MyClientService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    protected _dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getAllClients();
    jQuery('.modal').modal();
  }

  getAllClients() {
    this.spinner.show();
    this._myClientService.getClients().subscribe((data: MyClient[]) => {
      if (data.length > 0) {
        this.clients = data;
        this.spinner.hide();
      } else {
        this.spinner.hide();
      }
    }, (error) => {
        this.spinner.hide();
      });
  }

  handleToggleSign(obj) {
    if (obj.searchTab) {
      jQuery(".searchForm").css("display", "block");
    } else {
      jQuery(".searchForm").css("display", "none");
    }
  }

}
