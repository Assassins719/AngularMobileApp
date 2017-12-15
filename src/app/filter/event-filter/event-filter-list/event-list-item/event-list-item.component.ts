import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../../../models';
import { Router } from '@angular/router';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent implements OnInit {

  className: string = '';

  @Input()
  event: Event;

  constructor(private router: Router) { }

  onSelectEvent() {
    this.router.navigate(['/filter/event-details',this.event.id]);
  }

  onMouseEnterOut(eventObj) {

    this.className = eventObj.type == 'mouseenter' ? 'list-group-item-success' : '';
  }

  ngOnInit() {
    
    // let tempEvent = new Event(this.event);
    console.log(this.event.name);

  }

}
