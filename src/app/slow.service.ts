import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SlowService {

  constructor() { }

  get(): Observable<string> {
    return of('Done.').pipe(
      delay(3000)
    )
  }
}
