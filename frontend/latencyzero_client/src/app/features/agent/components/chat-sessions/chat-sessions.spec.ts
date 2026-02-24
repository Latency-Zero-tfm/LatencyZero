import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSessions } from './chat-sessions';

describe('ChatSessions', () => {
  let component: ChatSessions;
  let fixture: ComponentFixture<ChatSessions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSessions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSessions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
