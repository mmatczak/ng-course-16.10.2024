import {Component, effect, OnDestroy, Signal} from '@angular/core';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {BookService} from '../../services/book.service';
import {Subscription} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

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
export class BookOverviewComponent implements OnDestroy {
  books: Signal<Book[]>;
  selectedBook: Book | null = null;

  private subscription: Subscription | null = null;

  constructor(private readonly bookService: BookService) {
    this.books = toSignal(bookService.findAll(), {initialValue: []});

    effect(() => {
      console.log('new value: ', this.books());
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(updatedBook: Book) {
    const updatedBook$ = this.bookService.update(updatedBook);
    this.subscription = updatedBook$.subscribe({
        next: (updatedBook) => {
          this.selectBook(updatedBook)
        },
        complete: () => {
          this.subscription?.unsubscribe();
          this.subscription = null;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
