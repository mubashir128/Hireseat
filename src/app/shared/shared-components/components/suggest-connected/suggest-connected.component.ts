import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ConstantsService } from 'src/app/_services/constants.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-suggest-connected',
  templateUrl: './suggest-connected.component.html',
  styleUrls: ['./suggest-connected.component.css']
})
export class SuggestConnectedComponent implements OnInit {
  intros: boolean = true;
  pendingIntros: boolean = false;
  itemsIs = 0;

  constructor() {}

  ngOnInit(): void {
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 0){
      this.intros = true;
      this.pendingIntros = false;
    }else if(this.itemsIs == 1){
      this.intros = false;
      this.pendingIntros = true;
    }
  }

}
