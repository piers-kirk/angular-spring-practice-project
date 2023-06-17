import { Injectable } from '@angular/core';
import { Show } from './show.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  constructor(private http: HttpClient) {}

  select(): Observable<Show[]> {
    const url = 'http://localhost:8080/show/select';
    return this.http.get<Show[]>(url);
  }

  save(show: any) {
    const url = 'http://localhost:8080/show/save';
    return this.http.post<Show>(url, show);
  }

  delete(showIds: any) {
    const url = 'http://localhost:8080/show/delete';
    return this.http.delete<Show>(url + '/' + showIds);
  }

  export() {
    const url = 'http://localhost:8080/show/export';
    return this.http.get(url, { responseType: 'blob' });
  }
}
