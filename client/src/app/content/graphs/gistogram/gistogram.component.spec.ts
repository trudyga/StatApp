import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GistogramComponent } from './gistogram.component';

describe('GistogramComponent', () => {
  let component: GistogramComponent;
  let fixture: ComponentFixture<GistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GistogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
