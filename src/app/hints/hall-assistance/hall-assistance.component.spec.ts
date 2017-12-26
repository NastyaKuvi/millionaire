import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallAssistanceComponent } from './hall-assistance.component';

describe('HallAssistanceComponent', () => {
  let component: HallAssistanceComponent;
  let fixture: ComponentFixture<HallAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
