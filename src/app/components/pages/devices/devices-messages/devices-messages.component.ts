import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listObjShow } from 'src/app/utils/animations/animations';
import { ShareDataService } from 'src/app/services';
import { sortByKeyDesc } from 'src/app/utils/app.utils';
import { WebSocketService } from 'src/app/services/webksocket/websocket.service';
import { MessagesService } from 'src/app/services/entities/messages.service';

@Component({
  selector: 'app-devices-messages',
  templateUrl: './devices-messages.component.html',
  styleUrls: ['./devices-messages.component.css'],
  animations: [listObjShow]
})
export class DevicesMessagesComponent implements OnInit {

  @Input() deviceId: number;
  @Output() closeModal = new EventEmitter<any>();
  public messages: any = [];


  constructor(
    private webSocket: WebSocketService,
    private messagesService: MessagesService
  ) {
  }

  ngOnInit() {

    this.messagesService.get({ id: this.deviceId, url: 'devices' }).subscribe(
      res => {
        this.messages = res.data;
      }
    )


    this.webSocket.messageEvent.subscribe(message => {

      if (this.deviceId === message.deviceId) {
        this.messages.unshift(message)
      };

    });


  }

  close(): void {
    this.closeModal.emit(false);
  }


}
