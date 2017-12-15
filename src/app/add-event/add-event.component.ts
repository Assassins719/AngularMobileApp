import { Component, OnInit } from '@angular/core';
import { Question } from '../models';
import { EventDataService } from '../event-data-service';
import { Event } from '../models'
import {
  // FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ValidatorsExtension } from '../validators-extension/validators-extension';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  questions: Question[]

  constructor(private eventDataService: EventDataService) {

    this.questions = [{
      controlType: 'text-input',
      id: 'title',
      label: 'Title',
      validators: [
        ValidatorsExtension.addErrorMessage(Validators.minLength(6), "Enter at least sex characters."),
        ValidatorsExtension.addErrorMessage(Validators.required, "This field is required."),
        ValidatorsExtension.addErrorMessage(Validators.maxLength(50), "Enter max 50 characters.")
      ]
    },
    {
      controlType: 'text-input',
      id: 'production',
      label: 'Production',
      validators: [
        ValidatorsExtension.addErrorMessage(Validators.minLength(6), "Enter at least sex characters."),
        ValidatorsExtension.addErrorMessage(Validators.required, "This field is required."),
        ValidatorsExtension.addErrorMessage(Validators.maxLength(50), "Enter max 50 characters.")
      ]
    },
    {
      controlType: 'text-input',
      id: 'genre',
      label: 'Genre'
    },
    {
      controlType: 'text-input',
      id: 'author',
      label: 'Author'
    },
    {
      controlType: 'place-autocomplete',
      id: 'venue',
      label: 'Venue',
      validators: [ValidatorsExtension.hasError("invalidLocation","Select a valid location.")]
    },
    {
      controlType: 'date',
      type: "date",
      id: 'date',
      label: 'Date',
      validators: [ValidatorsExtension.addErrorMessage(Validators.required, "This field is required.")]

    },
    {
      controlType: 'time',
      type: "time",
      id: 'time',
      label: 'Time',
      validators: [ValidatorsExtension.addErrorMessage(Validators.required, "This field is required.")]

    }
      // {
      //   controlType: 'select',
      //   id: 'third',
      //   options: [
      //     { value: 10, label: "Tio" }
      //   ],
      //   label: 'Third!',
      //   required: true
      // }
    ];

  }

  ngOnInit() {
  }

  //event handler method that is beeing called when user submits the form 
  //this method creates an event of the form values and adds it to db event-table
  onAddEvent(formGroup: FormGroup) {
    // console.log(formGroup);
    // console.log("add-event-component: " + formGroup.value.title);

    //convert to event
    let event: Event = new Event(
      {

        name: formGroup.get('title').value,
        production: formGroup.get('production').value,
        //genre: formGroup.get('genre').value,
        //author: formGroup.get('author').value,
        // // venue: formGroup.get('venue').value,
        lat: formGroup.get('gpsLatitude').value,
        lon: formGroup.get('gpsLongitude').value,



        date: (() => {
          let date = new Date(formGroup.get('date').value);
          let time = formGroup.get('time').value;
          // console.log(time.substring(0, 2)+"\t" + time.substring(3, 5));
          date.setHours(time.substring(0, 2), time.substring(3, 5));

          return date;
        })()

      }

    );

    // console.log("add-event-component: " + JSON.stringify(event));
    // console.log(event.date);

    this.eventDataService
      .addEvent(event)
      .subscribe(
      (event) => {
        console.log("added to db: " + event);
      }
      );
  }

}
