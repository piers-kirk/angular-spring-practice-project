import { Injectable } from '@angular/core';
import { User } from './user.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    const url = 'http://localhost:8080/users/getAll';

    return this.http.get<User>(url);
  }
}
