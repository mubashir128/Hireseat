import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import * as lib from 'src/app/lib-functions';
import {BlogService} from 'src/app/_services/blog.service'
declare var Materialize: any;
@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

  tagForm:FormGroup;
  tagList:any[] = [];
  @Input() tagArrayData;
  @Output() tagListArray: EventEmitter<string[]> = new EventEmitter<string[]>();
  constructor(
    private formBuilder:FormBuilder,
    private blogService:BlogService
  ) { }

  ngOnInit() {
    this.createTagForms();
    this.tagList = this.tagArrayData;
  }
  createTagForms(){
    this.tagForm = this.formBuilder.group({
      tag:['',Validators]
    })
  }
  addTag(tag){
    // this.tagList.push(event)
  
    tag.display =lib.trimSpaces(tag.value);
    tag.display = lib.titleCase(tag.value);
    
    // if(lib.searchObjectArray(tag.value)){
    //   return;
    // }
    this.blogService.addNewTag(tag).subscribe((response)=>{
      if(response.result == 'success'){
        Materialize.toast('New tag added successfully !', 1000);
      }  
     
    },(error)=>{
      console.log(error);
    })
    // console.log(this.tagList);
    this.tagListArray.emit(this.tagList);
  }
  removeTag(tag){
    // console.log(tag);
    // if(lib.searchObjectArray(tag,this.tagsAutoData)){
    //   return;
    // }
    this.blogService.removeNewTag(tag).subscribe((response)=>{
      if(response.result == 'success'){
        Materialize.toast('New tag removed successfully !', 1000);
    
        
      }  
    },(error)=>{
      console.log(error);
    })
    this.tagListArray.emit(this.tagList);
    // console.log(this.tagList);
  }
  tagsAutoData(tag: any, tagsAutoData: any) {
    throw new Error("Method not implemented.");
  }

}
