import { Component } from '@angular/core';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {JsonPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [
    BookDetailsComponent,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './book-overview.component.html',
  styleUrl: './book-overview.component.scss'
})
export class BookOverviewComponent {
  books: Book[];
  selectedBook: Book | null = null;

  constructor() {
    this.books = [
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
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.books = this.books.map(
      book => book.id === updatedBook.id ? updatedBook : book);
    this.selectBook(updatedBook);
  }
}
