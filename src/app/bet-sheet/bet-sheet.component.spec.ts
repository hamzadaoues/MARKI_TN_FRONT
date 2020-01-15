import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSheetComponent } from './bet-sheet.component';

describe('BetSheetComponent', () => {
  let component: BetSheetComponent;
  let fixture: ComponentFixture<BetSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
