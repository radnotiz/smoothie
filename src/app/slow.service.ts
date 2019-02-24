import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlowService {

  constructor(private http: HttpClient) { }

  get(request: string) {
    return this.http.get(request, {responseType: 'json'});
  }
}
