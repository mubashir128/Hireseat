import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-dialog-create-group',
  templateUrl: './dialog-create-group.component.html',
  styleUrls: ['./dialog-create-group.component.css']
})
export class DialogCreateGroupComponent extends AbstractDialogComponent implements OnInit {

  loggedInUser: any;

  chatUsers: any[] = [];
  showAddedUserAre: any[] = [];
  addGrpMembers : any[] = [];

  searchTermByNameMember: string;

  groupName: string;

  imgURL: any;
  message: string;
  filepath: File;
  imagePath: any;

  public updateProfileimg: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogCreateGroupComponent, public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>, 
    public _userService : UserService, 
    private formBuilder: FormBuilder){
      super(data, dialogRef);
      if(this.data){
        this.loggedInUser = this.data.loggedInUser;
        this.chatUsers = this.data.chatUsers;
        this.showAddedUserAre = this.data.showAddedUserAre;
        this.addGrpMembers = this.data.addGrpMembers;
        this.imgURL = this.data.imgURL;
        this.groupName = this.data.groupName;

        this.message = this.data.message;
        this.filepath = this.data.filepath;
        this.imagePath = this.data.imagePath;
      }
  }

  ngOnInit(): void {
    this.updateProfileimg = this.formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
    });

    this.getAllUsers();
    this.setMember();
  }

  setMember(){
    this.showAddedUserAre.forEach((member)=>{
      jQuery("#add_" + member._id).css("display","none");
      jQuery("#remove_" + member._id).css("display","block");
    });
  }

  addMember(user){
    let id = user._id;
    if(this.addGrpMembers.indexOf(id) == -1){
      this.addGrpMembers.push(id);
      this.showAddedUserAre.push(user);
      Materialize.toast("Added...", 700, "green");
    }else{
      Materialize.toast("Already added...", 1000, "red");
    }
    jQuery("#add_" + id).css("display","none");
    jQuery("#remove_" + id).css("display","block");
  }

  removeMember(user){
    let id = user._id;
    if(this.addGrpMembers.indexOf(id) !== -1){
      this.addGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addGrpMembers.splice(index, 1);
          Materialize.toast("Removed...", 700, "red");
        }
      });
      this.showAddedUserAre.forEach((member, index) => {
        if (member._id == ''+id) {
          this.showAddedUserAre.splice(index, 1);
        }
      });
      jQuery("#remove_" + id).css("display","none");
      jQuery("#add_" + id).css("display","block");
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
  }

  createAndAddGroup(){
    if(this.groupName.trim() == ""){
      Materialize.toast("Please enter group name...", 1000, "red");
      return ;
    }
    
    this.dialogRef.close({
      groupName : this.groupName,
      addGrpMembers : this.addGrpMembers,
      filepath : this.filepath,
      imagePath : this.imagePath,
    });
  }

  getAllUsers(){
    this._userService.getAllRelatedUsers({userRole : this.loggedInUser.userRole}).subscribe(res=>{
      this.chatUsers = res;
    });
  }

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      Materialize.toast(this.message, 1000, "red");
      return;
    }
    this.filepath = <File>files[0];

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
