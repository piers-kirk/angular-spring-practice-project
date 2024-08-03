import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateNotFutureValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const today = new Date();
    const selectedDate = new Date(control.value);

    if (control.value && selectedDate > today) {
      return { dateNotFuture: true };
    }
    return null;
  };
}
