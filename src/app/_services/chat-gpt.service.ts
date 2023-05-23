import { Injectable } from "@angular/core";
import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";

import * as myGlobals from "../globalPath";
import { map } from "rxjs/operators";
import { AbstractService } from "./abstract.service";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService {

  baseurl: any;
  chatGptUrl: string = "https://api.openai.com/v1/chat/completions";

  private httpClient: HttpClient;

  constructor(
    httpBackend: HttpBackend,
    private _abstractService: AbstractService
  ) {
    this.baseurl = myGlobals.baseUrl;
    this.httpClient = new HttpClient(httpBackend);
  }

  getChatGPTResponse(data, prompt) {
    let payload = {
      messages: [
        { role: "assistant", content: data },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
      temperature: 0.7,
      model: "gpt-3.5-turbo",
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    });

    return this.httpClient.post<any>(
      this.chatGptUrl,
      payload,
      { headers }
    );
  }

  convertChatGPTResponse(responseText) {
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
