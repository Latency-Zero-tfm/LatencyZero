import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingAnimation } from './typing-animation';

describe('TypingAnimation', () => {
  let component: TypingAnimation;
  let fixture: ComponentFixture<TypingAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypingAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
