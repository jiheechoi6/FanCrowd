import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioEditDialogComponent } from './bio-edit-dialog.component';

describe('BioEditDialogComponent', () => {
  let component: BioEditDialogComponent;
  let fixture: ComponentFixture<BioEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
