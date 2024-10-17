import {Component} from '@angular/core';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'ba-root',
  standalone: true,
  imports: [BookOverviewComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
