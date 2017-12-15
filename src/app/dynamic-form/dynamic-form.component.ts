import {
    Component,
    Input,
    Output,
    OnInit,
    EventEmitter
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';

import { Question } from '../models';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {

    @Input() questions: Array<Question>;

    @Output()
    submitDynamicForm: EventEmitter<FormGroup> = new EventEmitter();



    formGroup: FormGroup;
    payload: string;

    ngOnInit() {
        this.formGroup = this.generateForm(this.questions || []);
    }

    private generateForm(questions: Array<Question>): FormGroup {
        const formControls = questions.reduce(this.generateControl, {});

        return new FormGroup(formControls);
    }

    private generateControl(controls: any, question: Question) {
        if (question.validators) {
            controls[question.id] = new FormControl(question.value || '', question.validators);
        } else {
            controls[question.id] = new FormControl(question.value || '');
        }

         if (question.controlType =="place-autocomplete")
             (<FormControl>controls[question.id]).setErrors({ invalidLocation: true });


        return controls;
    }

    submitForm() {
        this.payload = JSON.stringify(this.formGroup.value);
        this.submitDynamicForm.emit(this.formGroup);
    }

}