import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryAnalysisResultComponent } from './secondary-analysis-result.component';

describe('SecondaryAnalysisResultComponent', () => {
  let component: SecondaryAnalysisResultComponent;
  let fixture: ComponentFixture<SecondaryAnalysisResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryAnalysisResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryAnalysisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
