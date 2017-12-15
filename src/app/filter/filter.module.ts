import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterRoutingModule } from './filter-routing.module';
import { EventDataService } from '../event-data-service';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventFilterHeaderComponent } from './event-filter/event-filter-header/event-filter-header.component';
import { EventFilterListComponent } from './event-filter/event-filter-list/event-filter-list.component';
import { EventListItemComponent } from './event-filter/event-filter-list/event-list-item/event-list-item.component';
import {ApiService} from '../api-service';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { EventDetailsComponent } from './event-filter/event-details/event-details.component';
import {CardComponent} from '../card/card.component';


@NgModule({
  imports: [
    CommonModule,
    FilterRoutingModule,
    FormsModule,
    GooglePlaceModule
  ],
  declarations: [EventFilterComponent,
    EventFilterHeaderComponent,
    EventFilterListComponent,
    EventListItemComponent,
    EventDetailsComponent,
    CardComponent
  ],
  providers: [ApiService,EventDataService]
})
export class FilterModule { }
