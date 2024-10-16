import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {
  @Input({required: true, alias: 'value'})
  book: Book | undefined | null;

  @Output()
  bookChange: EventEmitter<Book> = new EventEmitter<Book>();

  saveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value

    if (updatedAuthor && updatedTitle && this.book) {
      const updatedBook: Book = {
        ...this.book,
        title: updatedTitle,
        author: updatedAuthor
      }
      this.bookChange.emit(updatedBook);
    }
  }
}
