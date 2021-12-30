import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-dialog-add-members',
  templateUrl: './dialog-add-members.component.html',
  styleUrls: ['./dialog-add-members.component.css']
})
export class DialogAddMembersComponent extends AbstractDialogComponent implements OnInit {

  loggedInUser: any;
  groupChat: boolean;
  
  updateGrpMembers: any[];
  addNewGrpMembers: any[];

  public addGroupMembers: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAddMembersComponent, public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogAddMembersComponent>, 
    private formBuilder: FormBuilder){
      super(data, dialogRef);
      if(this.data){
        this.loggedInUser = this.data.loggedInUser;
        this.groupChat = this.data.groupChat;
        this.updateGrpMembers = this.data.updateGrpMembers;
        this.addNewGrpMembers = this.data.addNewGrpMembers;
      }
  }

  ngOnInit(): void {
    this.addGroupMembers = this.formBuilder.group({
    });
  }

  addNewGroupMember(id){
    if(this.addNewGrpMembers.indexOf(id) == -1){
      this.addNewGrpMembers.push(id);
      jQuery("#addNewGroup_" + id).css("display","none");
      jQuery("#removeNewGroup_" + id).css("display","block");
    }else{
      Materialize.toast("Already added...", 1000, "green");
    }
  }

  removeNewGroupMember(id){
    if(this.addNewGrpMembers.indexOf(id) !== -1){
      jQuery("#removeNewGroup_" + id).css("display","none");
      jQuery("#addNewGroup_" + id).css("display","block");
      this.addNewGrpMembers.forEach((member, index) => {
        if (member == ''+id) {
          this.addNewGrpMembers.splice(index, 1);
        }
      });
    }else{
      Materialize.toast("Not added...", 1000, "red");
    }
  }

  addMoreGroupMembers(){
    this.dialogRef.close({
      addNewGrpMembers : this.addNewGrpMembers
    });
  }
}
