import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterComponent } from './filter.component';
import {EventFilterComponent} from './event-filter/event-filter.component';
import {EventFilterListComponent} from './event-filter/event-filter-list/event-filter-list.component';
import {EventDetailsComponent} from './event-filter/event-details/event-details.component';
const routes: Routes = [
  {
    path: 'filter',
    component: FilterComponent,
    children: [
      {
        path:'event-details/:id',
        component:EventDetailsComponent
      },
      {        
        path:'',
        
        component:EventFilterComponent,
        children: [
          {
            path:'event-filter',
            component:EventFilterListComponent
          }

        ]
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule { }
