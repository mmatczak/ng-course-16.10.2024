import { ResolveFn } from '@angular/router';
import { Book } from '../../model';
import { BookService } from '../../services/book.service';
import { inject } from '@angular/core';

export const booksResolver: ResolveFn<Book[]> = () => inject(BookService).findAll();
