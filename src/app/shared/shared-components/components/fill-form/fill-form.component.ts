import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsetsService } from 'src/app/_services/skillsets.service';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class FillFormComponent implements OnInit {

  public skillSets = [];
  public SearchFrm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _skillSets: SkillsetsService) {
    this.SearchFrm = this.formBuilder.group({
      tags: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.skillSets = this._skillSets.getSkillSets();
    console.log("this.skillSets : ",this.skillSets);
  }

  getSkillsets(){
    
  }

}
