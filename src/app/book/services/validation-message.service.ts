import { Injectable } from '@angular/core';

interface Messages {
  [formControlName: string]: {
    [errorName: string]: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ValidationMessageService {

  private readonly messages: Messages = {
    title: {
      required: 'Pleade provide a title'
    },
    author: {
      required: 'Pleade provide an author'
    },
    dateOfPublication: {
      required: 'Pleade provide a date of publication',
      pattern: 'Pleade provide a correct date of publication in format YYYY-MM-DD',
      correctDate: 'Pleade provide a correct date of publication',
      dateTo: 'Pleade provide a date of publication same or before 2030-01-01'
    }
  }

  getValidationMessage(formControlName: string, errorName: string): string {
    if (this.messages[formControlName]) {
      return this.messages[formControlName][errorName];
    }
    return '';
  }
}
