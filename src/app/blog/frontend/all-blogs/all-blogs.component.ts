
import { Component, OnInit,Input, ChangeDetectorRef  } from '@angular/core';
import {BlogService} from '../../../_services/blog.service'
//import { BlogService } from '../../../_services/blog.service';
import { DomSanitizer, SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/_services/user.service';

declare var jQuery: any;

declare var $: any;
@Component({
 
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css'],

})
export class AllBlogsComponent implements OnInit {
  blogPOstData:any;
  categoriesData:any
  relatedblogdata: any;

  
  url: any;
  meetUpsData: any;
  colorsArray: any[] = ['#0aafff', '#3cb877', '#f26422', '#1a6efa','#1a6efa'];
  limit = 9;
  viewmore: boolean;

  constructor(private _blogservice:BlogService,private _Userservice: UserService,private _sanitizer: DomSanitizer,private spinner :NgxSpinnerService) { }

  ngOnInit() {

    this._Userservice.getmeetup().subscribe((data)=>{
      
      this.meetUpsData = data;
      
    })
    jQuery('.modal').modal();
    this.spinner.show();
    this._blogservice.getAllBlogPost(this.limit).subscribe((res)=>{
      this.blogPOstData=res.data;
      if(this.blogPOstData.length%9 == 0 && this.blogPOstData.length>0){
        this.viewmore = true;
     }else{
       this.viewmore = false;
     }
  },
    (error) =>{
      console.log(error)
      this.spinner.hide();

    })

    this._blogservice.getBlogCategories().subscribe((res)=>{
      this.categoriesData=res.data
      this.spinner.hide();
    },
    (error) =>
    {
      console.log(error)
      this.spinner.hide();

    })

   
  }
  pageCount(){
   return this.blogPOstData.length;
   
  }

  getMoreData(){
    var limit = this.pageCount()+9;
    this._blogservice.getAllBlogPost(limit).subscribe((res)=>{
      this.blogPOstData=res.data
    
      if(this.blogPOstData.length%9 == 0 && this.blogPOstData.length>0){
        this.viewmore = true;
     }else{
       this.viewmore = false;
     }
   
    },
    (error) =>{
      console.log(error)
      this.spinner.hide();

    })
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

  


  
  }


