
import { Component, OnInit,Input } from '@angular/core';
import {BlogService} from '../../../_services/blog.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/_services/user.service';
import { literal } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-all-blog-categories',
  templateUrl: './all-blog-categories.component.html',
  styleUrls: ['./all-blog-categories.component.css'],
  
})
export class AllBlogCategoriesComponent implements OnInit {
  blogPOstData:any;
  categoriesData:any
  relatedblogdata: any;
  url: any;
  blogcategoriesData: any;
  myurl: string;
  meetUpsData: any;
  limit = 9;
  colorsArray: any[] = ['#0aafff', '#3cb877', '#f26422', '#1a6efa','#1a6efa'];
  viewmore: boolean;

  constructor(private _blogservice:BlogService,private _Userservice: UserService,private route: ActivatedRoute,private _sanitizer: DomSanitizer,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this._Userservice.getmeetup().subscribe((data)=>{
      
      this.meetUpsData = data;
     
      
    })
    this.url = this.route.snapshot.paramMap.get("url");
    this._blogservice.getBlogCategories().subscribe((res)=>{
      this.categoriesData=res.data;
      
    },
    (error) =>console.log(error))

  //  this.myurl = this.url.replace(/[^a-zA-Z ]/g, " ");
  //  var array = this.url.replace(/[^a-zA-Z ]/g, " ").split(",");
       var array = this.url.split(",");

    this._blogservice.getBlogByCategory(array,this.limit).subscribe((res)=>{
      this.blogcategoriesData=res.data;
     
      if(this.blogcategoriesData.length%9 == 0 && this.blogcategoriesData.length>0){
        this.viewmore = true;
     }else{
       this.viewmore = false;
     }
   
      this.spinner.hide();
      
    },
    (error) =>{
      console.log(error);
      this.spinner.hide();
    })
  }
  dataLength(){
    return this.blogcategoriesData.length;
    
   }
 
   getMoreData(){
   
     var limit = this.dataLength()+9;
     var isarray = Array.isArray(this.url);
 
     if(isarray){
      var array = this.url.toString().split(",");
    
    }else{
      array = this.url;
    }
     this._blogservice.getBlogByCategory(array,limit).subscribe((res)=>{
       this.blogcategoriesData=res.data
       if(this.blogcategoriesData.length%9 == 0 && this.blogcategoriesData.length>0){
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
 
  loadData(url){
    this.spinner.show();

    
    var array = url.split(",");
    // console.log(array);
    this._blogservice.getBlogByCategory(array,this.limit).subscribe((res)=>{
      this.blogcategoriesData=res.data;
      if(this.blogcategoriesData.length%9 == 0 && this.blogcategoriesData.length>0){
        this.viewmore = true;
      }else{
        this.viewmore = false;
     }
      this.url = url;
      this.spinner.hide();

    },
    (error) =>{
      console.log(error)
      this.spinner.hide();

    })
  }
  

  

}
