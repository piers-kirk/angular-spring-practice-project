import { Injectable } from '@angular/core';
import { Show } from './show.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(private http: HttpClient) {}

  getShows(): Observable<Show[]> {
    const url = 'http://localhost:8080/show/selectAll';
    return this.http.get<Show[]>(url);
  }

  save(show: any) {
    const url = 'http://localhost:8080/show/save';
    return this.http.post<Show>(url, show);
  }

  delete(showId: any) {
    const url = 'http://localhost:8080/show/delete';
    return this.http.delete<Show>(url + '/' + showId);
  }
}
