import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


// export const compareValidator = (first: string, second: string): ValidatorFn => {
//     return(control: AbstractControl): ValidationErrors | null => {
//         const firstControl = control.get(first);
//         const secondControl = control.get(second);

//         if(secondControl?.value !== firstControl?.value){
//             secondControl?.setErrors({notEqual: true})
//         }
//         return null;
//     };
// };

export function compareValidator(field1: string, field2: string) {
  return function (frm: AbstractControl) {
    let field1Value = frm.get(field1)?.value;
    let field2Value = frm.get(field2)?.value;

    if (field1Value !== '' && field1Value !== field2Value) {
      // Set errors on both password and genPassword controls
      frm.get(field1)?.setErrors({ 'match': `value ${field1Value} is not equal to ${field2Value}` });
      frm.get(field2)?.setErrors({ 'match': `value ${field2Value} is not equal to ${field1Value}` }); // Set matching error on genPassword
      return { 'match': `Passwords do not match` }; // Return error for chaining purposes
    }

    // Clear errors if passwords match or are empty
    frm.get(field1)?.setErrors(null);
    frm.get(field2)?.setErrors(null);

    return null;
  };
}


