import { Component, OnInit ,NgModule} from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormArray,FormControl,ValidatorFn} from '@angular/forms';
import {BlogService} from '../../_services/blog.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as lib from '../../lib-functions';
import { of } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';

declare var tinymce: any;


import { error } from 'util';
declare var Materialize: any;
declare var $: any;




@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  ckeConfig:any;
  addpost:FormGroup ;
  filepath:any;
  imagePath:any;
  imgURL:any;
  message:any;
  skillSets:any;
  showAddCatg:boolean=false;
  addNewCateg:FormGroup;
  categoriesData=[];
  categories:FormGroup;
  blogUrl:any='';
  showEditUrl:boolean=false
  tags: any;
  createTags:any;
  tagsAutoData=[];
 
  PostDescription:any=[];
  currentUserId:any
  videoPath: any;
  videoURL: any;
  showAddvideo: boolean;
  showvideo: boolean=false;
  emmded;
  local;
  options;
  showcatbutton:boolean=true;
  diplayvideo: any;
  showtag: boolean = false;
  tagsArray: any;
  video: FormGroup;
  data: {};
  uploadResponse = { status: '', message: ''};
  videouploading: boolean = false;
  youtubepattern: string;


  constructor(private formBuilder: FormBuilder,private blogServices:BlogService,private router:Router,) { 

   
  
  }

  private addCheckboxes() {
    this.categoriesData.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.addpost.controls.categoriesData as FormArray).push(control);
    });
  }


  ngOnInit() {

    
    
    this.video = this.formBuilder.group({
      videofile: this.formBuilder.control('',)
    });
     this.blogServices.refreshNeeded$.subscribe(()=>{
       this.getAllCategories();
     })
     
     this.getAllCategories();
     this.currentUserId=JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
     

this.youtubepattern = `^http:\/\/(?:www\.)?youtube.com\/watch\?(?=.*v=\w+)(?:\S+)?$`

    this.addpost=this.formBuilder.group({
      title: ['', [Validators.required]],
      postDescription: this.formBuilder.control('', [Validators.required]),
      categoriesData:new FormArray([], minSelectedCheckboxes(1)),
      tags: this.formBuilder.control('', [Validators.required]),
      // file: this.formBuilder.control('', [Validators.required]),
      Video:this.formBuilder.control('',[Validators.pattern(this.youtubepattern)]),
      videofile:this.formBuilder.control('',)
    })
   
    this.addNewCateg = this.formBuilder.group({
      categoryName:['', [Validators.required]]
      
    });

  }
  get f() { return this.addpost.controls; }

  unmask(val) {
    
    return val.replace(/\s+/g, '-');
  }
  onchange(blogurldata){
    this.blogUrl=blogurldata.replace(/\s+/g, '-');
  }
  showeditUrl(){
   
    if(this.showEditUrl===false){
    this.showEditUrl=true

    }else{
      this.showEditUrl=false
    }
}
  private getAllCategories(){
    this.blogServices.getBlogCategories().subscribe((res)=>{
      this.categoriesData=res.data
      this.addCheckboxes();

      // console.log(this.categoriesData)
    },
    (error) =>console.log(error))
  }
  
  

  previewvideo(event){

    if(!event.target.files[0]){
      return;
    } 
    this.videouploading = true;
    const fd=new FormData();
    fd.append('file',event.target.files[0]);
    this.blogServices.uploadFile(fd).subscribe((res)=>{
      this.uploadResponse = res;
     if(res.message == 'sucess' ){
      this.videoURL = res.url;
      this.videouploading = false;
    }
  });
 
    
  
  }
  onSubmit(){
  
  }
  /*show add new category diva on add new category clik :START*/
  showAddCatgory(){
    this.showAddCatg=true;
    this.showvideo=false;
    this.showcatbutton=false;
         
  }
  Cancel(){
    this.showcatbutton = true;
    this.showAddCatg = false;
  }
 

  getvideo(value){
    this.diplayvideo = value;
    // console.log(this.diplayvideo);
  }


  addNewCategory(){
    this.showcatbutton = false;
    // console.log(this.addNewCateg.value)
    let catName=this.addNewCateg.controls.categoryName.value;
    let catgSlug=catName.replace(/\s+/g, '-');
    this.addNewCateg.value['catslug']=catgSlug
    // console.log(this.addNewCateg.value)
    let data=this.addNewCateg.value;
    this.blogServices.addNewCateg(data).subscribe((res)=>{
      // console.log(res)
      Materialize.toast(res.message, 1000);
    },
    
    (error)=>{
      console.log(error)
    })
  }
    /*show add new category diva on add new category clik :END*/
    onChange(event){
      this.PostDescription;
      this.showcatbutton = true;
    }
    
    eventHandler(tags){
      this.tagsArray = tags;
      // console.log(this.tagsArray);
    }
  getData(){
   
    const selectedOrderIds = this.addpost.value.categoriesData
      .map((v, i) => v ? this.categoriesData[i].categoryName : null)
      .filter(v => v !== null);
 
   
     const fd=new FormData();

  
     
   
    this.data = {
      title:this.addpost.controls.title.value,
      blogUrl:$('.blogurlClass').html(),
      blogDesciption:this.addpost.controls.postDescription.value,
      categories:selectedOrderIds,
      tags:JSON.stringify(this.tagsArray),
      video:this.addpost.controls.Video.value,
      localvideolink:this.videoURL,
      author:this.currentUserId

    }
     this.blogServices.addBlogPost(this.data).subscribe((res)=>{
                //  console.log(res);

                 if(res){
                 Materialize.toast(res.message, 1000);
                 this.router.navigate(['/blog-posts/all-post']);
                 }
     },
     (error)=>console.log(error)
     )

  }
  showTagForm(){
    this.showtag = !this.showtag;
  }



  }
  function minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }


