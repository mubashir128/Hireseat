import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-profile-example',
  templateUrl: './dialog-profile-example.component.html',
  styleUrls: ['./dialog-profile-example.component.css']
})
export class DialogProfileExampleComponent extends AbstractDialogComponent implements OnInit {

  imgUrl = "../../../../../assets/img/example_img.png";

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogProfileExampleComponent, public dialogRef: MatDialogRef<DialogProfileExampleComponent>){
    super(data, dialogRef);
    if(this.data){
      
    }
  }

  ngOnInit(): void {
  }

  closeExampleModal(){
    this.dialogRef.close();
  }

}
