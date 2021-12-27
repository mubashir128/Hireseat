import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-dialog-group-members',
  templateUrl: './dialog-group-members.component.html',
  styleUrls: ['./dialog-group-members.component.css']
})
export class DialogGroupMembersComponent extends AbstractDialogComponent implements OnInit {

  user: any;

  groupChat: boolean;
  groupMessages: any
  
  loggedInUser: any;

  addGrpMembers = [];

  public updateGroupMembers: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogGroupMembersComponent, public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogGroupMembersComponent>, 
    private formBuilder: FormBuilder){
      super(data, dialogRef);
      if(this.data){
        this.user = this.data.user;
        this.groupChat = this.data.groupChat;
        this.groupMessages = this.data.groupMessages;
        this.loggedInUser = this.data.loggedInUser;
        this.addGrpMembers = this.data.addGrpMembers;
      }
  }

  ngOnInit(): void {
    this.updateGroupMembers = this.formBuilder.group({
    });
  }

  addMember(id){
    if(this.addGrpMembers.indexOf(id) == -1){
      jQuery("#add_" + id).css("display","none");
      jQuery("#remove_" + id).css("display","block");
      this.addGrpMembers.push(id);
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  removeMember(id){
    if(this.addGrpMembers.indexOf(id) !== -1){
      jQuery("#remove_" + id).css("display","none");
      jQuery("#add_" + id).css("display","block");
      this.addGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addGrpMembers.splice(index, 1);
        }
      });
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
  }

  updateMembers(){
    this.dialogRef.close({
      addGrpMembers : this.addGrpMembers
    });
  }

}
