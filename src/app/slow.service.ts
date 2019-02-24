import { Injectable } from '@angular/core';
import { Observable, of, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { delay, map, tap, shareReplay } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface AppRequest {
  query: string,
  progress: Observable<number>,
  result: Observable<string>,
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

  setCache(key: string, request: AppRequest): Observable<string> {
    this.cache.set(key, request);
    request.progress = new BehaviorSubject<number>(0);;
    return this.getBackend(request.query)
      .pipe(
        shareReplay(1),
        tap(() => (request.progress as Subject<number>).next(100)));
  }

  getCache(key: string, request: AppRequest): Observable<string> {
    const cached = this.cache.get(key)
    request.progress = cached.progress;
    return cached.result;
  }

  getBackend(query: string): Observable<string> {
    return of(query).pipe(
      delay(3000),
      map(() => `${new Date()} OK`),
    )
  }
}
