import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { BlogService } from '../../_services/blog.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  editBlogForm:FormGroup;
 
  showEmmbedded:Boolean;
  message:any;
  id: string;
  postData: any;
  imgURL: any;
  showFileForm: boolean = false;
  img: any;
  changefile: boolean = true;
  filepath: File;
  imagePath: any;
  categories: any;
  isvideo: Boolean = false;
  diplayvideo: any;
  isimage:Boolean = true;
  tagListArray: any;
  tagList: any;
  tagsArray: any;
  Video: any;
  ischangeVideo: Boolean = false;
  showVideo:Boolean = true;
  safeurl: any;
  isembbedded: boolean = false;
  showcatbutton: boolean;
  addNewCateg: any;
  blogUrl:any='';
  video: any;
  categoriesData: any;
  currentUserId: any;
  showAddCatg: boolean;
  videoPath: File;
  selectedOrderIds: any[];
  embedded: any;
  imageURL: any;
  uploadResponse = { status: '', message: ''};
  data: { title: any; blogUrl: any; blogDesciption: any; categories: any; tags: string; embedded: any;id:any;image:any; localvideolink: any; author: any; };
  videoUrl: any;
  videouploading: boolean = false;
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private _blogservice:BlogService,
    private route:ActivatedRoute,
    private _sanitizer:DomSanitizer
  ) { }
 
  // private addCheckboxes() {
  //   this.categoriesData.map((o, i) => {
  //     const control = new FormControl(i === 0); // if first item set to true, else false
  //     (this.editBlogForm.controls.categoriesData as FormArray).push(control);
  //   });
  // }
  ngOnInit() {
    this.creatEditBlogForm();
    this.id = this.route.snapshot.paramMap.get("blogID");
      this._blogservice.getPostById(this.id).subscribe((res)=>{
      this.postData = res.data;
      this.imgURL = this.postData.featuredImage;
      this.blogUrl = this.postData.blogurl;
      this.video = this.postData.video;
      this.categories = this.postData.categories;
      this.eventHandler(this.postData.tags);
     
     this._blogservice.refreshNeeded$.subscribe(()=>{
      // this.getAllCategories();
    })
    
    // this.getAllCategories();
    this.currentUserId=JSON.parse(localStorage.getItem('currentUser')).userInfo._id;
      if(this.postData.video || this.postData.embbedded)
      {
              this.isvideo = true;
              this.isimage = false;

            if(this.postData.embbedded && this.postData.embbedded!= 'null') 
            {
              this.isembbedded = true;
              this.safeURL(this.postData.embbedded);
              this.editBlogForm.get('Video').setValue(this.postData.embbedded);
            }else{
              this.videoUrl = this.video;
            }

      }else{
        this.isvideo = false;
        this.isimage = true;

      }
      

      this.editBlogForm.patchValue(this.postData);
    })
  }
  
  eventHandler(tags){
    this.tagsArray = tags;
    // console.log(this.tagsArray);
  }
  categoryevent(cat){
    this.selectedOrderIds = cat;
  }
  
  getvideo(value){
    this.diplayvideo = value;
    // console.log(this.diplayvideo);
  }
  changeVideo(){
    this.ischangeVideo = true;
    this.showVideo = false;
  }
  onchange(blogurldata){
    this.blogUrl=blogurldata.replace(/\s+/g, '-');
  }
  showAddCatgory(){
    this.showAddCatg=true;

    this.showcatbutton=false;
         
  }
  Cancel(){
    this.showcatbutton = true;
    this.showAddCatg = false;
  }
  
  creatEditBlogForm(){

    this.editBlogForm = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required],
      categoriesData:new FormArray([], minSelectedCheckboxes(1)),
      file:[''],
      embbedded:[''],
      Video:[''],
      // postDescription:['',Validators.required],
      // videoLink:[''],
      videoFile:[''],

    })
    this.addNewCateg = this.formBuilder.group({
      categoryName:['', [Validators.required]]
      
    });
  

  }
  get f() { return this.editBlogForm.controls; }

  unmask(val) {
    
    return val.replace(/\s+/g, '-');
  }
  previewvideo(event) {
   
    let files = event.target.files;
   
    if(files.length == 0){
      return
    } 
    this.videouploading= true;
    this.videoPath=<File>files[0];
    const fd=new FormData();
    fd.append('file',this.videoPath);
    this._blogservice.uploadFile(fd).subscribe((res)=>{ 
      this.uploadResponse = res;
      if(res.message == 'sucess' ){
      this.videoUrl = res.url;
      this.editBlogForm.get('Video').setValue(undefined);
      this.videouploading= false;

    }
  });
 }
 safeURL(url){
  if(url!=undefined){
    url = url.replace('watch?v=','embed/');
     this.safeurl =  this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}
  cancelFile(){
    this.changefile = true;
    this.showFileForm = false;
    this.imgURL = this.postData.featuredImage;

  }
cancleVideo(){
  this.ischangeVideo = false;
  this.showVideo = true;
  if(this.isembbedded){
    this.embedded = this.postData.embbedded;
    this.editBlogForm.get('Video').setValue(this.embedded);

    this.safeURL(this.embedded);

  }else if(!this.isembbedded){
    this.video = this.postData.video;
    this.videoUrl = this.video;
  }
}
  changeFile(){
    this.changefile = false;
    this.showFileForm =!this.showFileForm
  }

  
  preview(files) {

    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath=<File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    const fd=new FormData();
    fd.append('file',this.filepath);
    this._blogservice.uploadFile(fd).subscribe((res)=>{
    if(res.message == 'sucess' ){
      this.imageURL = res.url;
    }
  });
}

getData(){

  
if(this.editBlogForm.controls.Video.value){
  this.videoUrl = undefined;
}
  this.data = {
    id:this.id,
    title:this.editBlogForm.controls.title.value,
    blogUrl:$('.blogurlClass').html(),
    blogDesciption:this.editBlogForm.controls.description.value,
    categories:this.selectedOrderIds,
    tags:JSON.stringify(this.tagsArray),
    image:this.imageURL,
    embedded:this.editBlogForm.controls.Video.value,
    localvideolink:this.videoUrl,
    author:this.currentUserId
 }

   this._blogservice.editBlogPost(this.data).subscribe((res)=>{
     if(res){
     Materialize.toast(res.message, 1000);
    this.router.navigate(['/blog-posts/all-post']);

  
     }
},
(error)=>console.log(error)
)

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
