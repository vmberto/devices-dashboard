import { Component } from '@angular/core';
import { routerTransition } from 'src/app/utils/animations/animations';

@Component({
    selector: 'app-patients',
    template:
    `<main [@routerTransition]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet  #o="outlet"></router-outlet> 
    </main>`,
    styleUrls: ['./start-index.component.css'],
    animations: [routerTransition]
})
export class StartIndexComponent { }
