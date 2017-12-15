import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFilterHeaderComponent } from './event-filter-header.component';

describe('EventFilterHeaderComponent', () => {
  let component: EventFilterHeaderComponent;
  let fixture: ComponentFixture<EventFilterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFilterHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
