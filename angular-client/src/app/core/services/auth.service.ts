import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUserInfo } from '../interfaces';

@Injectable()
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  httpRegister(name, email, password): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(this.baseUrl + '/register', {
      name,
      email,
      password,
    });
  }

  httpLogin(email, password): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(this.baseUrl + '/login', {
      email,
      password,
    });
  }

  isSignedIn(): boolean {
    const uinfo = JSON.parse(localStorage.getItem('UserInfo'));

    if (uinfo) {
      let payload = uinfo.token.split('.')[1];
      payload = JSON.parse(window.atob(payload));


      return payload.exp > Date.now() / 1000;
    }

    return false;
  }

  signIn(uinfo: IUserInfo) {
    localStorage.setItem('UserInfo', JSON.stringify(uinfo));
  }

  signOut() {
    localStorage.setItem('UserInfo', null);
  }
}
