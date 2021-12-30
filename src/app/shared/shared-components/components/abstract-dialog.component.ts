import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export abstract class AbstractDialogComponent{
  
  dialogType: string;
  dialogTitle: string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: AbstractDialogComponent, public dialogRef: MatDialogRef<AbstractDialogComponent>) {
    this.dialogType = this.data.dialogType;
    this.dialogTitle = this.data.dialogTitle;
  }
 
  closeScreen(event){
    this.dialogRef.close(false);
  }

  getImage(obj){
    obj.showCreatedLogo = true;
  }
}