import { Component, input, output } from '@angular/core';
import {Book} from '../../model';

@Component({
  selector: 'ba-book-form',
  standalone: true,
  imports: [],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  readonly book = input<Book>();

  readonly saveBook = output<Book>()

  onSaveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement =
      formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value;
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value;
    const originalBook = this.book();

    if (updatedAuthor && updatedTitle) {
      if (originalBook) {
        const updatedBook: Book = {
          ...originalBook,
          title: updatedTitle,
          author: updatedAuthor,
        };
        this.saveBook.emit(updatedBook);
      } else {
        const updatedBook: Book = {
          title: updatedTitle,
          author: updatedAuthor,
        };
        this.saveBook.emit(updatedBook);
      }

    }
  }

}
