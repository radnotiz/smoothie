import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRequest, SlowService } from './slow.service';

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
  requests: AppRequest[] = [];
  limit = 12;
  currentQuery: string;

  constructor(private slow: SlowService) { }

  onSubmit() {
    const request = {
      query: this.currentQuery,
      progress: new Observable<number>(),
      result: new Observable<string>(),
    }
    this.requests.unshift(request);
    if (this.requests.length >= this.limit) {
      this.requests.pop();
    }
    request.result = this.slow.get(request);
  }
}
