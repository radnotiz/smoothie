import { Component } from '@angular/core';
import { SlowService } from './slow.service';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent {
  result: Subject<string> = new BehaviorSubject('Click on Submit.');

  constructor(private slow: SlowService) { }

  onSubmit() {
    of('Please wait...').pipe(
      tap((initial) => {
        this.result.next(initial);
      }),
      switchMap(() => this.slow.get())
    ).subscribe((result) => {
      this.result.next(result);
    });
  }
}
