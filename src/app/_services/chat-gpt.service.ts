import { Injectable } from "@angular/core";
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";
import { AbstractService } from "./abstract.service";
import { ConstantsService } from "./constants.service";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  baseurl: any;
  chatGptKey: any;
  chatGptUrl: string = "https://api.openai.com/v1/chat/completions";

  private httpClient: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    private _abstractService: AbstractService,
    private _constantsService: ConstantsService
  ) {
    this.baseurl = myGlobals.baseUrl;
    this.httpClient = new HttpClient(httpBackend);
    this.chatGptKey = this._constantsService.chatGptKey;
  }

  getChatGPTResponse(data, prompt) {
    let payload = {
      messages: [
        { role: "assistant", content: data },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
      model: this._constantsService.chatGptVersion
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.chatGptKey}`
    });

    return this.httpClient.post<any>(
      this.chatGptUrl,
      payload,
      { headers }
    );
  }

  convertChatGPTResponse(responseText) {
    if(responseText.indexOf(":\n\n") !== -1){
      responseText = responseText?.split(":\n\n")[1];
    }
    
    const chatResponse = responseText?.split("\n\n");
    let result = [];
    let index = 1;
    for (let text of chatResponse) {
      let finalText = text?.replace(index + ". ", "");
      result.push(finalText);
      index++;
    }
    return result;
  }
}
