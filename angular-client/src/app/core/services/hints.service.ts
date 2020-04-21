import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { IHint } from '../interfaces';

@Injectable()
export class HintsService {
  private baseUrl = 'http://localhost:3000/api/hints';

  constructor(private http: HttpClient, private users: UsersService) {}

  getByAuthor(author): Observable<IHint[]> {
    const url = `${this.baseUrl}/author/${author}`;
    return this.http.get<IHint[]>(url);
  }

  getBySlug(slug): Observable<IHint> {
    const url = `${this.baseUrl}/slug/${slug}`;
    return this.http.get<IHint>(url);
  }

  postHint(
    title: string,
    tags: string[],
    author: string,
    user_id: string
  ): Observable<Object> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.users.getUserFromLocalStorage().token,
    });

    return this.http.post(
      this.baseUrl,
      { title, tags, author, user_id },
      { headers }
    );
  }
}
