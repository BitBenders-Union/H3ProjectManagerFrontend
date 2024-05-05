import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const compareValidator = (first: string, second: string): ValidatorFn => {
    return(control: AbstractControl): ValidationErrors | null => {
        const firstControl = control.get(first);
        const secondControl = control.get(second);

        if(secondControl?.value !== firstControl?.value){
            secondControl?.setErrors({notEqual: true})
        }
        return null;
    };
};