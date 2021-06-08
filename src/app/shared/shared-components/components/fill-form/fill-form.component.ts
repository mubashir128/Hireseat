import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from 'src/app/_services/resume.service';

@Component({
  selector: 'app-fill-form',
  templateUrl: './fill-form.component.html',
  styleUrls: ['./fill-form.component.css']
})
export class FillFormComponent implements OnInit {

  public skillSets = [];
  public SearchFrm: FormGroup;

  constructor(private formBuilder: FormBuilder, private resumeService: ResumeService) {
    this.SearchFrm = this.formBuilder.group({
      tags : ["", Validators.required],
      tagsAre : ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSkillsets();
  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe((data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
        } else {
          this.skillSets = [];
        }
      }, error => {
        console.log(error);
      });
  }

}
