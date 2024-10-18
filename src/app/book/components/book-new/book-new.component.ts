import { Component, inject } from '@angular/core';
import {BookFormComponent} from '../book-form/book-form.component';
import {Book} from '../../model';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'ba-book-new',
  standalone: true,
  imports: [
    BookFormComponent
  ],
  templateUrl: './book-new.component.html',
  styleUrl: './book-new.component.scss'
})
export class BookNewComponent {

  protected readonly bookService = inject(BookService);

  onSaveBook(newBook: Book) {
    this.bookService.new(newBook).subscribe(()=> alert("Done!"));
  }

}
