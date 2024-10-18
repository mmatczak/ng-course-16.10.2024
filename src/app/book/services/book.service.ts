import { HttpClient } from '@angular/common/http';
import { Book } from '../model';
import { inject, Injectable } from '@angular/core';
import {delay, Observable} from 'rxjs';
import { baseUriToken } from '../../base-uri.token';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly httpClient = inject(HttpClient);

  private readonly BACKEND_URL = inject(baseUriToken);


  findAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.BACKEND_URL}/book`)
  }

  findOne(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.BACKEND_URL}/book/${id}`)
  }

  update(updatedBook: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.BACKEND_URL}/book/${updatedBook.id}`, updatedBook).pipe(delay(1000));
  }

  new(newBook: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${this.BACKEND_URL}/book`, newBook);
  }
}
