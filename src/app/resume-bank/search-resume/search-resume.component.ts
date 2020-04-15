import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "src/app/_services/user.service";
import { Router } from "@angular/router";
import { ResumeService } from "src/app/_services/resume.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { fromEvent } from "rxjs";
import { map, filter, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-search-resume",
  templateUrl: "./search-resume.component.html",
  styleUrls: ["./search-resume.component.css"]
})
export class SearchResumeComponent implements OnInit {
  public chkLoggedInUser: any;
  public skillSets = [];
  public SearchFrm: FormGroup;
  public searchedResume: any = [];
  public p = 1;
  public itemsPerPageAre = 10;
  tags: any;
  id: any;
  searchTerm : string;
  minSearchTerm : number;
  maxSearchTerm : number;
  itemsArray : any[]=[1];
  createdAt = null;
  onLoad = false;
  paginateMove=false;
  @ViewChild('searchByName') searchByName: ElementRef;
  @ViewChild('searchByMinExperence') searchByMinExperence: ElementRef;
  @ViewChild('searchByMaxExperence') searchByMaxExperence: ElementRef;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private resumeService: ResumeService,
    private formBuilder: FormBuilder
  ) {
    this.SearchFrm = this.formBuilder.group({
      tags: ["", Validators.required],
      searchTerm : [""],
      minSearchTerm : [],
      maxSearchTerm : []
    });
  }

  get f() {
    return this.SearchFrm.controls;
  }

  ngOnInit() {
    jQuery(".modal").modal();
    this.chkLoggedInUser = this.userService.getUserData();
    if (this.chkLoggedInUser != "no") {
      if (this.chkLoggedInUser.userRole == "employer") {
        this.router.navigate(["employer/bidding-event-list"]);
      } else {
        this.getSkillsets();
      }
    }
    let obj={
      skillsets : null,
      itemsPerPageAre : this.itemsPerPageAre,
      createdAt : this.createdAt,
      searchType : "all",
      onLoad : true
    };
    this.getResumesBySkills(obj);
  }

  ngAfterViewInit() {
    // server-side search
    this.searchTermByName();
    this.searchTermByMinExperence();
    this.searchTermByMaxExperence();
  }

  searchTermByName(){
    fromEvent(this.searchByName.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.getResumesBySkills({
          searchTerm : this.SearchFrm.value.searchTerm,
          itemsPerPageAre : this.itemsPerPageAre,
          searchType : "name"
        });
        this.p=1;
        this.itemsArray=[1];
        this.createdAt=null;
        this.searchedResume=[];
      })
    )
    .subscribe();
  }

  searchTermByMinExperence(){
    fromEvent(this.searchByMinExperence.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.searchByExperiance();
        this.p=1;
        this.itemsArray=[1];
        this.createdAt=null;
        this.searchedResume=[];
      })
    )
    .subscribe();
  }

  searchTermByMaxExperence(){
    fromEvent(this.searchByMaxExperence.nativeElement,'keyup')
    .pipe(
      map(event=>event),
      filter(Boolean),
      debounceTime(1000),
      distinctUntilChanged(),
      tap((text) => {
        this.searchByExperiance();
        this.p=1;
        this.itemsArray=[1];
        this.createdAt=null;
        this.searchedResume=[];
      })
    )
    .subscribe();
  }

  getSkillsets() {
    this.resumeService.getSkillSets().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
        } else {
          this.skillSets = [];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onadd(event) {
    var skillSets = [];
    if (this.SearchFrm.valid) {
      this.SearchFrm.value.tags.forEach(element => {
        skillSets.push(element.value);
      });
    } else {
      skillSets = null;
    }

    this.getResumesBySkills({
      skillsets : skillSets,
      searchTerm : this.SearchFrm.value.searchTerm,
      itemsPerPageAre : this.itemsPerPageAre,
      searchType : "skills"
    });
    this.p=1;
    this.itemsArray=[1];
    this.createdAt=null;
    this.searchedResume=[];
  }
  getResumesBySkills(obj) {
    this.resumeService.getResumeBySkillSets(obj).subscribe(
      (data: any) => {
        if (data.result.length > 0) {
          this.searchedResume = [...this.searchedResume,...data.result];
          if(data.paginate){
            this.paginateMove=true;
          }else{
            this.paginateMove=false;
          }

          if(data.createAtIndex){
            this.createdAt=data.result[data.result.length-1].createdAt;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  showUploadModel(eventid) {
    this.id = eventid;
    jQuery("#Conformation").modal("open");
  }
  closed() {
    jQuery("#Conformation").modal("close");
  }
  addToResumeRepo() {
    this.resumeService.addToResumeRepo(this.id).subscribe(
      data => {
        //console.log(data.res);
        if (data.res == "exists") {
          Materialize.toast("Already Added !", 1000);
          jQuery("#Conformation").modal("close");
        } else if (data.res == "success") {
          for (let i = 0; i < this.searchedResume.length; i++) {
            if (this.searchedResume[i]._id == this.id) {
              this.searchedResume[i].status = "added";
            }
          }
          Materialize.toast("Added to resume repository !", 1000);
          jQuery("#Conformation").modal("close");
        } else {
          Materialize.toast("Something went wrong !", 1000);
          jQuery("#Conformation").modal("close");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  searchByExperiance(){
    let obj={
      min : this.SearchFrm.value.minSearchTerm,
      max : this.SearchFrm.value.maxSearchTerm,
      itemsPerPageAre : this.itemsPerPageAre,
      searchType : "experience"
    };
    this.createdAt=null;
    this.getResumesBySkills(obj);
  }

  handlePagination($event){
    this.p=$event;
    if(!this.paginateMove){
      return ;
    }
    if(this.itemsArray.indexOf($event) !== -1){
      return ;
    }
    this.itemsArray.push($event);
    let obj={
      itemsPerPageAre : this.itemsPerPageAre,
      createdAt : this.createdAt,
      searchType : "all"
    };
    this.createdAt=null;
    this.getResumesBySkills(obj);
  }

}
