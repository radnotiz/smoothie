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
  requests = [];
  limit = 10;
  currentQuery: string;

  constructor(private slow: SlowService) { }

  onSubmit() {
    if (this.requests.length >= this.limit) {
      this.requests.pop();
    }
    of({progress: { value: 0, bufferValue: 0}, query: this.currentQuery, result: 'Fetching...' }).pipe(
      tap((request) => this.requests.unshift(request)),
      switchMap((request) => this.slow.get(request))
    ).subscribe((request) => {
      request.progress.bufferValue = 100;
      request.progress.value = 100;
    });
  }
}
