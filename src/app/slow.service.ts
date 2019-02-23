import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SlowService {

  constructor() { }

  get(request): Observable<any> {
    return of(request).pipe(
      delay(3000),
      map((request) => {
        request.result = 'OK'; //[...request.query].reverse().join('');
        return request;
      }),
    )
  }
}
