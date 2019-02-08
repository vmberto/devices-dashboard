import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listObjShow } from 'src/app/utils/animations/animations';
import io from "socket.io-client";
import { ShareDataService } from 'src/app/services';
import { sortByKeyDesc } from 'src/app/utils/app.utils';

@Component({
  selector: 'app-client-messages',
  templateUrl: './client-messages.component.html',
  styleUrls: ['./client-messages.component.css'],
  animations: [listObjShow]
})
export class ClientMessagesComponent implements OnInit {

  public messages: any = [];

  public environmentsId: number[];

  private url = environment.API_URL;
  private socket;


  constructor(private shareDataService: ShareDataService) {
    this.environmentsId = this.shareDataService.client.environments.map(environment => environment.id);
   }

  ngOnInit() {

    this.shareDataService.client.environments.forEach(environment => {
      this.messages = this.messages.concat(environment.device.messages);
    });

    sortByKeyDesc(this.messages, 'createdAt');

    console.log(this.messages);
    
    this.socket = io.connect(this.url);

    this.socket.on('update-dashboard', (message: any) => {

        if (this.environmentsId.indexOf(message.deviceId) !== -1) this.messages.unshift(message);

    });

  }



}
