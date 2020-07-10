import { Component, OnInit, NgModule } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { BlogService } from "../../_services/blog.service";
import * as lib from "../../lib-functions";
import { of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap
} from "rxjs/operators";
//import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import { Router, ActivatedRoute } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
declare var CKEDITOR: any;

import { error } from "util";
declare var Materialize: any;
declare var $: any;
@Component({
  selector: "app-create-image-post",
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  templateUrl: "./create-image-post.component.html",
  styleUrls: ["./create-image-post.component.css"]
})
export class CreateImagePostComponent implements OnInit {
  permaLink: any;
  ckeConfig: any;
  addpost: FormGroup;
  filepath: any;
  imagePath: any;
  imgURL: any;
  message: any;
  skillSets: any;
  showAddCatg: boolean = false;
  addNewCateg: FormGroup;
  categoriesData = [];
  categories: FormGroup;
  blogUrl: any = "";
  showEditUrl: boolean = false;
  tags: any;
  createTags: any;
  tagsAutoData = [];
  tagsData: any = [];
  PostDescription: any = [];
  currentUserId: any;
  videoPath: any;
  videoURL: any;
  image: any;
  showAddvideo: boolean;
  showvideo: boolean;
  showcatbutton: boolean = true;
  tagsArray: any;
  public myckeditor = ClassicEditor;

  data: {
    title: any;
    blogUrl: any;
    blogDesciption: any;
    categories: any;
    tags: string;
    image: any;
    author: any;
  };
  imageURL: any;
  constructor(
    private formBuilder: FormBuilder,
    private blogServices: BlogService,
    private router: Router,
    location: Location
  ) {
    this.permaLink = window.location.href;
    // console.log(window.location.href);
    // console.log(location.path());
  }
  private addCheckboxes() {
    this.categoriesData.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.addpost.controls.categoriesData as FormArray).push(control);
    });
  }
  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true
    };
    this.blogServices.refreshNeeded$.subscribe(() => {
      this.getAllCategories();
    });

    this.getAllCategories();
    this.currentUserId = JSON.parse(
      localStorage.getItem("currentUser")
    ).userInfo._id;

    this.addpost = this.formBuilder.group({
      title: ["", [Validators.required]],
      postDescription: this.formBuilder.control("", [Validators.required]),
      categoriesData: new FormArray([], minSelectedCheckboxes(1)),
      tags: this.formBuilder.control("", [Validators.required]),
      file: this.formBuilder.control("", [Validators.required])
      // Video:this.formBuilder.control('',[Validators.required])
    });

    this.addNewCateg = this.formBuilder.group({
      categoryName: ["", [Validators.required]]
    });
  }
  get f() {
    return this.addpost.controls;
  }

  unmask(val) {
    return val.replace(/\s+/g, "-");
  }
  onchange(da) {
    // console.log(da)
    this.blogUrl = da.replace(/\s+/g, "-");
  }
  showeditUrl() {
    if (this.showEditUrl === false) {
      this.showEditUrl = true;
      // this.addpost.controls['editBlogUrl']=this.blogUrl;
    } else {
      this.showEditUrl = false;
    }
  }
  private getAllCategories() {
    this.blogServices.getBlogCategories().subscribe(
      res => {
        this.categoriesData = res.data;
        this.addCheckboxes();

        // console.log(this.categoriesData)
      },
      error => console.log(error)
    );
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
    const fd = new FormData();
    fd.append("file", this.filepath);
    this.blogServices.uploadFile(fd).subscribe(res => {
      if (res.message == "sucess") {
        this.imageURL = res.url;
      }
    });
  }

  /*show add new category diva on add new category clik :START*/
  showAddCatgory() {
    if (this.showAddCatg === false) {
      this.showAddCatg = true;
      this.showvideo = false;
    } else {
      this.showAddCatg = false;
      this.showvideo = false;
    }
  }

  Cancel() {
    this.showcatbutton = true;
    this.showAddCatg = false;
  }
  addNewCategory() {
    this.showcatbutton = false;

    let catName = this.addNewCateg.controls.categoryName.value;
    let catgSlug = catName.replace(/\s+/g, "-");
    this.addNewCateg.value["catslug"] = catgSlug;

    let data = this.addNewCateg.value;
    this.blogServices.addNewCateg(data).subscribe(
      res => {
        Materialize.toast(res.message, 1000);
      },

      error => {
        console.log(error);
      }
    );
  }
  /*show add new category diva on add new category clik :END*/
  onChange(event) {
    this.PostDescription;
  }

  eventHandler(tags) {
    this.tagsArray = tags;
  }
  getData() {
    // console.log($('.blogurlClass').html())
    const selectedOrderIds = this.addpost.value.categoriesData

      .map((v, i) => (v ? this.categoriesData[i] : null))
      .filter(v => v !== null);

    //  const fd=new FormData();

    //  fd.append('file',this.filepath,this.filepath.name);

    //  fd.append('title',this.addpost.controls.title.value);
    //  fd.append('blogUrl',$('.blogurlClass').html());
    //  fd.append('blogDesciption',this.addpost.controls.postDescription.value);

    //  fd.append('categories',selectedOrderIds);
    //  if(this.tagsArray){
    //    fd.append('tags', JSON.stringify(this.tagsArray));
    //  }

    //  fd.append('author',this.currentUserId);

    this.data = {
      title: this.addpost.controls.title.value,
      blogUrl: $(".blogurlClass").html(),
      blogDesciption: this.addpost.controls.postDescription.value,
      categories: selectedOrderIds,
      tags: JSON.stringify(this.tagsArray),
      image: this.imageURL,
      author: this.currentUserId
    };

    this.blogServices.addBlogPost(this.data).subscribe(
      res => {
        if (res) {
          Materialize.toast(res.message, 1000);
          this.router.navigate(["/blog-posts/all-post"]);
        }
      },
      error => console.log(error)
    );
  }

  // addTag(tag){
  //   // console.log(tag)
  //   tag.display =lib.trimSpaces(tag.display);
  //   tag.display = lib.titleCase(tag.display);
  //   if(lib.searchObjectArray(tag.value,this.tagsAutoData)){
  //     return;
  //   }
  //   this.tagsData.push(tag)
  //   this.blogServices.addNewTag(tag).subscribe((response)=>{
  //     if(response.result == 'success'){
  //       Materialize.toast('New tag added successfully !', 1000);
  //     }

  //   },(error)=>{
  //     console.log(error);
  //   })
  // }
  // removeTag(tag){
  //   if(lib.searchObjectArray(tag.value,this.tagsAutoData)){
  //     return;
  //   }
  //   this.blogServices.removeNewTag(tag).subscribe((response)=>{
  //     if(response.result == 'success'){
  //       Materialize.toast('New tag removed successfully !', 1000);
  //     }
  //   },(error)=>{
  //     console.log(error);
  //   })
  // }
}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
