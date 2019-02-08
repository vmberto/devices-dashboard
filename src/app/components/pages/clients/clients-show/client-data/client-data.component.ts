import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShareDataService } from 'src/app/services';

@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.css']
})
export class ClientDataComponent implements OnInit {

  public client: any;

  @Output() editclientData: EventEmitter<any> = new EventEmitter<any>();
  public downloadingAnamnesis: boolean;
  public edit: string;
  public openInput = false;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {

    this.client = this.shareDataService.client;

  }

  public openInputToEdit() {
    this.openInput = !this.openInput;
  }

  public closeOrEditButton(editField) {
    if (editField && this.client.name !== editField) {
      this.client.name = editField;
      this.editclientData.emit(this.client);
    }
    this.openInput = false;
  }

}
