import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'chat-sessions',
  imports: [],
  templateUrl: './chat-sessions.html',
  styleUrl: './chat-sessions.css',
})
export class ChatSessions {
  protected readonly s = inject(AgentService);

  deleteChat(id: string, event: Event): void {
    event.stopPropagation();
    this.s.deleteChat(id);
  }
}
