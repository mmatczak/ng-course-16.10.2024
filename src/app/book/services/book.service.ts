import { Book } from '../model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: 1,
      author: 'F. Scott Fitzgerald',
      title: 'The Great Gatsby',
    },
    {
      id: 2,
      author: 'J.D. Salinger',
      title: 'The Catcher in the Rye',
    },
    {
      id: 3,
      author: 'George Orwell',
      title: '1984',
    },
    {
      id: 4,
      author: 'Harper Lee',
      title: 'To Kill a Mockingbird',
    },
  ]);

constructor(){
  this.booksSubject.subscribe(console.log)
}
  findAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  findOne(id: number): Observable<Book> {
    return this.booksSubject.pipe(
      map((arr)=> arr.filter(book=> book.id === id)[0]),
    );
  }

  update(updatedBook: Book): Observable<Book> {
    return new Observable<Book>((subscriber) => {
      // setTimeout(() => {
      const currentBooks = this.booksSubject.getValue();
      const updatedBookCopy = { ...updatedBook };
      const updatedBooks = currentBooks.map((book) =>
        book.id === updatedBook.id ? updatedBookCopy : book
      );
      console.log("updated!!")
      this.booksSubject.next(updatedBooks);
      subscriber.next(updatedBookCopy);
      subscriber.complete();
      // }, 2000)
    }).pipe(delay(2000));
  }
}
