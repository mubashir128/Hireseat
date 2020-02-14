import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import{NgxTwitterTimelineModule,NgxTwitterTimelineComponent,NgxTwitterTimelineService} from 'ngx-twitter-timeline';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgxSpinnerService } from 'ngx-spinner';
import {BlogService} from '../../../_services/blog.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css'],

})
export class SinglePageComponent implements OnInit{
 urll:any
 singleBlogData:any;
 categoriesData:any
  relatedblogdata: any;
  blogcategoriesData: any;
  reletedpostcategory: any;
  currentUser: any;
  Name: any;
  Email: any;
 user:boolean = false;
  data: any;
  commentdata: any;



  
  array = []; 

  replay: boolean = false;
  index: any;
  commentReplay: any;
  replayData: any;
  showReplay:boolean = false;
  shareurl = location.href;
  url:string 
  postUrl: any;
  tagPostUrl: any;

  meetUpsData: any;
  colorsArray: any[] = ['#0aafff', '#3cb877', '#f26422', '#1a6efa','#1a6efa'];
  limit: any = 10;

  // post:[];
  constructor(private fb: FormBuilder,private _blogService:BlogService, private router:Router,private route:ActivatedRoute,private _sanitizer: DomSanitizer,private spinner: NgxSpinnerService, private _Userservice: UserService) { 
   
  }
  commentForm = this.fb.group({
    Name: ['', Validators.required],
    Email: ['', Validators.required],
    comment:['',Validators.required],
    date:Date.now()
  });
  replayForm = this.fb.group({
    commentName:this.replay,
    name: ['', Validators.required],
    email: ['', Validators.required],
    replay:['',Validators.required],
    date:Date.now()
  });

//fb



  ngOnInit() {
    this.spinner.show();
 
    this._Userservice.getmeetup().subscribe((data)=>{
     
      this.meetUpsData = data;
     
      
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    
    window['FB'] && window['FB'].XFBML.parse();

    this.url = this.route.snapshot.paramMap.get("url");
   
    this.route.params.subscribe(params=>{this.urll=params});
  
    this._blogService.getBlogCategories().subscribe((res)=>{
      this.categoriesData=res.data;
      
     
     
    },
    (error) =>console.log(error));
 
    this._blogService.getSinglePost(this.url).subscribe((res)=>{
      
      this.singleBlogData=res.data;
      
      this.reletedpostcategory = res.data.categories;
 
    let result = res.data.categories.map(a => a.catslug);
  
      this._blogService.getBlogByCategory(result,this.limit).subscribe((res)=>{
        this.array = res.data;
      })
   // video uplodad   
    
  
      
    
      
      this.spinner.hide();
    },
    (error)=>{
      console.log(error);
      this.spinner.hide();
    })
    
    
  }
  getPost(postUrl){
    this.spinner.show();

    this.router.navigate([`blog/${postUrl}`]).then(()=>window.location.reload());
    this.spinner.show();

  }
  getColors(index) {

    let num = this.getnumber(index);
    return this.colorsArray[num];
  }

  getnumber(data){

    let i = data;
    if(i > this.colorsArray.length-1){

       i = i - this.colorsArray.length;
       if(i < this.colorsArray.length){
        return i;
       }
       else {
        this.getnumber(i);
       }

    }
    else {
      return i;
    }


  }
 

  truncateHTML(text: string): string {

    let charlimit = 500;
    if(!text || text.length <= charlimit )
    {
        return text;
    }


  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let trim_space =  without_html.trim().replace(/&nbsp;/g, '');

  let shortened = trim_space.substring(0, charlimit) + "...";
  return shortened;
}
  toTop() {
    document.getElementById("commentDiv").scrollIntoView();
  }
  comment(){
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser!=undefined){
      this.commentForm.controls['Name'].setValue(this.currentUser.userInfo.fullName);
      this.commentForm.controls['Email'].setValue(this.currentUser.userInfo.email);
    }
   this._blogService.addComment({title:this.singleBlogData.title,comment:this.commentForm.value}).subscribe((res)=>{
      this._blogService.getSinglePost(this.urll.url).subscribe((res)=>{
       this.singleBlogData=res.data;
       this.reletedpostcategory = res.data.categories;
       this.commentForm.reset();

      },
      (error)=>{console.log(error)})
    });
  }

  Replay(name,i){
  
    this.index = i;
    this.replay = name;
    this.showReplay = !this.showReplay;
  }
  sendreplay(id){
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser!=undefined){
      this.replayForm.controls['name'].setValue(this.currentUser.userInfo.fullName);
      this.replayForm.controls['email'].setValue(this.currentUser.userInfo.email);
    }
    this._blogService.addReplay({id:id,replay:this.replayForm.value}).subscribe((res)=>{
      this._blogService.getSinglePost(this.urll.url).subscribe((res)=>{
        this.singleBlogData=res.data;
        this.reletedpostcategory = res.data.categories;
        this.showReplay = false;
       },
       (error)=>{console.log(error)})
    });
  }

loadData(url){
  this.spinner.show();

  this._blogService.getBlogByCategory(url,this.limit).subscribe((res)=>{
    this.blogcategoriesData=res.data;
    this.spinner.hide();

  },
  (error) =>{
    console.log(error)
    this.spinner.hide();

  })
}

getPostbyTag(tagValue,title){
  this.spinner.show();
   this.router.navigate([`blog/tags/${tagValue}`]);
   this.spinner.hide();


}

}
