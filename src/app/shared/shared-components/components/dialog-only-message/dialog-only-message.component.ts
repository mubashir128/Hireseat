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

  inputBox: boolean = false;
  inputText: string = "";
  btnsAre: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogOnlyMessageComponent,
    public dialogRef: MatDialogRef<DialogOnlyMessageComponent>
  ) {
    super(data, dialogRef);
    this.inputBox = this.data?.inputBox ? this.data?.inputBox : false;
    this.dialogText1 = this.data?.dialogText1;
    this.dialogText2 = this.data?.dialogText2;
    this.dialogText3 = this.data?.dialogText3;
    this.btnsAre = this.data?.btnsAre;
  }

  ngOnInit(): void {
  }

  getBtns(btnName){
    return this.btnsAre.includes(btnName) ? true : false;
  }

  save() {
    this.dialogRef.close({ inputText: this.inputText, save: true });
  }

}
