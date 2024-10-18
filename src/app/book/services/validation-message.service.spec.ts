import { TestBed } from '@angular/core/testing';

import { ValidationMessageService } from './validation-message.service';

fdescribe('ValidationMessageService', () => {
  let service: ValidationMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return validation message for title required', () => {
    const result = service.getValidationMessage('title', 'required');
    expect(result).toEqual('Pleade provide a title');
  });
});
