import { Component } from '@angular/core';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [BookDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
