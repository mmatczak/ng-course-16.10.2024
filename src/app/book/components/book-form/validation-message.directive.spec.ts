import { ValidationMessageDirective } from './validation-message.directive';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookFormComponent} from './book-form.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ValidationMessageService} from '../../services/validation-message.service';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'ba-test',
  template: `<form [formGroup]="testForm">
    <input id="test" class="form-control" formControlName="test"/>
  </form>`,
  standalone: true,
  imports: [ReactiveFormsModule, ValidationMessageDirective]
})
class TestComponent {
  testForm = new FormGroup({
    test: new FormControl('test', Validators.required)
  })
}

fdescribe('ValidationMessageDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let validationMessageService: jasmine.SpyObj<ValidationMessageService>;

  beforeEach(async () => {
    validationMessageService = jasmine.createSpyObj('ValidationMessageService', ['getValidationMessage']);
    validationMessageService.getValidationMessage.and.callFake((formControlName, errorName) => {
      return `${formControlName} - ${errorName}`
    })
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        { provide: ValidationMessageService, useValue: validationMessageService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show validation message', () => {
    const inputEl = fixture.debugElement.query(By.css('#test')).nativeElement;
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(inputEl.classList).toContain('is-invalid')
  })
});
