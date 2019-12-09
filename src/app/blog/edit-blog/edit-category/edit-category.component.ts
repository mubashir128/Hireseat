import { Component, OnInit, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { FormGroup, Validators , FormBuilder, FormControl } from '@angular/forms'
import {EditBlogComponent} from '../edit-blog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery: any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit , AfterViewInit {
  Categories:any;
  addNewCategForm:FormGroup;
  showAddCat:Boolean;
  @Output() categoriseArray: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  @Input() categorise: string[];
  checkbox: any;
  cat: any;

  catArray: any[] = [];
  catslug: any;
  constructor(
    private blogServeice: BlogService,
    private formBuilder: FormBuilder,
    private router:Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.createaddNewCategForm();
    this.categorise = this.categorise;
  
  
  }
  
  ngAfterViewInit() {
   
      this.categorise = this.categorise;
      this.categoriseArray.emit(this.categorise);
      this.categoriseArray.emit(this.categorise);
      this.blogServeice.getBlogCategories().subscribe((response)=>{
      
       this.Categories = response.data;
       this.Categories.forEach(cat => {
       this.catArray.push({_id:cat._id,categoryName:cat.categoryName,catslug:cat.catslug,selected:false});
       });
       
       this.getselected(this.catArray, this.categorise);
      
     
     },(error)=>{
       console.log(error);
     })
      this.spinner.hide();
    
  }
  getCategories(){
   
 

  }
 
getselected(catarray,selectedarray){
  var found =false;
  var cat = 0;
    for(let select of selectedarray){

      while(cat < catarray.length){
        if(select == catarray[cat].catslug ){
    
             found = true;
             break;
         }
        cat++;
        
      }
    
      if(found){
        var index = this.catArray.findIndex(x => x.catslug === select);
        this.catArray[index].selected = true;
      }
      
    }


}
  createaddNewCategForm(){
    this.addNewCategForm = this.formBuilder.group({
      categoryName:['',Validators.required]
    });
  }
  showAddCatForm(){
    this.showAddCat = true;
  }
  cancelCategory(){
    this.showAddCat = false;
  }
  addNewCategory(){
    if(this.addNewCategForm.invalid){
      return
    }
    this.addNewCategForm.value.catslug =  this.addNewCategForm.value.categoryName.replace(/\s+/g, '-');
    this.blogServeice.addNewCateg(this.addNewCategForm.value).subscribe((response)=>{
  
      this.categoriseArray.emit(this.addNewCategForm.value);
      window.location.reload();
 

    },(error)=>{
      console.log(error);
    })
  }
  
 getCheckedCat(event){
  let value = event.target.value;
  if(event.target.checked == true){
    
    this.categorise.push(value);
    this.categoriseArray.emit(this.categorise);
  }else if(event.target.checked == false){

   var index = this.categorise.indexOf(value);
   if (index > -1) {
    this.categorise.splice(index, 1);
    this.categoriseArray.emit(this.categorise);
  }

  }
  this.categoriseArray.emit(this.categorise);
  }

 

}
