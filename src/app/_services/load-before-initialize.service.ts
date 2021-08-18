import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import * as myGlobals from '../globalPath';
import { CandidateCarrerService } from './candidate-carrer.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class LoadBeforeInitializeService {
  public baseurl: any;
  constructor(private _http: HttpClient,
    private _constantsService : ConstantsService,
    private _candidateCarrer : CandidateCarrerService,
  ){
    this.baseurl = myGlobals.baseUrl;
  }

  async load() {
    return new Promise((resolve, reject) => {
      this._http.get(this.baseurl + "api/getDataAllBeforeLoad").pipe(
        map((res: any) => {
          return res;
        }))
        .subscribe(async res => {
          await this._constantsService.setVariables(res.constantsAre);

          await this._candidateCarrer.setSchools(res.schoolsAre);
          await this._candidateCarrer.setTechnicalMajor(res.techMajorAre);

          await this._candidateCarrer.setDegree(res.degreeAre);
          await this._candidateCarrer.setTitle(res.titleAre);
          await this._candidateCarrer.setCompanies(res.companiesAre);
          await this._candidateCarrer.setLoopSkills(res.skillsAre);

          await this._candidateCarrer.setLoopIndustries(res.industriesAre);
          await this._candidateCarrer.setLoopAchievement(res.achievementAre);

          await this._candidateCarrer.setExcludeWords(res.excludeWordsAre);

          resolve(true);
        }, (err) => {
          console.log("---- ",err);
        });
    });
}

}
