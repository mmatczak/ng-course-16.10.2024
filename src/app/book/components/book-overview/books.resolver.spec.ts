import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { booksResolver } from './books.resolver';
import {Book} from '../../model';

describe('bookResolver', () => {
  const executeResolver: ResolveFn<Book[]> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => booksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeDefined();
  });
});
