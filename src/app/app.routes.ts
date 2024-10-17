import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./book/components/book-details/book-details.component";
import { BookOverviewComponent } from "./book/components/book-overview/book-overview.component";

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: BookOverviewComponent },
  {
    path: 'book',
    children: [
      { path: 'new', component: BookDetailsComponent },
      { path: ':id', component: BookDetailsComponent },
    ],
  },
];