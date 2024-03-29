import { Component, OnInit } from "@angular/core";
import { BlogService } from "../../_services/blog.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CompleterService, CompleterData } from "ng2-completer";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

declare var $: any;
declare var Materialize: any;

@Component({
  selector: "app-all-post",
  templateUrl: "./all-post.component.html",
  styleUrls: ["./all-post.component.css"]
})
export class AllPostComponent implements OnInit {
  blogPostData: any;
  deleteID: any;
  blogSearchForm: FormGroup;
  dataService: CompleterData;
  catArray: any[] = [];
  limit: any = 100;
  searchCatagory: any;
  blogPostDataLength: any;
  constructor(
    private _blogservice: BlogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private completerService: CompleterService
  ) {
    this.blogSearchForm = this.formBuilder.group({
      category: ["", Validators.required]
    });
  }

  ngOnInit() {
    $(".modal").modal();

    this.getAllBlogs(this.limit);
    this.createBlogSearchForm();
    // form value subscription
    // debouncing
    // this.blogSearchForm
    //   .get("category")
    //   .valueChanges.pipe(debounceTime(2000), distinctUntilChanged())
    //   .subscribe(res => {
    //     this.seachBlog(res);
    //     console.log(res);
    //   });
  }

  getAllBlogs(limit) {
    this._blogservice.getBlogCategories().subscribe((res) => {
      this.catArray = res.data;

      this.dataService = this.completerService.local(
        this.catArray,
        "catslug",
        "catslug"
      );
    });
    this._blogservice.getAllBlogPost(limit).subscribe(
      (res) => {
        this.blogPostData = res.data;
        console.log(this.blogPostData.length);
        this.blogPostDataLength = this.blogPostData.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createBlogSearchForm() {
    this.blogSearchForm = this.formBuilder.group({
      category: ["", Validators.required]
    });
  }

  confirmDelete(id) {
    this.deleteID = id;
    $("#deleteConfirm").modal("open");
  }
  closePopup() {
    $("#deleteConfirm").modal("close");
  }

  removeBlog() {
    this._blogservice.deleteBlog(this.deleteID).subscribe(
      (response) => {
        if (response.result == "success") {
          Materialize.toast("Blog Deleted successfully", 1000, "rounded");
        } else {
          Materialize.toast("blog not found", 1000, "rounded");
        }
        this.getAllBlogs(this.limit);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  seachBlog(text) {
    this.limit = 10;

    let temp: any = [];
    if (this.blogSearchForm.value.category == "") {
      this.getAllBlogs(this.limit);
    }
    temp = this.blogSearchForm.value.category.split(",");
    this._blogservice.getBlogByCategory(temp, this.limit).subscribe(
      response => {
        this.blogPostData = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  editPost(id) {
    this.router.navigate(["/blog-posts/edit-post", id]);
  }
}
