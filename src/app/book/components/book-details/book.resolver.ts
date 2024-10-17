import { ResolveFn } from '@angular/router';
import { BookService } from '../../services/book.service';
import { inject } from '@angular/core';
import { Book } from '../../model';

export const bookResolver: ResolveFn<Book> = (route) => {

  const bookId = Number(route.paramMap.get('id'));

  return inject(BookService).findOne(bookId);
};
