import {AfterViewInit, Component, DestroyRef, effect, ElementRef, inject, OnDestroy, Optional, Self, Signal, SkipSelf, viewChild, ViewChild} from '@angular/core';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {Book} from '../../model';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {BookService} from '../../services/book.service';
import { debounceTime, fromEvent, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import { BookTableComponent } from './book-table/book-table.component';
import { ActivatedRoute, Router } from '@angular/router';

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
export class BookOverviewComponent implements AfterViewInit {
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  books: Signal<Book[]>;
  
  private readonly roter = inject(Router);
  private readonly route = inject(ActivatedRoute);


  constructor() {
    const books$ = this.route.data.pipe(map(data=> data['books']));

    this.books = toSignal(books$, {initialValue: []});
  }

  ngAfterViewInit(): void {
    const searchInputElement = this.searchInput()?.nativeElement;
    if (searchInputElement) {
      fromEvent(searchInputElement, 'input').pipe(
        map(event => {
          const inputElement = event.target as HTMLInputElement;
          return inputElement.value;
        }),
        debounceTime(3000)
      )
        .subscribe(value => {
          console.log('input event: ', value);
        });
    }
  }

  selectBook(book: Book) {
    this.roter.navigate(['/book', book.id]);
  }
}
