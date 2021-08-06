import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    // couldnt make the leave transition work..
    style({ opacity: 1 }),
    animate('500ms', style({ opacity: 0 }))
  ])
]);
