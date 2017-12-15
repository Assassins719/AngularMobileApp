import { ValidatorFn } from '@angular/forms';

export interface Question {
    controlType: string;
    id: string;
    label: string;
    options?: Array<any>;
    validators?: ValidatorFn[];
    type?: string;
    value?: any;
}