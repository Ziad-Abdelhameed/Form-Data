import { AbstractControl } from '@angular/forms';

export function forbiddenUserName(control: AbstractControl) {
  const forbidden = /admin/.test(control.value);

  return forbidden ? { forbiddenName: { value: control.value } } : null;
}
