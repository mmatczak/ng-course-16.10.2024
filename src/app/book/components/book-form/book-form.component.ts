import { Component, effect, input, output, Input, inject } from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common'
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms'
import {toObservable} from '@angular/core/rxjs-interop';
import {Book} from '../../model';

interface BookForm {
  title: FormControl<string>;
  author: FormControl<string>;
  dateOfPublication: FormControl<string>;
}

@Component({
  selector: 'ba-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent  {


  // private readonly fb = inject(FormBuilder);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly book = input<Book>();

  // private _book?: Book;
  // @Input() set book (book: Book | undefined) {
  //   this._book = book;
  //   if (book) {
  //     this.bookForm.setValue(book);
  //   }
  // }
  //
  // get book(): Book | undefined {
  //   return this._book;
  // }

  readonly saveBook = output<Book>()

  // readonly bookForm = new FormGroup({
  //   title: new FormControl('', { nonNullable: true }),
  //   author: new FormControl('', { nonNullable: true }),
  // });

  readonly bookForm: FormGroup<BookForm> = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    dateOfPublication: ['', [Validators.required, Validators.pattern(/(\d{4})-(\d{2})-(\d{2})/)]]
  });

  constructor() {
    // toObservable(this.book).subscribe(book => {
    //   if (book) {
    //     this.bookForm.setValue(book);
    //   } else {
    //     this.bookForm.reset();
    //   }
    // });
    effect(() => {
      const bookValue = this.book();
      if (bookValue) {
        // this.bookForm.setValue({
        //   title: bookValue.title,
        //   author: bookValue.author,
        // });
        this.bookForm.patchValue(bookValue)
      } else {
        this.bookForm.reset();
      }
    });
  }


  onSaveBook() {
    const originalBook = this.book();

    if (this.bookForm.controls.author.value && this.bookForm.controls.title.value) {
      if (originalBook) {
        const updatedBook: Book = {
          ...originalBook,
          title: this.bookForm.controls.title.value,
          author: this.bookForm.controls.author.value,
          dateOfPublication: this.bookForm.controls.dateOfPublication.value,
        };
        this.saveBook.emit(updatedBook);
      } else {
        const updatedBook: Book = {
          title: this.bookForm.controls.title.value,
          author: this.bookForm.controls.author.value,
          dateOfPublication: this.bookForm.controls.author.value,
        };
        this.saveBook.emit(updatedBook);
      }

    }
  }

}
