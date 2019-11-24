import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveNewsDetailsComponent } from './live-news-details.component';

describe('LiveNewsDetailsComponent', () => {
  let component: LiveNewsDetailsComponent;
  let fixture: ComponentFixture<LiveNewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveNewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
