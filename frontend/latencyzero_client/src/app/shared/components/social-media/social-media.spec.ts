import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMedia } from './social-media';

describe('SocialMedia', () => {
  let component: SocialMedia;
  let fixture: ComponentFixture<SocialMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
