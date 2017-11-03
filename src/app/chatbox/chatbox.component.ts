import { Component, OnInit } from '@angular/core';
import { ChatMessages } from '../data.model'



@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit{
    chatMessages: ChatMessages;
    messagesNotUsed: string[];
    displayMsgs: {}[];
    isCollapsed: boolean;

    constructor() {
      this.chatMessages = new ChatMessages();
      this.messagesNotUsed = this.chatMessages.chatMessages.slice();
      this.displayMsgs = [];
      this.isCollapsed = true;
    }

    respond(userMsgHtml: HTMLInputElement): void{
      var userMsg = userMsgHtml.value;
      userMsgHtml.value = ""; //reset text

      //record user message
      this.displayMsgs.push({msg: userMsg, type: "user", time: new Date(Date.now()).toLocaleString()}); //return newMsg

      //reload messages if empty
      if (this.messagesNotUsed.length == 0){
        this.messagesNotUsed = this.chatMessages.chatMessages.slice(); 
        console.log("orig chat msg length: " + this.chatMessages.chatMessages.length);
      }   


      //finding new message randomly
      var randNum = Math.floor(Math.random() * (this.messagesNotUsed.length));
      var newMsg = this.messagesNotUsed[randNum];

      console.log("randNum: " + randNum);
      console.log("msg length: " + this.messagesNotUsed.length);
      console.log("new msg: " + newMsg);
      //remove message
      this.messagesNotUsed.splice(this.messagesNotUsed.indexOf(newMsg),1) 

      //push bot message
      this.displayMsgs.push({msg: newMsg, type: "bot", time: new Date(Date.now()).toLocaleString()});

      console.log("num of display msgs: " + this.displayMsgs.length);
    }

    isUser(msg: {}): boolean{
      if (msg["type"] == "user"){
        return true;
      }
      return false;
    }

    collapse(): boolean{
      this.isCollapsed = !this.isCollapsed;
      return this.isCollapsed;
    }

    ngOnInit(){
      //this.isCollapsed = true;
    }
}
