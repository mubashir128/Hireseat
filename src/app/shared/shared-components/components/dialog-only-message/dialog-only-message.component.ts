import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-only-message',
  templateUrl: './dialog-only-message.component.html',
  styleUrls: ['./dialog-only-message.component.css']
})
export class DialogOnlyMessageComponent extends AbstractDialogComponent implements OnInit {

  dialogText1: string = "";
  dialogText2: string = "";
  dialogText3: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogOnlyMessageComponent,
    public dialogRef: MatDialogRef<DialogOnlyMessageComponent>
  ) {
    super(data, dialogRef);
    this.dialogText1 = this.data?.dialogText1;
    this.dialogText2 = this.data?.dialogText2;
    this.dialogText3 = this.data?.dialogText3;
  }

  ngOnInit(): void {
  }

}
