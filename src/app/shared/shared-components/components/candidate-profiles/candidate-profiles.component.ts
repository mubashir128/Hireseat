import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-profiles',
  templateUrl: './candidate-profiles.component.html',
  styleUrls: ['./candidate-profiles.component.css']
})
export class CandidateProfilesComponent implements OnInit {

  itemsIs: number = 1;
  showAllShared: boolean = true;
  onlyRecruiterShared: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchPage(page){
    jQuery("#switch" + this.itemsIs).css("background-color", "#33aaff");
    this.itemsIs = page;
    jQuery("#switch" + page).css("background-color", "#27B1BD");

    if(this.itemsIs == 1){
      this.showAllShared = true;
      this.onlyRecruiterShared = false;
    }else{
      this.showAllShared = false;
      this.onlyRecruiterShared = true;
    }
  }

}
