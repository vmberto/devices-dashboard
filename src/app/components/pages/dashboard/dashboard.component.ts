import { ToastService } from './../../generic-components/toast/toast.service';
import { ClientsService, SessionsService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { generateRandomColor } from 'src/app/utils/app.utils';
import Chart from 'chart.js';

import * as moment from 'moment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public startDate = moment().startOf('week').subtract(1, 'week');
    public endDate = moment().endOf('week').subtract(1, 'week');

    // Counters
    public patientsCounter: Observable<number>;


    // Chart patients x health-insurance relation
    public patientsHealthInsuranceChart = [];
    public healthInsuranceLabels: string[];
    public patientsHealthInsuranceData: number[] = [];
    public randomColors: string[] = [];

    // Chart total sessions last week
    public lastWeekSessionsChart: Chart;
    public totalHoursWorked: any;
    public attendedPatients: number;

    constructor(
        private clientsService: ClientsService,
        private sessionsService: SessionsService) { }



    ngOnInit() {


        this.patientsCounter = this.clientsService.get({ url: 'counter' }).pipe(map(res => res.data));

        this.patientsHealthInsuranceRelationChart();

        this.totalSessionsLastWeekChart();

    }

    private patientsHealthInsuranceRelationChart() {


        this.patientsHealthInsuranceChart = new Chart('patientsHealthInsuranceChart', {
            type: 'pie',
            data: {
                labels: this.healthInsuranceLabels,
                datasets: [{
                    data: this.patientsHealthInsuranceData,
                    backgroundColor: this.randomColors,
                    borderColor: this.randomColors,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'left',
                    labels: {
                        fontColor: 'white',
                        fontSize: 11
                    }
                }
            }
        });

    }

    private totalSessionsLastWeekChart() {

        const lastWeek = {
            min_date: moment(this.startDate).format('YYYY-MM-DD HH:mm'),
            max_date: moment(this.endDate).format('YYYY-MM-DD HH:mm')
        };

        // this.sessionsService.get({ query: lastWeek, url: 'statistics' })
        //     .subscribe(
        //         res => {
        //             this.attendedPatients = res.totalPatients;
        //             this.totalHoursWorked = res.totalHours;

                    if (this.lastWeekSessionsChart) this.lastWeekSessionsChart.destroy();
                    this.lastWeekSessionsChart = new Chart('lastWeekSessionsChart', {
                        type: 'bar',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
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
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                // }
            // );
    }

    public recalculateSessions() {
        this.startDate = moment(this.startDate).set('hour', 0);
        this.endDate = moment(this.endDate).set('hour', 23);
        this.totalSessionsLastWeekChart();
    }


}
