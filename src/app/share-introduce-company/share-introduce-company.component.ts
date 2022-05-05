import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-share-introduce-company',
  templateUrl: './share-introduce-company.component.html',
  styleUrls: ['./share-introduce-company.component.css']
})
export class ShareIntroduceCompanyComponent implements OnInit {

  companyId;
  suggestIntro;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected _userService: UserService
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.paramMap.get('companyId');
    this.shareClick();
  }

  shareClick(){
    this._userService.getPostJob(null, true, null, this.companyId).subscribe((data)=>{
      if(Array.isArray(data.result)){
        this.suggestIntro = data.result;
      }
    });
  }

  changeLogo(notify){
    notify.showCreatedLogo = true;
  }

}
