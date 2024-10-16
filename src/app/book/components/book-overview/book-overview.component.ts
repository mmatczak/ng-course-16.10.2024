import {Component, OnDestroy} from '@angular/core';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [
    BookDetailsComponent,
    NgForOf,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './book-overview.component.html',
  styleUrl: './book-overview.component.scss',
})
export class BookOverviewComponent {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    this.books$ = bookService.findAll();
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    this.bookService.update(updatedBook);
    this.selectBook(updatedBook);
  }
}
