import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardVisionPage } from './hard-vision-page';

describe('HardVisionPage', () => {
  let component: HardVisionPage;
  let fixture: ComponentFixture<HardVisionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardVisionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardVisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
