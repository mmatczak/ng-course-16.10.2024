import {Component, computed, inject, input, output} from '@angular/core';
import { Book } from '../../model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BookService } from '../../services/book.service';
import { RouterLink } from '@angular/router';
import {BookFormComponent} from '../book-form/book-form.component';

@Component({
  selector: 'ba-book-details',
  standalone: true,
  imports: [JsonPipe, RouterLink, AsyncPipe, BookFormComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {

  protected readonly bookService = inject(BookService);

  protected readonly book = input.required<Book>();

  protected readonly nextBookId = computed(()=> Number(this.book().id) + 1);

  onSaveBook(updatedBook: Book) {
    this.bookService.update(updatedBook).subscribe(()=> alert("Done!"));
  }
}
