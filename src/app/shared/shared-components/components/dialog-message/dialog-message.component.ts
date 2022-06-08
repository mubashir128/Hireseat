import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent extends AbstractDialogComponent implements OnInit {

  btns: Object;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogMessageComponent, public dialogRef: MatDialogRef<DialogMessageComponent>){
    super(data, dialogRef);
    if(this.data && this.data.btns){
      this.btns = this.data.btns;
    }
  }

  ngOnInit(): void {
  }

  accept(){
    this.dialogRef.close(true);
  }

  showBtn(boolBtn){
    return this.btns[boolBtn] ? true : false;
  }

  getBtnText(btnText){
    return this.btns[btnText] ? this.btns[btnText] : "";
  }
}