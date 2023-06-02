import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractDialogComponent } from '../abstract-dialog.component';
import { eTypes } from 'src/app/_services/post-job.service';
import { CandidateService } from 'src/app/_services/candidate.service';
import { ChatGptService } from 'src/app/_services/chat-gpt.service';

@Component({
  selector: 'app-dialog-input-big-message',
  templateUrl: './dialog-input-big-message.component.html',
  styleUrls: ['./dialog-input-big-message.component.css']
})
export class DialogInputBigMessageComponent extends AbstractDialogComponent implements OnInit {

  btns: any[] = [];

  type: eTypes;
  userId: any;
  jobDescription: string = "";

  messageObject = [
    {
      id: 1,
      value: false,
      text: ""
    },
    {
      id: 2,
      value: false,
      text: ""
    },
    {
      id: 3,
      value: false,
      text: ""
    }
  ];

  checkedNumber = 0;
  limitNumber = 3;
  checkBoxesIs: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInputBigMessageComponent,
    public dialogRef: MatDialogRef<DialogInputBigMessageComponent>,
    private _candidateService: CandidateService,
    private _chatGptService: ChatGptService
  ) {
    super(data, dialogRef);
    this.btns = this?.data?.btns;
    this.type = this?.data?.type;
    this.userId = this?.data?.userId;
    this.jobDescription = this?.data?.jobDescription;
    if (this.type == eTypes.apply) {
      if (this.userId) {
        this.getProfile();
      }
      this.messageObject.push({ id: 4, value: false, text: "" });
      this.messageObject.push({ id: 5, value: false, text: "" });
      this.messageObject.push({ id: 6, value: false, text: "" });
      this.messageObject.push({ id: 7, value: false, text: "" });
      this.messageObject.push({ id: 8, value: false, text: "" });
    } else {
    }

    if (this.type == eTypes.refer) {
      this.checkBoxesIs = false;
    }
  }

  ngOnInit(): void {
  }

  changeValue(event, item) {
    item.value = event.checked;
    if (event.checked) {
      this.checkedNumber++;
    } else {
      this.checkedNumber--;
    }
  }

  getProfile() {
    this._candidateService.getCandidateProfile().subscribe((res) => {
      if (res) {
        this.setReasons(res);
      }
    });
  }

  setReasons(data) {
    this.messageObject[0].text = data.accomplishment1 !== '' ? data.accomplishment1 : '';
    this.messageObject[1].text = data.accomplishment2 !== '' ? data.accomplishment2 : '';
    this.messageObject[2].text = data.accomplishment3 !== '' ? data.accomplishment3 : '';
    this.messageObject[3].text = data.accomplishment4 !== '' ? data.accomplishment4 : '';
    this.messageObject[4].text = data.accomplishment5 !== '' ? data.accomplishment5 : '';
    this.messageObject[5].text = data.comments !== '' ? data.comments : '';
    this.messageObject[6].text = data.comment2 !== '' ? data.comment2 : '';
    this.messageObject[7].text = data.comment3 !== '' ? data.comment3 : '';
  }

  apply() {
    let finalSelection = [];
    for (let item of this.messageObject) {
      if (item.value || this.type == eTypes.refer) {
        finalSelection.push(item.text);
      }
    }
    this.dialogRef.close({ message1: finalSelection[0], message2: finalSelection[1], message3: finalSelection[2], status: true });
  }

  getBtn(btnName) {
    return this.btns.includes(btnName) ? true : false;
  }

}
