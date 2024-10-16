import {Component} from '@angular/core';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [BookOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
