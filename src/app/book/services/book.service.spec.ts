import {BookService} from './book.service';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClient, HttpErrorResponse, HttpResponse, provideHttpClient} from '@angular/common/http';
import {baseUriToken} from '../../base-uri.token';
import {EMPTY, of} from 'rxjs';
import {Book} from '../model';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

fdescribe('BookService', () => {
  let service: BookService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: baseUriToken, useValue: 'localhost:3000'}
      ]
    });

    service = TestBed.inject(BookService);
    httpCtrl = TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return one book for id 3', () => {
    let book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 1
    };

    service.findOne(3).subscribe(result => {
      expect(result).toEqual(book);
      expect(request.request.method).toEqual('GET');
    });

    const request = httpCtrl.expectOne('localhost:3000/book/3');
    request.flush(book);
    httpCtrl.verify();
  })

  it('should return error', () => {
    let book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 1
    };

    service.findOne(3).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400);
        expect(error.error).toEqual('Errorrrrrr');
      }
    });

    const request = httpCtrl.expectOne('localhost:3000/book/3');

    request.flush('Errorrrrrr', { status: 400, statusText: 'Bad Request' });

    httpCtrl.verify();
  })

  it('should return updated book for id 3 [done]', (done) => {
    let book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };

    service.update(book).subscribe(result => {
      expect(result).toEqual(book);
      expect(request.request.method).toEqual('PUT');
      done();
    });


    const request = httpCtrl.expectOne('localhost:3000/book/3');

    request.flush(book);
    httpCtrl.verify();
  })

  it('should return updated book for id 3 [fakeAsync]', fakeAsync(() => {
    let book = {
      title: 'W pustyni i w puszczy',
      author: 'Henryk Sienkiewicz',
      dateOfPublication: '2023-01-01',
      id: 3
    };

    service.update(book).subscribe(result => {
      expect(result).toEqual(book);
      expect(request.request.method).toEqual('PUT');
    });

    const request = httpCtrl.expectOne('localhost:3000/book/3');

    request.flush(book);

    tick(1000)
    httpCtrl.verify();
  }))
})
