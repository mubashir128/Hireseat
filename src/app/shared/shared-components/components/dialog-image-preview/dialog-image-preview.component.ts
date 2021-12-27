import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-image-preview',
  templateUrl: './dialog-image-preview.component.html',
  styleUrls: ['./dialog-image-preview.component.css']
})
export class DialogImagePreviewComponent extends AbstractDialogComponent implements OnInit {

  imgUrl: string;
  fullName: string;
  showCreatedLogo: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogImagePreviewComponent, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogImagePreviewComponent>){
    super(data, dialogRef);
    if(this.data){
      this.imgUrl = this.data.imgUrl;
      this.fullName = this.data.fullName;
    }
  }

  ngOnInit(): void {
  }

  getImage(){
    this.showCreatedLogo = true;
  }

}
