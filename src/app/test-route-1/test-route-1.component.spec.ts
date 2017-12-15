import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRoute1Component } from './test-route-1.component';

describe('TestRoute1Component', () => {
  let component: TestRoute1Component;
  let fixture: ComponentFixture<TestRoute1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRoute1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRoute1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
