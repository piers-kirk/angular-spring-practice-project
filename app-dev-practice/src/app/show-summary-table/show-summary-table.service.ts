import { Injectable } from '@angular/core';
import { Show } from '../interfaces/show.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShowDetails } from '../interfaces/showDetails.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowSummaryTableService {
  backendUrl: String = '/backend';
  showApi: String = 'https://api.tvmaze.com/singlesearch/shows?q=';
  constructor(private http: HttpClient) {}

  select(showId: any): Observable<Show[]> {
    const url = `${this.backendUrl}/show/select`;
    return this.http.get<Show[]>(url + '/' + showId);
  }

  selectAll(): Observable<Show[]> {
    const url = `${this.backendUrl}/show/selectAll`;
    return this.http.get<Show[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching shows', error);
        return of([]);
      })
    );
  }

  save(show: any) {
    const url = `${this.backendUrl}/show/save`;
    return this.http.post<Show>(url, show).pipe(
      catchError((error) => {
        console.error('Error saving show', error);
        return of([]);
      })
    );
  }

  delete(showIds: any) {
    const url = `${this.backendUrl}/show/delete`;
    return this.http.delete<Show>(url + '/' + showIds).pipe(
      catchError((error) => {
        console.error('Error deleting shows', error);
        return of([]);
      })
    );
  }

  export(): Observable<Blob> {
    const url = `${this.backendUrl}/show/export`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error exporting show report', error);
        return of(new Blob());
      })
    );
  }

  searchShow(showName: string): Observable<ShowDetails> {
    const url = `${this.showApi}${encodeURIComponent(showName)}`;
    return this.http.get<ShowDetails>(url);
  }
}
