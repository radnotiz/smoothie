import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay, map, tap, shareReplay } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface AppRequest {
  query: string,
  progress: Subject<number>,
  result: Subject<string>,
}

@Injectable({
  providedIn: 'root'
})
export class SlowService {

  constructor(private cache: CacheService<string, AppRequest>) { }

  get(request: AppRequest): Observable<string> {
    const key = request.query;
    return this.cache.has(key) ? this.getCache(key, request) : this.setCache(key, request);
  }

  setCache(key: string, request: AppRequest) {
    this.getBackend(request).pipe(
      shareReplay(1)
    ).subscribe(request.result);
    this.cache.set(key, request);
    return request.result;
  }

  getCache(key: string, request: AppRequest): Observable<string> {
    const cached = this.cache.get(key)
    cached.progress.subscribe(request.progress);
    cached.result.subscribe(request.result);
    return request.result;
  }

  getBackend(request: AppRequest): Observable<string> {
    return of(request).pipe(
      tap(() => {
        request.progress.next(0);
      }),
      delay(3000),
      tap(() => request.progress.next(100)),
      map(() => `${new Date()} OK`),
    )
  }
}
