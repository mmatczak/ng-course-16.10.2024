import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { BookService } from '../../services/book.service';
import { inject } from '@angular/core';
import { Book } from '../../model';

export const bookResolver: ResolveFn<Book> = (route) => {

  const bookId = Number(route.paramMap.get('id'));

  return inject(BookService).findOne(bookId);
};


// export class BookResolver implements Resolve<Book>{
//     private readonly bookSevice = inject(BookService);
//   resolve(route:ActivatedRouteSnapshot) {
//     const bookId = Number(route.paramMap.get('id'));
//     return this.bookSevice.findOne(bookId);
//   };
// }