import { Injectable } from '@angular/core';
import * as io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket : any;
  listeners=[];
  socketUrl : any="ws://localhost:5000/webSocket?token=";
   
  constructor() {
  }

  async getInstance(token : any){
    if(this.socket===undefined){
      this.socket=await io(this.socketUrl+""+token);
      this.handleWebSocket();
    }
    return this.socket;
  }

  private handleWebSocket(){
    this.socket.on("open",(data: any)=>{
      this.onOpen(data);
    });

    this.socket.on("message",(data: any)=>{
      this.onMessage(data);
    });

    this.socket.on("disconnect",(data: any)=>{
      this.onClose(data);
    });
  }

  private onOpen(obj: any){
    console.log("connection opend : ",obj);
  }

  sendMessage(obj : any){
    if(this.socket !== undefined){
      this.socket.emit("message",JSON.stringify(obj));
    }
  }

  private onMessage(obj: string){
    console.log("message received : ");
    let res =JSON.parse(obj);
    this.listeners.forEach((key,index)=>{
      if(res.type === key.type){
        key.callback.next(res.data);
      }
    })
    
  }

  private onClose(obj: any){
    console.log("connection closed : ",obj);
    this.socket=undefined;
  }

  socketClosed(){
    this.socket.close();
  }

  addListener(obj){
    this.listeners.push(obj);
  }

  async removeListener(obj){
    this.listeners.map(item=>{
      if(item.type === obj.type){
        this.listeners.splice(item,1);
      }
    });
  }

}