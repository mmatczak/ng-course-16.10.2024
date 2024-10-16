import {Book} from '../model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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
  ]);

  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  update(updatedBook: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      setTimeout(() => {
        const currentBooks = this.booksSubject.getValue();
        const updatedBookCopy = {...updatedBook};
        const updatedBooks = currentBooks.map(
          book => book.id === updatedBook.id ? updatedBookCopy : book);
        this.booksSubject.next(updatedBooks);
        subscriber.next(updatedBookCopy);
        subscriber.complete();
      }, 2000)
    })
  }
}
