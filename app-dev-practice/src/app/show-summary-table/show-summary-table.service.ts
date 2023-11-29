import { Injectable } from '@angular/core';
import { Show } from '../interfaces/show.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShowDetails } from '../interfaces/showDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class ShowSummaryTableService {
  constructor(private http: HttpClient) {}

  select(showId: any): Observable<Show[]> {
    const url = 'http://localhost:8080/show/select';
    return this.http.get<Show[]>(url + '/' + showId);
  }

  selectAll(): Observable<Show[]> {
    const url = 'http://localhost:8080/show/selectAll';
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

  searchShow(showName: string): Observable<ShowDetails> {
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(
      showName
    )}`;
    return this.http.get<ShowDetails>(url);
  }
}
