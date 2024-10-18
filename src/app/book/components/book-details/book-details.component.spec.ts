import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {BookService} from '../../services/book.service';
import {RouterModule} from '@angular/router';
import {Component, input, output} from '@angular/core';
import {Book} from '../../model';
import {BookFormComponent} from '../book-form/book-form.component';
import {By} from '@angular/platform-browser';
import {MockComponent, MockComponents, ngMocks} from 'ng-mocks';

@Component({
  selector: 'ba-book-form',
  template: ``,
  standalone: true
})
class BookFormMockComponent {
  book = input<Book>();
  saveBook = output<Book>();
}

fdescribe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookService: jasmine.SpyObj<BookService>;

  const book = {
    title: 'W pustyni i w puszczy',
    author: 'Henryk Sienkiewicz',
    dateOfPublication: '2023-01-01',
    id: 3
  }

  beforeEach(async () => {
    bookService = jasmine.createSpyObj('BookService', ['update']);
    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent, RouterModule.forRoot([])],
      providers: [
        { provide: BookService, useValue: bookService }
      ]
    })
      .overrideComponent(BookDetailsComponent, {
        remove: {
          imports: [BookFormComponent]
        },
        add: {
          imports: [BookFormMockComponent]
        }
      })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSaveBook', () => {
    const bookFormComponent = fixture.debugElement.query(By.directive(BookFormMockComponent));
    let updatedBook = {
      title: 'Krzyzacy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };
    bookFormComponent.componentInstance.saveBook.emit(updatedBook);
    expect(bookService.update).toHaveBeenCalledWith(updatedBook);
  });

  it('should set correct input in book-form-component', () => {
    const bookFormComponent = fixture.debugElement.query(By.directive(BookFormMockComponent));
    expect(bookFormComponent.componentInstance.book()).toEqual(book);
  });
});
fdescribe('BookDetailsComponent [NgMocks]', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let bookService: BookService;

  const book = {
    title: 'W pustyni i w puszczy',
    author: 'Henryk Sienkiewicz',
    dateOfPublication: '2023-01-01',
    id: 3
  }

  beforeEach(async () => {
    bookService = jasmine.createSpyObj('BookService', ['update']);
    await TestBed.configureTestingModule({
      imports: [BookDetailsComponent, RouterModule.forRoot([])],
      providers: [
        { provide: BookService, useValue: bookService }
      ]
    })
      .overrideComponent(BookDetailsComponent, {
        remove: {
          imports: [BookFormComponent]
        },
        add: {
          imports: [MockComponents(BookFormComponent)]
        }
      })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSaveBook', () => {
    const bookFormComponent = ngMocks.findInstance(BookFormComponent);
    let updatedBook = {
      title: 'Krzyzacy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };
    bookFormComponent.saveBook.emit(updatedBook);
    expect(bookService.update).toHaveBeenCalledWith(updatedBook);
  });

  it('should set correct input in book-form-component', () => {
    const bookFormComponent = ngMocks.findInstance(BookFormComponent);
    expect(bookFormComponent.book).toEqual(book);
  });
});
