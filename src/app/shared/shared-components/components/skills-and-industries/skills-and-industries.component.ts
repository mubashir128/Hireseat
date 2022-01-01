import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skills-and-industries',
  templateUrl: './skills-and-industries.component.html',
  styleUrls: ['./skills-and-industries.component.css']
})
export class SkillsAndIndustriesComponent implements OnInit {

  title: string = "Skills";
  @Input() resume: any;

  skillsShow = false;
  skillsClass = "fas fa-long-arrow-alt-down";

  constructor() { }

  ngOnInit(): void {
  }

  upDownSkills() {
    this.skillsShow = this.skillsShow ? false : true;
    this.skillsClass = this.skillsShow ? "fas fa-long-arrow-alt-up" : "fas fa-long-arrow-alt-down";
  }
}
