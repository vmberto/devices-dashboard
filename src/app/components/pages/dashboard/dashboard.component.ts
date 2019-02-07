import { ClientsService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateRandomColor } from 'src/app/utils/app.utils';
import Chart from 'chart.js';

import * as moment from 'moment';
import { EnvironmentsService } from 'src/app/services/entities/enviroments.service';


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

    constructor(
        private clientsService: ClientsService,
        private environmentsService: EnvironmentsService
    ) { }



    ngOnInit() {



        this.clientsCounter = this.clientsService.get({ url: 'counter' }).pipe(map(res => res.data));
        this.environmentsCounter = this.environmentsService.get({ url: 'counter' }).pipe(map(res => res.data));


        this.lastUpdateChartBuilder();
        
    }

    private lastUpdateChartBuilder() {


        this.environmentsService.get( { query: { clientId: 2 } } ).subscribe(res => { console.log(res) })

        if (this.lastUpdateChart) this.lastUpdateChart.destroy();
        this.lastUpdateChart = new Chart('lastWeekSessionsChart', {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    data: [12, 19, 3, 5, 2, 3],
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
