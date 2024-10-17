import { Component, computed, inject, input } from '@angular/core';
import { Book } from '../../model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [JsonPipe, RouterLink, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {

  protected readonly bookService = inject(BookService);

  protected readonly book = input.required<Book>();

  protected readonly nextBookId = computed(()=> Number(this.book().id) + 1);

  saveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement =
      formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value;
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value;
    const originalBook = this.book();
    if (updatedAuthor && updatedTitle && originalBook) {
      const updatedBook: Book = {
        ...originalBook,
        title: updatedTitle,
        author: updatedAuthor,
      };
    this.bookService.update(updatedBook).subscribe(()=> alert("Done!"));
    }
  }
}
