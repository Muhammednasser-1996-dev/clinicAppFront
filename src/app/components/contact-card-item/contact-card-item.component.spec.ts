import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardItemComponent } from './contact-card-item.component';

describe('ContactCardItemComponent', () => {
  let component: ContactCardItemComponent;
  let fixture: ComponentFixture<ContactCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
