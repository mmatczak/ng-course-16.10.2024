import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./book/components/book-details/book-details.component";
import { BookOverviewComponent } from "./book/components/book-overview/book-overview.component";
import { booksResolver } from "./book/components/book-overview/books.resolver";
import { bookResolver } from "./book/components/book-details/book.resolver";
import { InfoComponent } from "./book/components/info/info.component";

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', title: 'Search', component: BookOverviewComponent, resolve:{books: booksResolver} },
  { path: 'book', children: [
      { path: 'new',  title: 'New Book', component: BookDetailsComponent },
      { path: ':id',  title: 'Book details', component: BookDetailsComponent, resolve:{book: bookResolver} },
    ],
  },
  { path: 'info', title: 'Info', component: InfoComponent },
];