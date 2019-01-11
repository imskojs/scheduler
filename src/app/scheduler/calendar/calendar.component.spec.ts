import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    const calendarServiceMock = jasmine.createSpyObj('CalendarService', [
      'TODO'
    ]);
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      providers: [
        { provide: CalendarService, useValue: calendarServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
