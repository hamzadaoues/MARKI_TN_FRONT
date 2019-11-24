import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsToPlayComponent } from './steps-to-play.component';

describe('StepsToPlayComponent', () => {
  let component: StepsToPlayComponent;
  let fixture: ComponentFixture<StepsToPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsToPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
