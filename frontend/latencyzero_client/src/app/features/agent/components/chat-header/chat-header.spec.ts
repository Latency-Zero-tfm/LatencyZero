import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHeader } from './chat-header';

describe('ChatHeader', () => {
  let component: ChatHeader;
  let fixture: ComponentFixture<ChatHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
