import { ClientsService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateRandomColor } from 'src/app/utils/app.utils';
import Chart from 'chart.js';

import * as moment from 'moment';
import { EnvironmentsService } from 'src/app/services/entities/enviroments.service';
import { WebSocketService } from 'src/app/services/webksocket/websocket.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    // Counters
    public clientsCounter: Observable<number>;
    public environmentsCounter: Observable<number>;


    // Chart total sessions last week
    public lastUpdateChart: Chart;
    public lastUpdateLabels: string[];
    public lastUpdateData: number[];
    public lastUpdateTemperatureAverage: number;

    constructor(
        private clientsService: ClientsService,
        private environmentsService: EnvironmentsService,
        private webSocket: WebSocketService
    ) { }



    ngOnInit() {



        this.clientsCounter = this.clientsService.get({ url: 'counter' }).pipe(map(res => res.data));
        this.environmentsCounter = this.environmentsService.get({ url: 'counter' }).pipe(map(res => res.data));



        // this.environmentsService.get().subscribe(res => {

        //     this.lastUpdateLabels = res.data.map(environment => environment.title);
        //     this.lastUpdateData = res.data.map(environment => {
        //         if (environment.device.messages[0]) return environment.device.messages[0].temperature;
        //     });

        //     let validData = 0;
        //     let invalidData = 0;
        //     this.lastUpdateData.forEach((temperature) => {
        //         if (temperature) validData += temperature;
        //         else invalidData += 1;
        //     });
            
        //     this.lastUpdateTemperatureAverage = Math.ceil(validData / (this.lastUpdateData.length - invalidData));

        //     this.lastUpdateChartBuilder();

        // });

        // this.webSocket.messageEvent.subscribe(() => {
        //     window.location.reload();
        // });



    }

    private lastUpdateChartBuilder() {



        if (this.lastUpdateChart) this.lastUpdateChart.destroy();
        this.lastUpdateChart = new Chart('lastWeekSessionsChart', {
            type: 'bar',
            data: {
                labels: this.lastUpdateLabels,
                datasets: [{
                    data: this.lastUpdateData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }

    public recalculateLastUpdate() {
        this.lastUpdateChartBuilder();
    }


}
