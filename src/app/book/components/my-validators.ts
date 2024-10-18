import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import moment from 'moment';

// export const correctDate = (control: AbstractControl): ValidationErrors | null => {
//   if (control.value && control.value.match(/(\d{4})-(\d{2})-(\d{2})/)) {
//     const date = new Date(control.value);
//     const dateSplitted = control.value.split('-');
//
//     if (+dateSplitted[0] !== date.getFullYear() || +dateSplitted[1] - 1 !== date.getMonth() || +dateSplitted[2] !== date.getDate()) {
//       return { correctDate: true };
//     }
//   }
//
//   return null;
// }

export class MyValidators {
  static correctDate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.match(/(\d{4})-(\d{2})-(\d{2})/)) {
      const date = new Date(control.value);
      const dateSplitted = control.value.split('-');

      if (+dateSplitted[0] !== date.getFullYear() || +dateSplitted[1] - 1 !== date.getMonth() || +dateSplitted[2] !== date.getDate()) {
        return { correctDate: true };
      }
    }

    return null;
  }

  static dateTo(to: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const date = moment(control.value, 'YYYY-MM-DD', true);
        const dateTo = moment(to, 'YYYY-MM-DD', true);

        if (date.isValid() && dateTo.isValid() && date.isAfter(dateTo)) {
          return {
            dateTo: true
          }
        }
      }
      return null;
    }
  }
}
