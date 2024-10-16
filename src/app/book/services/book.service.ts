import {Book} from '../model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      author: 'F. Scott Fitzgerald',
      title: 'The Great Gatsby'
    },
    {
      id: 2,
      author: 'J.D. Salinger',
      title: 'The Catcher in the Rye'
    },
    {
      id: 3,
      author: 'George Orwell',
      title: '1984'
    },
    {
      id: 4,
      author: 'Harper Lee',
      title: 'To Kill a Mockingbird'
    }
  ]


  findAll(): Observable<Book[]> {
    return new Observable<Book[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(this.books)
        subscriber.complete()
      }, 2000)
    })
  }

  update(updatedBook: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      setTimeout(() => {
        this.books = this.books.map(
          book => book.id === updatedBook.id ? updatedBook : book);
        subscriber.next(updatedBook);
        subscriber.complete();
      }, 2000)
    })
  }
}
