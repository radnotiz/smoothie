import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

    constructor(private cache: CacheService<string, Observable<HttpEvent<any>>>) {
    }

    key(request: HttpRequest<any>): string {
        return request.urlWithParams;
    }

    sendRequest(request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(this.key(request), of(event).pipe(
                        shareReplay(1)
                    ));
                }
            }),
        );
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.cache);
        return this.cache.has(this.key(request)) ?
            this.cache.get(this.key(request)) :
            this.sendRequest(request, next)
    }
}