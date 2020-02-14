
import { Component, OnInit,Input } from '@angular/core';
import {BlogService} from '../../../_services/blog.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-all-blog-tag',
  templateUrl: './all-blog-tag.component.html',
  styleUrls: ['./all-blog-tag.component.css'],
 

})
export class AllBlogTagComponent implements OnInit {
  blogPOstData:any;
  categoriesData:any
  relatedblogdata: any;

  blogcategoriesData: any;
  
  colorsArray: any[] = ['#0aafff', '#3cb877', '#f26422', '#1a6efa','#1a6efa'];
  tagValue: string;
  blogTagData: any;
  limit = 10;
  meetUpsData: any;
  viewmore: boolean;
 
  constructor(private _blogservice:BlogService,private route: ActivatedRoute,private _sanitizer: DomSanitizer,private _Userservice: UserService) { }

  ngOnInit() {
    this.tagValue = this.route.snapshot.paramMap.get("url");
    this._blogservice.getBlogCategories().subscribe((res)=>{
      this.categoriesData=res.data
  
    },
    (error) =>console.log(error))
     this._blogservice.getTagPost(this.tagValue,this.limit).subscribe((res)=>{
    this.blogTagData = res.data;
    if(this.blogTagData.length%9 == 0 && this.blogTagData.length>0){
      this.viewmore = true;
    }else{
      this.viewmore = false;
   }
   }) 
  this._Userservice.getmeetup().subscribe((data)=>{
      
    this.meetUpsData = data;
    
  })
  }
  pageCount(){
    return this.blogTagData.length;
    
   }
  getMoreData(){
    var limit = this.pageCount()+10;
    this._blogservice.getTagPost(this.tagValue,limit).subscribe((res)=>{
      this.blogTagData=res.data
      if(this.blogTagData.length%9 == 0 && this.blogTagData.length>0){
        this.viewmore = true;
      }else{
        this.viewmore = false;
     }
   
    },
    (error) =>{
      console.log(error)

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
  loadData(url){
    var array = url.split(",");
    this._blogservice.getBlogByCategory(array,this.limit).subscribe((res)=>{
      this.blogcategoriesData=res.data
     
    },
    (error) =>console.log(error))
  }


}
