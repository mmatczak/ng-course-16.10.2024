import { Component, inject, input, output } from '@angular/core';
import { Book } from '../../model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

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

  protected readonly bookId$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')), map(Number));

  protected readonly nextBookId$ = this.bookId$.pipe(map(bookId => bookId+1), tap(console.log))


  constructor() {
    this.bookId$.pipe(switchMap(bookId=> this.bookService.findOne(bookId)))
    .subscribe((book: Book) => {
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
