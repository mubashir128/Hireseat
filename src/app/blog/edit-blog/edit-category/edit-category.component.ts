import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { BlogService } from "src/app/_services/blog.service";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { EditBlogComponent } from "../edit-blog.component";
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { findIndex } from "rxjs/operators";
import * as $ from "jquery";
declare var jQuery: any;
@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"]
})
export class EditCategoryComponent implements OnInit, AfterViewInit {
  Categories: any;
  addNewCategForm: FormGroup;
  showAddCat: Boolean;
  @Output() categoriseArray: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();

  @Input() categorise: string[];
  checkbox: any;
  cat: any;

  catArray: any[] = [];
  catslug: any;
  constructor(
    private blogServeice: BlogService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.createaddNewCategForm();
    this.categorise = this.categorise;
  }

  ngAfterViewInit() {
    this.categorise = this.categorise;
    console.log(this.categorise);
    this.categoriseArray.emit(this.categorise);
    this.categoriseArray.emit(this.categorise);
    this.blogServeice.getBlogCategories().subscribe(
      response => {
        this.Categories = response.data;
        console.log(this.Categories);
        this.Categories.forEach(cat => {
          this.catArray.push({
            _id: cat._id,
            categoryName: cat.categoryName,
            colorCode: cat.colorCode,
            catslug: cat.catslug,
            selected: false
          });
        });

        this.getselected(this.catArray, this.categorise);
      },
      error => {
        console.log(error);
      }
    );
    this.spinner.hide();
  }
  getCategories() {}

  getselected(catarray, selectedarray) {
    var found = false;
    var cat = 0;
    for (let select of selectedarray) {
      while (cat < catarray.length) {
        if (select.catslug == catarray[cat].catslug) {
          found = true;
          break;
        }
        cat++;
      }

      if (found) {
        var index = this.catArray.findIndex(x => x.catslug === select.catslug);
        this.catArray[index].selected = true;
      }
    }
  }
  createaddNewCategForm() {
    this.addNewCategForm = this.formBuilder.group({
      categoryName: ["", Validators.required]
    });
  }
  showAddCatForm() {
    this.showAddCat = true;
  }
  cancelCategory() {
    this.showAddCat = false;
  }
  addNewCategory() {
    if (this.addNewCategForm.invalid) {
      return;
    }
    this.addNewCategForm.value.catslug = this.addNewCategForm.value.categoryName.replace(
      /\s+/g,
      "-"
    );
    this.blogServeice.addNewCateg(this.addNewCategForm.value).subscribe(
      response => {
        console.log("response after adding a new catagory", response);
        this.catArray.push({
          _id: response.data._id,
          categoryName: response.data.categoryName,
          colorCode: response.data.colorCode,
          catslug: response.data.catslug,
          selected: false
        });
        console.log("catagory new array", this.catArray);

        this.categoriseArray.emit(this.addNewCategForm.value);
        this.addNewCategForm.get("categoryName").patchValue("");
        this.showAddCat = false;
        // added category at last place so scrolling is imp to show the user
        $(document).ready(function() {
          $("#scrollCat").animate(
            {
              scrollTop: $("#scrollCat").get(0).scrollHeight
            },
            1500
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getCheckedCat(category, event) {
    let value = event.target.value;

    // console.log("get checked category----", category);
    // console.log("checked or not", event.target.checked);

    if (event.target.checked === true) {
      this.categorise.push(category);
      this.categoriseArray.emit(this.categorise);
    } else if (event.target.checked === false) {
      console.log("after deselect", category);

      for (let i = 0; i < this.categorise.length; i++) {
        if (this.categorise[i]["_id"] === category["_id"]) {
          console.log("found", category, i);
          this.categorise.splice(i, 1);
        }
      }
      this.categoriseArray.emit(this.categorise);
    }
    this.categoriseArray.emit(this.categorise);
  }
}
