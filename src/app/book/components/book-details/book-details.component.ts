import { Component, inject, input, output } from '@angular/core';
import { Book } from '../../model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [JsonPipe, RouterLink, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  book: Book | undefined;

  protected readonly bookService = inject(BookService);

  private readonly route = inject(ActivatedRoute);

  protected readonly books$ =  this.route.data.pipe(map(data=> data['book']));

  protected readonly nextBookId$ = this.books$.pipe(map(book => book.id+1))

  constructor() {
    this.books$.subscribe((book: Book) => {
        this.book = book;
      });
  }

  saveBook(event: Event) {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const authorElement =
      formElement.querySelector<HTMLInputElement>('#author');
    const updatedAuthor = authorElement?.value;
    const titleElement = formElement.querySelector<HTMLInputElement>('#title');
    const updatedTitle = titleElement?.value;
    const originalBook = this.book;
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
