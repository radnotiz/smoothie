import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
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
  limit = 12;
  queryText: string;

  constructor(private slow: SlowService) { }

  onSubmit() {
    const request = {
      query: this.queryText,
      progress: { value: 0, bufferValue: 0 },
      result: 'Fetching...',
    }

    this.slow.get(this.queryText).subscribe(
      (result) => {
        request.result = JSON.stringify(result);
        request.progress.value = 100;
      },
      (error) => {
        request.result = error.message;
        request.progress.bufferValue = 100;
      }
    )
    if (this.requests.length >= this.limit) {
      this.requests.pop();
    }
    this.requests.unshift(request);
  }
}
