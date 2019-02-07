import { ClientsService, ShareDataService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { showup } from 'src/app/utils/animations/animations';
import { sortByKeyDesc } from 'src/app/utils/app.utils';


@Component({
  selector: 'app-show',
  templateUrl: './clients-show.component.html',
  styleUrls: ['./clients-show.component.css'],
  animations: [showup]
})
export class ClientsShowComponent implements OnInit {

  public clientDataLoaded = false;
  public totalSessions: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private shareDataService: ShareDataService) { }

  ngOnInit() {

    this.loadData();
  }

  loadData(): void {

    this.shareDataService.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      this.clientsService.get({ id: res.id })
        .subscribe(
          (res) => {
            this.clientDataLoaded = true;
            
            this.shareDataService.client = res.data;

            this.shareDataService.activateLoadingScreen(false);

          },
          () => {
            this.shareDataService.activateLoadingScreen(false);

          });

    });
  }

  public updateclientData($event): void {

    this.clientsService.update($event).subscribe(() => {
      if (this.shareDataService.client) {
        this.shareDataService.client.updated_at = new Date();
      }
    });
  }

}
