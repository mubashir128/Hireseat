import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateCarrerService {
  schoolsAre;
  technicalMajorAre;
  degreeAre;
  titleAre;
  companiesAre;
  skillsAre;
  industriesAre;
  achievementAre;
  excludeWordsAre;

  constructor() { }

  async setSchools(schoolsAre){
    this.schoolsAre = schoolsAre;
  }

  getSchool(){
    return this.schoolsAre;
  }

  async setTechnicalMajor(techMajorAre){
    this.technicalMajorAre = techMajorAre;
  }

  getTechnocalMajor(){
    return this.technicalMajorAre
  }

  async setDegree(degreeAre){
    this.degreeAre = degreeAre;
  }

  getDegree(){
    return this.degreeAre;
  }

  async setTitle(titleAre){
    this.titleAre = titleAre;
  }

  getTitle(){
    return this.titleAre;
  }

  async setCompanies(companiesAre){
    this.companiesAre = companiesAre;
  }

  getCompanies(){
    return this.companiesAre;
  }

  async setLoopSkills(skillsAre){
    this.skillsAre = skillsAre;
  }

  getLoopSkills(){
    return this.skillsAre;
  }

  async setLoopIndustries(industriesAre){
    this.industriesAre = industriesAre;
  }

  getLoopIndustries(){
    return this.industriesAre;
  }

  async setLoopAchievement(achievementAre){
    this.achievementAre = achievementAre;
  }

  getLoopAchievement(){
    return this.achievementAre;
  }

  async setExcludeWords(excludeWordsAre){
    this.excludeWordsAre = excludeWordsAre;
  }

  getExcludeWords(){
    return this.excludeWordsAre;
  }

}
