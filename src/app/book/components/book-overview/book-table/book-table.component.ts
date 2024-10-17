import { Component, input, output } from '@angular/core';
import { Book } from '../../../model';

@Component({
  selector: 'ba-book-table',
  standalone: true,
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss'
})
export class BookTableComponent {

  books = input.required<Book[]>();

  selectedBook = input<Book>();

  selectBook = output<Book>()
  
  isBookSelected(book: Book) {
    return this.selectedBook() === book;
  }
}
