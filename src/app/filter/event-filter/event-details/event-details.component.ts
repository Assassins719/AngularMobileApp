import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { EventDataService } from '../../../event-data-service';
import { Event } from '../../../models';
import { CardBox } from '../../../models';
import { CardBoxType } from '../../../models';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: Event;
  cardBoxes: CardBox[];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: EventDataService) {

    this.cardBoxes = [{
      title: "Jesus Christ Superstar",
      type: CardBoxType.BodyBox,      
      classList: ""
    },
    {
      type: CardBoxType.DateBox,
      dateTime: new Date(),
      classList: ""
    }
    ];



  }

  ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let testid = params.get('id');
        return this.service.getEvents("id=" + params.get('id'))
      })
      .subscribe(((events: Event[]) => {
        return this.event = events[0]
      }).bind(this));
  }

}
