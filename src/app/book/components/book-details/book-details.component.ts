import { Component } from '@angular/core';
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
  readonly book: Book

  constructor() {
    this.book = {
      author: 'F. Scott Fitzgerald',
      title: 'The Great Gatsby'
    }
  }

  saveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement = formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value

    if (updatedAuthor && updatedTitle) {
      const updatedBook: Book = {
        ...this.book,
        title: updatedTitle,
        author: updatedAuthor
      }
      console.log('Saving book...', updatedBook);
    }
  }
}
