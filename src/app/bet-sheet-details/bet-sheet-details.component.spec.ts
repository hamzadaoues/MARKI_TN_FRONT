import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSheetDetailsComponent } from './bet-sheet-details.component';

describe('BetSheetDetailsComponent', () => {
  let component: BetSheetDetailsComponent;
  let fixture: ComponentFixture<BetSheetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetSheetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
