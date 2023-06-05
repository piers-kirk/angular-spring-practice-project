import { Injectable } from '@angular/core';
import { Show } from './show.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(private http: HttpClient) {}

  getShows(): Observable<Show> {
    const url = 'http://localhost:8080/shows/getAll';
    return this.http.get<Show>(url);
  }

  save(show: Show) {
    const url = 'http://localhost:8080/shows/save';
    return this.http.post<Show>(url, show);
  }
}
