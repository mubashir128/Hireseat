import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as myGlobals from "../globalPath";
import { IResume, Resume } from "../models/resume";
import { IResumeBank } from "../models/resumebank";

@Injectable({
  providedIn: "root",
})
export class ResumeService {
  public baseurl: any;
  constructor(private http: HttpClient) {
    this.baseurl = myGlobals.baseUrl;
  }

  uploadResume(info) {
    return this.http.post<any>(this.baseurl + "api/uploadResume", info).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  uploadResumeInBank(info) {
    return this.http
      .post<any>(this.baseurl + "api/uploadResumeInBank", info)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  createResume(info: IResume) {
    return this.http
      .post<IResume>(this.baseurl + "api/createResume", info)
      .pipe(
        map((res: IResume) => {
          return res;
        })
      );
  }

  addToResumeBank(info: IResumeBank) {
    return this.http
      .post<IResumeBank>(this.baseurl + "api/addToResumeBank", info)
      .pipe(
        map((res: IResumeBank) => {
          return res;
        })
      );
  }

  getAllResume() {
    return this.http.get<IResume[]>(this.baseurl + "api/getAllResume").pipe(
      map((res: IResume[]) => {
        return res;
      })
    );
  }
  getEmployerAddedResumes() {
    return this.http
      .get<IResume[]>(this.baseurl + "api/getEmployersResume")
      .pipe(
        map((res: IResume[]) => {
          return res;
        })
      );
  }
  // get all hired candidates against employer id
  getSpecificHiredCandidates() {
    return this.http
      .get<any>(this.baseurl + "api/getSpecificHiredCandidates")
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getsuggestedresume(info: any) {
    return this.http
      .get<IResume>(this.baseurl + "api/getsuggestedresume/" + info)
      .pipe(
        map((res: IResume) => {
          return res;
        })
      );
  }
  updateResume(info: IResume) {
    return this.http.put<IResume>(this.baseurl + "api/updateResume", info).pipe(
      map((res: IResume) => {
        return res;
      })
    );
  }
  updateResumeBankBidStatus(info: IResume) {
    return this.http
      .put<IResume>(this.baseurl + "api/updateResumeBankBidStatus", info)
      .pipe(
        map((res: IResume) => {
          return res;
        })
      );
  }

  removeResume(info: any, type: string) {
    return this.http
      .delete<any>(
        this.baseurl + "api/removeResume/" + "?id=" + info + "&type=" + type
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getResumeById(info: any) {
    return this.http
      .get<IResume>(this.baseurl + "api/getResumeById/" + info)
      .pipe(
        map((res: IResume) => {
          return res;
        })
      );
  }

  getSkillSets() {
    return this.http.get<any>(this.baseurl + "api/getSkillSets").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getResumeSkillsets() {
    return this.http.get<any>(this.baseurl + "api/getResumeSkillsets").pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getResumeCandidates(obj) {
    return this.http
      .post<any>(this.baseurl + "api/getResumeCandidates", obj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getResumeBySkillSets(obj) {
    return this.http
      .post<any>(this.baseurl + "api/getResumeBySkillSets", obj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  addToResumeRepo(resumebank_id) {
    return this.http
      .post<any>(this.baseurl + "api/addToResumeRepo", {
        resumebank_id: resumebank_id,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Here updateing skillset by adding new tag
  addNewTag(tag) {
    return this.http.post<any>(this.baseurl + "api/add-new-tag", tag).pipe(
      map((result: any) => {
        return result;
      })
    );
  }
  
  // Here updateing industries by adding new industry
  addNewExpIndustries(industry) {
    return this.http.post<any>(this.baseurl + "api/add-new-experience-industry", industry).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  // Here remove tag when user removes he added task
  removeNewTag(tag) {
    return this.http.post<any>(this.baseurl + "api/remove-new-tag", tag).pipe(
      map((result: any) => {
        return result;
      })
    );
  }
  getMyWaitingList() {
    return this.http
      .get<any>(this.baseurl + "api/get-my-waiting-candidates")
      .pipe(map((result: any) => result));
  }
  changeCandidateStatus(payload) {
    return this.http
      .post<any>(this.baseurl + "api/change-candidate-status", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
  // get-all-shared-candidate-profile
  getAllSharedCandidateProfile(payload) {
    return this.http
      .post<any>(this.baseurl + "api/get-all-shared-candidate-profile", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getSearchBySkills(payload) {
    return this.http
      .post<any>(this.baseurl + "api/getSearchBySkills", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getCandidateSearchBySkills(payload) {
    return this.http
      .post<any>(this.baseurl + "api/getCandidateSearchBySkills", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getMultiSearchBySkills(payload) {
    return this.http
      .post<any>(this.baseurl + "api/getMultiSearchBySkills", payload)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  postMyNote(payload) {
    return this.http.post<any>(this.baseurl + "api/post-my-note", payload);
  }

  /**
   * post my comment for recruiter
   */
  postMyComment(payload) {
    return this.http.post<any>(this.baseurl + "api/post-comment", payload);
  }
  postRecruiterComment(payload) {
    return this.http.post<any>(this.baseurl + "api/post-Recruiter-Comment", payload);
  }
  editComment(payload) {
    return this.http.post<any>(this.baseurl + "api/edit-comment", payload);
  }
  editRecruiterComment(payload) {
    return this.http.post<any>(this.baseurl + "api/edit-recruiter-comment", payload);
  }
  deleteComment(payload) {
    return this.http.post<any>(this.baseurl + "api/delete-comment", payload);
  }
  likeComment(payload) {
    return this.http.post<any>(this.baseurl + "api/like-comment", payload);
  }
  likeRecruiterComment(payload) {
    return this.http.post<any>(this.baseurl + "api/like-recruiter-comment", payload);
  }
  replyToComment(payload) {
    return this.http.post<any>(
      this.baseurl + "api/post-reply-comment",
      payload
    );
  }
  replyCandidateToComment(payload) {
    return this.http.post<any>(
      this.baseurl + "api/post-candidate-reply",
      payload
    );
  }
}
