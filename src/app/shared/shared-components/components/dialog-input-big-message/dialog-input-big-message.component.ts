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
  showLoadStatus: boolean = true;
  loadStatus = "Loading points... Please wait...";

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
    } else {
      this.showLoadStatus = false;
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
        this.getReasonsFromChatGPT(res.resumeDataIs);
      } else {
        this.clearLoader();
      }
    });
  }

  getReasonsFromChatGPT(data) {
    let prompt = "tell me 5 reasons why this candidate is a good fit for this job?";
    this._chatGptService.getChatGPTResponse(this.jobDescription + data, prompt).subscribe(res => {
      if (res?.choices[0]?.message?.content) {
        let responseText = res?.choices[0]?.message?.content;
        let result = this._chatGptService.convertChatGPTResponse(responseText);
        this.messageObject[0].text = result[0];
        this.messageObject[1].text = result[1];
        this.messageObject[2].text = result[2];
        this.messageObject[3].text = result[3];
        this.messageObject[4].text = result[4];
        this.clearLoader();
      } else {
        this.clearLoader();
      }
    });
  }

  clearLoader() {
    this.showLoadStatus = false;
    this.loadStatus = "";
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
