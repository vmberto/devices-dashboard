import { trigger, animate, style, query, stagger, transition, keyframes, group } from '@angular/animations';

export const showup = trigger('showup', [
    transition('void => *', [
        style({ transform: 'translateY(-148%)' }),
        animate(250, style({ transform: 'translateY(-48%)' }))
    ]),
    transition('* => void', [
        style({ transform: 'translateY(-48%)' }),
        animate(250, style({ transform: 'translateY(-148%)' }))
    ])
]);

export const listObjShow = trigger('listObjShow', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('150ms', [
            animate('600ms', keyframes([
                style({ opacity: 0, transform: 'translateX(300px)' }),
                style({ opacity: 1, transform: 'translateX(0)' }),

            ]))

        ]), { optional: true }),

        query(':leave', stagger('150ms', [
            animate('600ms', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateX(100px)', offset: 0.3 }),
                style({ opacity: 0, transform: 'translateX(300px)', offset: 1 }),

            ]))
        ]), { optional: true }),
    ])
]);

export const fade = trigger('fade', [
    transition('void => *', [
        style({ opacity: '0' }),
        animate(100, style({ opacity: '1' }))
    ]),
    transition('* => void', [
        style({ opacity: '1' }),
        animate(100, style({ opacity: '0' }))
    ])
]);


export const showSidebar = trigger('showSidebar', [
    transition('void => *', [
        style({ transform: 'translateX(-200%)' }),
        animate(300, style({ transform: 'translateX(0)' }))
    ]),
    transition('* => void', [
        style({ transform: 'translateX(0)' }),
        animate(300, style({ transform: 'translateX(-200%)' }))
    ])
]);


export const collapse = trigger('collapse', [
    transition('void => *', [
        style({ height: '0' }),
        animate(150, style({ height: '*' }))
    ]),
    transition('* => void', [
        style({ height: '*' }),
        animate(150, style({ height: '0' }))
    ])
]);


export const showCreateInput = trigger('showCreateInput', [
    transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(250, style({ transform: 'translateY(0)' }))
    ]),
    transition('* => void', [
        style({ transform: 'translateX(0)' }),
        animate(250, style({ transform: 'translateX(-120%)' }))
    ])
]);

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
      /* order */
      /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
    /* 2 */ query('.block', style({ opacity: 0 }), { optional: true }),
      /* 3 */ group([  // block executes in parallel
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ], { optional: true }),
        ]),
    ])
]);