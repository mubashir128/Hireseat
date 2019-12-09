
import { Component, OnInit,Input } from '@angular/core';
import { CeiboShare } from 'ng2-social-share';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.css'],
})
export class SocialShareComponent implements OnInit {
  public repoUrl:string;
  media: string;
  description: string;
  @Input() shareurl:string;
  
  public imageUrl = 'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';

  constructor() { }

  ngOnInit() {
    
    // this.repoUrl="https://hireseat.com/testing/blog/THE-BEAUTY-OF-NATURE-TRAVEL:-A-BLOG-ROUNDUP";
    this.repoUrl = this.shareurl;
    console.log(this.shareurl);
  }

}
