import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardvisionLayoutComponent } from './hardvision-layout.component';

describe('HardvisionLayoutComponent', () => {
  let component: HardvisionLayoutComponent;
  let fixture: ComponentFixture<HardvisionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardvisionLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardvisionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
