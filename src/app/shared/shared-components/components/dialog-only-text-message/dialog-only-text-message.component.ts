import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';

@Component({
  selector: 'app-dialog-only-text-message',
  templateUrl: './dialog-only-text-message.component.html',
  styleUrls: ['./dialog-only-text-message.component.css']
})
export class DialogOnlyTextMessageComponent extends AbstractDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOnlyTextMessageComponent, public dialogRef: MatDialogRef<DialogOnlyTextMessageComponent>) {
    super(data, dialogRef);
  }

  ngOnInit(): void {
  }

}
