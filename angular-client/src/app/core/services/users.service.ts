import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserInfo } from '../interfaces';

@Injectable()
export class UsersService {
  private baseUrl = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) {}

  getUserFromLocalStorage(): IUserInfo {
    const uinfo = JSON.parse(localStorage.getItem('UserInfo'));
    return uinfo as IUserInfo;
  }

  getUserByName(name): Observable<IUserInfo> {
    return this.http.get<IUserInfo>(this.baseUrl + '/name/' + name);
  }

  getUserImage(userId): Observable<Blob> {
    const url = this.baseUrl + '/img/' + userId;
    return this.http.get(url, { responseType: 'blob' });
  }
}
