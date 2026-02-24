import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisSentimentPage } from './analysis-sentiment-page';

describe('AnalysisSentimentPage', () => {
  let component: AnalysisSentimentPage;
  let fixture: ComponentFixture<AnalysisSentimentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisSentimentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisSentimentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
