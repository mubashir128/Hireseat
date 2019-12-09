
import { Component, OnInit,Input } from '@angular/core';
import {BlogService} from '../../_services/blog.service'
import { FormGroup , FormBuilder, Validator, Validators } from '@angular/forms';
declare var $:any;
declare var Materialize:any;
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  catSearchForm:FormGroup;
  catEditForm:FormGroup;
  categoriesData:any;
  deleteID:any;
  protected dataService: CompleterData;
  category = {categoryName: '',_id:''};
  constructor(
    private _blogservice:BlogService,
    private formBuilder:FormBuilder,
    private completerService: CompleterService
    ) { }

  ngOnInit() {
    $('.modal').modal();
   /*  $('select').material_select(); */
   this.createCatSearchForm();
   this.createcatEditForm();
   this.getAllCategories();

  }
  getAllCategories(){
    this._blogservice.getBlogCategories().subscribe(
      (res)=>{ this.categoriesData=res.data
  this.dataService = this.completerService.local(res.data, 'categoryName', 'categoryName');

      },
      (error) =>console.log(error))
  }

  searchCategories(){
    // if(this.catSearchForm.invalid){
    //   return;
    // }
     this._blogservice.searchByCategory(this.catSearchForm.value).subscribe((response)=>{
      this.categoriesData = response;
    },(error)=>{
      console.log(error);
      this.ngOnInit();
    }) 
  }
  createCatSearchForm(){
    this.catSearchForm = this.formBuilder.group({
      categoryName:['',[Validators.required]]
    })
  }
  createcatEditForm(){
    this.catEditForm = this.formBuilder.group({
      categoryName:[null,[Validators.required]]
    })
  }

  resetCategories(){
    if(this.catSearchForm.value.categoryName == '' ){
      this.getAllCategories();
    }
  }

  confirmDelete(id){
    this.deleteID = id;
    $('#deleteConfirm').modal('open');
  }

  deleteCategory(){
    this._blogservice.removeCategory(this.deleteID).subscribe((response)=>{
     this.ngOnInit();
     this.deleteID = '';
     Materialize.toast('Category Deleted successfully',1000,'rounded');
    },(error)=>{
      console.log(error);
    })
  }
  closePopup(){
    $('#deleteConfirm').modal('close');
    $('#editCategory').modal('close');
  }
  loadCategory(category){
    $('#editCategory').modal('open');
    document.getElementById("catname").focus();
    this.category.categoryName = category.categoryName;
    this.category._id = category._id;
  }

  editCategory(){
    this.catEditForm.value._id = this.category._id;
    this.catEditForm.value.catslug =  this.catEditForm.value.categoryName.replace(/\s+/g, '-');
    this._blogservice.editCategory(this.catEditForm.value).subscribe((response)=>{
      this.getAllCategories();
      $('#editCategory').modal('close');
      Materialize.toast('Category Updated successfully',1000,'rounded');
    },(error)=>{
      console.log(error);
    })
  }

}
