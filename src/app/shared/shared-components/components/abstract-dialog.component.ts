import { MatDialogRef } from "@angular/material/dialog";

export abstract class AbstractDialogComponent{
  
  dialogType: string;
  dialogTitle: string;
  
  constructor(public dialogRef: MatDialogRef<AbstractDialogComponent>) {
  }
 
  closeScreen(event){
    this.dialogRef.close(false);
  }
}