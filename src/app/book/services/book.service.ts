import { HttpClient } from '@angular/common/http';
import { Book } from '../model';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly httpClient = inject(HttpClient);


  findAll(): Observable<Book[]> {
    // return this.booksSubject.asObservable();
    return new Observable();
  }

  findOne(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`http://localhost:3000/book/${id}`)
  }

  update(updatedBook: Book): Observable<Book> {
    return this.httpClient.put<Book>(`http://localhost:3000/book/${updatedBook.id}`, updatedBook);
  }
}
