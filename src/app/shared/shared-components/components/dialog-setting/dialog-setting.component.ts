import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-setting',
  templateUrl: './dialog-setting.component.html',
  styleUrls: ['./dialog-setting.component.css']
})
export class DialogSettingComponent extends AbstractDialogComponent implements OnInit {

  settingLists: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogSettingComponent, public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogSettingComponent>){
      super(data, dialogRef);
      if(this.data){
        this.settingLists = this.data.settingLists;
      }
  }

  ngOnInit(): void {
  }

  openListsModals(id){
    this.dialogRef.close({
      id : id
    });
  }

}
