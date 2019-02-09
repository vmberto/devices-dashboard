import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listObjShow } from 'src/app/utils/animations/animations';
import { ShareDataService } from 'src/app/services';
import { sortByKeyDesc } from 'src/app/utils/app.utils';
import { WebSocketService } from 'src/app/services/webksocket/websocket.service';
import { MessagesService } from 'src/app/services/entities/messages.service';

@Component({
  selector: 'app-client-messages',
  templateUrl: './client-messages.component.html',
  styleUrls: ['./client-messages.component.css'],
  animations: [listObjShow]
})
export class ClientMessagesComponent implements OnInit {

  public messages: any = [];
  public environmentsId: number[];


  constructor(
    private shareDataService: ShareDataService,
    private webSocket: WebSocketService,
    private messagesService: MessagesService
  ) {
    this.environmentsId = this.shareDataService.client.environments.map(environment => environment.id);
  }

  ngOnInit() {

    this.messagesService.get( { id: this.shareDataService.client.id } ).subscribe(
      res => {
        this.messages = res.data;
      }
      
    )


    this.webSocket.messageEvent.subscribe(message => {

      this.environmentsId = this.shareDataService.client.environments.map(environment => environment.id);

      if (this.environmentsId.indexOf(message.deviceId) !== -1) {
        console.log(message);
        
        this.messages.unshift(message)
      };

    });




  }



}
