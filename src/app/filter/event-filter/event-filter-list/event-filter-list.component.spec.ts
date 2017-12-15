import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterListComponent } from './event-filter-list.component';

describe('EventFilterListComponent', () => {
  let component: EventFilterListComponent;
  let fixture: ComponentFixture<EventFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
