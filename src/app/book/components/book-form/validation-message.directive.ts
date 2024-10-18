import { Directive, inject, ElementRef, Renderer2, OnInit } from '@angular/core';
import { NgControl, FormControl, TouchedChangeEvent, StatusChangeEvent } from '@angular/forms';
import {ValidationMessageService} from '../../services/validation-message.service';


@Directive({
  selector: '[formControlName], [formControl]',
  standalone: true
})
export class ValidationMessageDirective implements OnInit {

  protected readonly ngControl = inject(NgControl);
  protected readonly elementRef = inject(ElementRef);
  protected readonly renderer = inject(Renderer2);
  protected readonly validationMessageServce = inject(ValidationMessageService);

  private touched = false;
  private invalid = false;
  private validationMessageDivs: HTMLDivElement[] = [];

  constructor() { }

  ngOnInit() {
    const formControl = this.ngControl.control as FormControl;
    formControl.events.subscribe(event => {
      if (event instanceof TouchedChangeEvent) {
        this.touched = event.touched;
      } else if (event instanceof StatusChangeEvent) {
        this.invalid = event.status === 'INVALID';
      }

      if (this.touched && this.invalid) {
        this.renderer.addClass(this.elementRef.nativeElement, 'is-invalid');
        this.showErrors(formControl);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, 'is-invalid');
        this.removeErrors(formControl);
      }
    })
  }

  removeErrors(formControl: FormControl) {
    this.validationMessageDivs.forEach(div => this.renderer.removeChild(this.elementRef.nativeElement.parentNode, div));
    this.validationMessageDivs = [];
  }

  showErrors(formControl: FormControl) {
    this.removeErrors(formControl);

    if (formControl.errors) {
      this.validationMessageDivs = Object.keys(formControl.errors).map(errorName => {
        const validationMessageDiv: HTMLDivElement = this.renderer.createElement('div');
        let formControlName = this.ngControl.name + '' ?? '';
        validationMessageDiv.innerText = this.validationMessageServce.getValidationMessage(formControlName, errorName);
        this.renderer.addClass(validationMessageDiv, 'invalid-feedback')
        this.renderer.appendChild(this.elementRef.nativeElement.parentNode, validationMessageDiv);
        return validationMessageDiv;
      })
    }
  }

}
