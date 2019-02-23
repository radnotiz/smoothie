import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SlowService } from './slow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [
    trigger('scrollOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])]
})
export class AppComponent {
  progressBars = [];
  limit = 5;

  constructor(private slow: SlowService) { }

  onSubmit() {
    if (this.progressBars.length >= this.limit) {
      this.progressBars.pop();
    }
    const progressBar = { value: 0, bufferValue: 0 };
    of('').pipe(
      tap(() => this.progressBars.unshift(progressBar)),
      switchMap(() => this.slow.get())
    ).subscribe((result) => {
      progressBar.bufferValue = 100;
      progressBar.value = 100;
    });
  }
}
