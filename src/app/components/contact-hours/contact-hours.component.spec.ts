import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHoursComponent } from './contact-hours.component';

describe('ContactHoursComponent', () => {
  let component: ContactHoursComponent;
  let fixture: ComponentFixture<ContactHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
