import { ShareDataService, SessionsService } from 'src/app/services';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { collapse } from 'src/app/utils/animations/animations';
import saveAs from 'node_modules/file-saver';



@Component({
  selector: 'app-client-sessions',
  templateUrl: './client-sessions.component.html',
  styleUrls: ['./client-sessions.component.css'],
  animations: [collapse]
})
export class ClientSessionsComponent implements OnInit {

  public sessions: any;
  public downloadingEvolution: boolean;

  public modalState: 'open' | 'close';

  constructor(private shareDataService: ShareDataService, private sessionsService: SessionsService) {
  }

  ngOnInit() {


  }

  public changeModalState(state: 'open' | 'close'): void {
    this.modalState = state;
  }

}
