import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import {By} from '@angular/platform-browser';
import {Book} from '../../model';

fdescribe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update title', () => {
    const book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();
    const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('#title')).nativeElement;
    // const titleInput: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#title');
    expect(titleInput.value).toEqual('W pustyni i w puszczy');
  })

  it('should emit not updated Book', (done) => {
    const book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();

    component.saveBook.subscribe((savedBook: Book) => {
      expect(savedBook).toEqual(book);
      done();
    });

    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    saveButton.click();
  })

  it('should emit updated Book', waitForAsync(() => {
    const book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };
    fixture.componentRef.setInput('book', book);
    fixture.detectChanges();

    const titleInput: HTMLInputElement = fixture.debugElement.query(By.css('#title')).nativeElement;
    titleInput.value = 'Krzyzacy';
    titleInput.dispatchEvent(new Event('input'));

    component.saveBook.subscribe((savedBook: Book) => {
      expect(savedBook.title).toEqual('Krzyzacy');
    });

    const saveButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    // saveButton.click();
    saveButton.dispatchEvent(new MouseEvent('click'));
    fixture.whenStable();
  }))
});
