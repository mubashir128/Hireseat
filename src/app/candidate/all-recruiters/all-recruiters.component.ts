import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/_services/candidate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-recruiters',
  templateUrl: './all-recruiters.component.html',
  styleUrls: ['./all-recruiters.component.css']
})
export class AllRecruitersComponent implements OnInit, OnDestroy {
  getAllPostRecruiterSubscription: Subscription;
  recruiters: any;
  constructor(
    private candidateService: CandidateService
  ) { }

  ngOnInit() {
    this.candidateService.getAllPostRecruiters().subscribe(res => {
      if (res) {
        console.log(res);
        this.recruiters = res;
      }
    });
  }
  ngOnDestroy() {
    if (this.getAllPostRecruiterSubscription) {
      this.getAllPostRecruiterSubscription.unsubscribe();
    }
  }
}
