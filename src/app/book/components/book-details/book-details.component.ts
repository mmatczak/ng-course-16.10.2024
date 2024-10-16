import {Component, input, output} from '@angular/core';
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
  readonly book = input.required<Book | undefined | null>({alias: 'value'});
  readonly bookChange = output<Book>()

  saveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value
    const originalBook = this.book();
    if (updatedAuthor && updatedTitle && originalBook) {
      const updatedBook: Book = {
        ...originalBook,
        title: updatedTitle,
        author: updatedAuthor
      }
      this.bookChange.emit(updatedBook);
    }
  }
}
