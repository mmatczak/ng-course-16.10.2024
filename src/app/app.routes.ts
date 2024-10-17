import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./book/components/book-details/book-details.component";
import { BookOverviewComponent } from "./book/components/book-overview/book-overview.component";
import { booksResolver } from "./book/components/book-overview/books.resolver";

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', title: 'Search', component: BookOverviewComponent, resolve:{books: booksResolver} },
  { path: 'book', children: [
      { path: 'new',  title: 'New Book', component: BookDetailsComponent },
      { path: ':id',  title: 'Book details', component: BookDetailsComponent },
    ],
  },
];