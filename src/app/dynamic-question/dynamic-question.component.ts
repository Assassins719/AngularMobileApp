import {
    Component,
    Input,
    ChangeDetectorRef
} from '@angular/core';
import {
    FormGroup, FormControl
} from '@angular/forms';

import { Question } from '../models';
import { Key } from 'ts-keycode-enum';


@Component({
    selector: 'dynamic-question',
    templateUrl: './dynamic-question.component.html'
})
export class DynamicQuestionComponent {
    @Input() form: FormGroup;
    @Input() question: Question;

    constructor(private changeDetector: ChangeDetectorRef) {

    }



    get isValid(): boolean {


        return this.form.controls[this.question.id].valid;
    }

    debugTest(): string {
        return JSON.stringify(this.form.controls[this.question.id].errors);

    }
    stringify(obj: any): string {
        return JSON.stringify(obj);
    }

    onKey(event: KeyboardEvent) {
        if (event.keyCode != <number>Key.UpArrow && event.keyCode != <number>Key.DownArrow &&
            event.keyCode != <number>Key.Enter && event.keyCode != <number>Key.Escape) {

            if (this.form.controls[this.question.id].valid) {
                this.form.controls[this.question.id].setErrors({ invalidLocation: true });
                this.form.controls[this.question.id].updateValueAndValidity();
            }

            // this.changeDetector.detectChanges();


        }

    }

    getAddress(place) {
        if (!this.form.contains("gpsLatitude")) {
            this.form.addControl("gpsLatitude", new FormControl(place.geometry.location.lat()));
            this.form.addControl("gpsLongitude", new FormControl(place.geometry.location.lng()));
        }
        else {
            this.form.get("gpsLatitude").setValue(place.geometry.location.lat());
            this.form.get("gpsLongitude").setValue(place.geometry.location.lng());
        }

        // this.form.controls[this.question.id].setValue(
        //     {
        //         location: place.formatted_address,
        //         gpsLatitude: place.geometry.location.lat(),
        //         gpsLongitude: place.geometry.location.lng()
        //     });

        this.form.controls[this.question.id].setValue(place.formatted_address);
        this.form.controls[this.question.id].setErrors(null);

        this.form.controls[this.question.id].markAsTouched();
        this.changeDetector.detectChanges();

        console.log(this.form.controls[this.question.id].valid);
        console.log("Address", place);

        // this.eventFilter.location = place.formatted_address;


        // // console.log("lat: "+place.geometry.location.lat());
        // console.log(this.eventFilter.location);
        // this.eventFilter.gpsLatitude = place.geometry.location.lat();
        // this.eventFilter.gpsLongitude = place.geometry.location.lng();

        // this.filter.emit(this.eventFilter);

    }


}