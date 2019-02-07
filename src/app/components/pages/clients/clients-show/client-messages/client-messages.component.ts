import { Component, OnInit } from '@angular/core';
import io from "socket.io-client";
import { environment } from 'src/environments/environment';
import { listObjShow } from 'src/app/utils/animations/animations';

@Component({
  selector: 'app-client-messages',
  templateUrl: './client-messages.component.html',
  styleUrls: ['./client-messages.component.css'],
  animations: [listObjShow]
})
export class ClientMessagesComponent implements OnInit {

  public messages: any = [];

  private url = environment.API_URL;
  private socket;


  constructor() { }

  ngOnInit() {

    this.socket = io.connect(this.url);


    this.socket.on('message-received', (msg: any) => {
      
      if (this.messages.length === 5) {
        this.messages.pop();
        setTimeout(() => {
          this.messages.unshift(msg);
        }, 100);
      } else {
        this.messages.unshift(msg);
      }

    });
    

    //   this.socket.on('message-received', (msg: any) => {
    //     this.messages.unshift(msg);
    // });


  }



}
