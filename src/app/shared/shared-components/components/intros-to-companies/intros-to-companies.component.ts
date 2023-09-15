import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-intros-to-companies',
  templateUrl: './intros-to-companies.component.html',
  styleUrls: ['./intros-to-companies.component.css']
})
export class IntrosToCompaniesComponent implements OnInit {

  @Input() companiesUsresAre: any[] = [];
  @Output() gotoUserEM = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  gotoUser(userId){
    this.gotoUserEM.emit(userId);
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

}
