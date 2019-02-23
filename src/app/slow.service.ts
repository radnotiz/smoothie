import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';


export interface AppRequest {
  query: string,
  progress: Subject<number>,
  result: Subject<string>,
}

@Injectable({
  providedIn: 'root'
})
export class SlowService {

  cache: Map<string, AppRequest> = new Map<string, AppRequest>();
  cacheSizeLimit = 3;

  constructor() { }

  get(request: AppRequest): Subject<AppRequest> {
    const withKey = request.query;
    return this.cache.has(withKey) ? this.getCache(request, withKey) : this.setCache(request, withKey);
  }

  setCache(request: AppRequest, withKey: string) {
    request.result = this.getBackend(request);
    if (this.cache.size >= this.cacheSizeLimit) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(withKey, request);

    return new BehaviorSubject(request);
  }

  getCache(request: AppRequest, withKey: string): Subject<AppRequest> {
    const cached = this.cache.get(withKey)
    cached.progress.subscribe(progress => request.progress.next(progress));
    cached.result.subscribe(result => request.result.next(result));

    return new BehaviorSubject(request);
  }

  getBackend(request: AppRequest): Subject<string> {
    const result = new ReplaySubject<string>(1);
    of(request).pipe(
      tap(() => request.progress.next(0)),
      delay(3000),
      tap(() => request.progress.next(100)),
      map(() => 'OK'),
    ).subscribe(result);
    return result;
  }
}
