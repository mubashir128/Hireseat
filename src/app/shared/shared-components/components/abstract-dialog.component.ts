import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export class uploadFile{
	constructor(public name: string, public file: any, public  type: FileType,public size: number, public data: any){}
}

export enum FileType {
	image = 'image',
}

export abstract class AbstractDialogComponent{
  
  dialogType: string;
  dialogTitle: string;
  dialogText: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: AbstractDialogComponent, public dialogRef: MatDialogRef<AbstractDialogComponent>) {
    this.dialogType = this.data.dialogType;
    this.dialogTitle = this.data.dialogTitle;
    this.dialogText = this.data.dialogText;
  }
 
  closeScreen(event){
    this.dialogRef.close(false);
  }

  getImage(obj){
    obj.showCreatedLogo = true;
  }
}