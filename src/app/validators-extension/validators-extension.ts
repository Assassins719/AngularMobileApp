import { Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


export class ValidatorsExtension extends Validators {


    static addErrorMessage(vfunc: ValidatorFn, mess: string): ValidatorFn {

        return (c: AbstractControl) => {

            let valErrors = vfunc(c);
            if (valErrors) {
                // for (let key in valErrors) {
                //     valErrors[key].errorMessage = mess;
                // }
                valErrors.errorMessage = mess;
                return valErrors;
            }
            else
                return null;
        }

    }

    static hasError(errorCode: string, errorMessage:string) {
        return (c: AbstractControl) => {

            
            if (c.errors && c.errors[errorCode]) {
                // for (let key in valErrors) {
                //     valErrors[key].errorMessage = mess;
                // }
                c.errors.errorMessage = errorMessage;
                return c.errors;
            }
            

        }


    }

}