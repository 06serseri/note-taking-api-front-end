import { AbstractControl, ValidatorFn } from '@angular/forms';

// export function forbiddenUsernameValidator(
//   control: AbstractControl
// ): { [key: string]: any } | null {
//   const forbidden = /admin/.test(control.value);
//   return forbidden ? { forbiddenUsername: { value: control.value } } : null;
// }

export function forbiddenWordValidator(forbiddenWord: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenWord.test(control.value);
    return forbidden ? { forbiddenWord: { value: control.value } } : null;
  };
}
