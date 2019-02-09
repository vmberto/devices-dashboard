import { AbstractControl, FormControl } from '@angular/forms';
import { EMAIL_REGEX, NAME_REGEX } from 'src/app/utils/app.utils';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        const confirmPassword = AC.get('confirmPassword').value;
        if (password != confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true })
        } else {
            return null;
        }
    }

}


const validEmail = (email: string): boolean => {
    return (!email) ? true : EMAIL_REGEX.test(email);
};
const validName = (name: string): boolean => {
    return (!name) ? true : NAME_REGEX.test(name);
};

export function emailValidator(control: FormControl): { [key: string]: boolean } {
    return validEmail(control.value) ? null : { 'emailValidator': true };
}

export function nameValidator(control: FormControl): { [key: string]: boolean } {
    return validName(control.value) ? null : { 'nameValidator': true };
}

export function updateTimeValidator(control: FormControl) {
    setTimeout(() => {
        if (control.value > 30) {
            control.setValue(30);
        } else if (control.value < 5) {
            control.setValue(5);
        }
    }, 800);
    return control.value < 30 && control.value > 5 ? Promise.resolve(true) : Promise.resolve(false); 

}


