import {AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, Optional, Self, Signal, SkipSelf, ViewChild} from '@angular/core';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {BookService} from '../../services/book.service';
import {debounce, debounceTime, fromEvent, map, Subscription} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import { BookTableComponent } from './book-table/book-table.component';

@Component({
  selector: 'ba-book-overview',
  standalone: true,
  imports: [
    BookDetailsComponent,
    NgForOf,
    JsonPipe,
    AsyncPipe,
    BookTableComponent
  ],
  templateUrl: './book-overview.component.html',
  styleUrl: './book-overview.component.scss',
  providers: []
})
export class BookOverviewComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement> | null = null;

  books: Signal<Book[]>;
  selectedBook: Book | undefined = undefined;

  private subscription: Subscription | null = null;

  private readonly bookService = inject(BookService);

  constructor() {
    this.books = toSignal(this.bookService.findAll(), {initialValue: []});

    effect(() => {
      console.log('new value: ', this.books());
    });
  }

  ngAfterViewInit(): void {
    const searchInputElement = this.searchInput?.nativeElement;
    if (searchInputElement) {
      fromEvent(searchInputElement, 'input').pipe(
        map(event => {
          const inputElement = event.target as HTMLInputElement;
          return inputElement.value;
        }),
        debounceTime(300)
      )
        .subscribe(value => {
          console.log('input event: ', value);
        });
    }
  }

  selectBook(book: Book) {
    this.selectedBook = book;
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
