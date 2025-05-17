// email.validator.ts
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RegisterService } from '../services/register.service';

export function emailExistsValidator(userService: RegisterService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(email => userService.checkEmailIfExists(email)),
      map(exists => (exists ? { emailExists: true } : null)),
      first()
    );
  };
}
