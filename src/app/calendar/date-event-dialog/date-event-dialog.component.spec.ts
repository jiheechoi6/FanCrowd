import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateEventDialogComponent } from './date-event-dialog.component';

describe('DateEventDialogComponent', () => {
  let component: DateEventDialogComponent;
  let fixture: ComponentFixture<DateEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateEventDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
