import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import io from "socket.io-client";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket;
    private url = environment.API_URL;

    public activatedDevicesEvent = new Subject<any>();

    public messageEvent = new Subject<any>();

    public newEnvironmentEmitter = new Subject<any>();
    public deletedEnvironmentEmitter = new Subject<any>();

    constructor() {

        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1bWJlcnRvYmFycm9zZkBnbWFpbC5jb20iLCJpYXQiOjE1NDk2MzE4NjJ9.gG8ZC4AIv4tzr_e8WokIL1KmTXrL9SHMriAGYFH4V60';
        this.socket = io.connect(this.url, {
            query: { token }
        });

        this.emittedEvents();
        this.receivedEvents();

    }

    private emittedEvents() {

        this.newEnvironmentEmitter.subscribe(
            environment => {
                this.socket.emit('new-environment', environment);
            });

        this.deletedEnvironmentEmitter.subscribe(
            environment => {
                this.socket.emit('deleted-environment', environment);
            });

    }

    private receivedEvents() {

        this.socket.on('update-dashboard', (message: any) => {
            this.messageEvent.next(message);
        });


    }




}