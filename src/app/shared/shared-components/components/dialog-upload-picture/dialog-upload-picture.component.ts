import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-dialog-upload-picture',
  templateUrl: './dialog-upload-picture.component.html',
  styleUrls: ['./dialog-upload-picture.component.css']
})
export class DialogUploadPictureComponent extends AbstractDialogComponent implements OnInit {

  public updateProfileimg: FormGroup;
  message: string;

  imgURL: any;
  filepath: File;
  imagePath: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogUploadPictureComponent, public dialog: MatDialog, 
    public dialogRef: MatDialogRef<DialogUploadPictureComponent>, 
    private formBuilder: FormBuilder){
      super(data, dialogRef);
      if(this.data){
        this.imgURL = this.data.imgURL;
        this.filepath = this.data.filepath;
        this.imagePath = this.data.imagePath;
      }
  }

  ngOnInit(): void {
    this.updateProfileimg = this.formBuilder.group({
      file: ["", Validators.compose([Validators.required])],
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

  updateProfilePicture(){
    this.dialogRef.close({
      filepath : this.filepath,
      imagePath : this.imagePath
    });
  }

}
