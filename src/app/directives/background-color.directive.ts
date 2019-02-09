import { Directive, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[changeBackground]' })
export class ChangeColorDirective implements OnDestroy, AfterViewInit {

    ngAfterViewInit() {
        document.querySelector('body').classList.add('secondary-color');

    }
    ngOnDestroy(): void {
        document.querySelector('body').classList.remove('secondary-color');
    }

}