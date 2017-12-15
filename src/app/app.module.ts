import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from './filter/filter.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { TestRoute1Component } from './test-route-1/test-route-1.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertModule } from 'ngx-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicQuestionComponent } from './dynamic-question/dynamic-question.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FilterComponent } from './filter/filter.component';
import { DateBoxComponent } from './card/date-box/date-box.component';
import { ImageBoxComponent } from './card/image-box/image-box.component';
import { BodyBoxComponent } from './card/body-box/body-box.component';
import { EditComponent } from './edit/edit.component';
import { VenuesComponent } from './edit/venues/venues.component';
import { VenueComponent } from './edit/venues/venue/venue.component';
import { ArtistComponent } from './edit/artists/artist/artist.component';
import { ArtistsComponent } from './edit/artists/artists.component';
import { WorkComponent } from './edit/artists/artist/work/work.component';

import { ProductComponent } from './edit/product/product.component';
import { EventComponent } from './edit/product/event/event.component';
import { WorksComponent } from './edit/product/works/works.component';

import { GlobalshareService } from './globalshare.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

const appRoutes: Routes = [
  { path: 'test-route-1', component: TestRoute1Component },
  { path: 'add-event', component: AddEventComponent },
  { path: 'edit', component:EditComponent},
  { path: 'edit/artists', component:ArtistsComponent},
  { path: 'edit/artist/:new/:id', component:ArtistComponent},
  { path: 'edit/works/:new/:id/:artistid', component:WorkComponent},
  { path: 'edit/venues', component:VenuesComponent},
  { path: 'edit/venue/:new/:id', component:VenueComponent},  

  { path: 'edit/product', component:ProductComponent},
  { path: 'edit/product/event', component:EventComponent},
  { path: 'edit/product/works', component:WorksComponent},
  
//this.router.navigate(['/sleep', item.startTime, item.datasetId]); 

  {
    path: '',
    redirectTo: '/filter',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestRoute1Component,
    PageNotFoundComponent,
    NavbarComponent,
    DynamicFormComponent,
    DynamicQuestionComponent,
    AddEventComponent,
    FilterComponent,     
    DateBoxComponent,
    ImageBoxComponent,
    BodyBoxComponent,
    EditComponent,
    VenuesComponent,
    VenueComponent,
    ArtistComponent,
    ArtistsComponent,
    WorkComponent,
    ProductComponent,
    EventComponent,
    WorksComponent

  ],
  imports: [
    FilterModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD1WPHRi52W57xQTukDWgI-qbb_2gDxuXQ",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MultiselectDropdownModule,
    AlertModule.forRoot()

  ],
  providers: [GlobalshareService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
