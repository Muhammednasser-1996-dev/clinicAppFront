import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCardItemComponent } from './ads-card-item.component';

describe('AdsCardItemComponent', () => {
  let component: AdsCardItemComponent;
  let fixture: ComponentFixture<AdsCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
