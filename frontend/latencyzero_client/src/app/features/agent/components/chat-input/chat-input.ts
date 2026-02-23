import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-input',
  imports: [FormsModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.css',
})
export class ChatInput {

  protected readonly s = inject(AgentService);
  newMessage = '';

  send(el: HTMLTextAreaElement): void {
    if (!this.newMessage.trim() || this.s.isTyping()) return;
    this.s.sendMessage(this.newMessage);
    this.newMessage = '';
    el.style.height = 'auto';
  }

  onKeydown(event: KeyboardEvent, el: HTMLTextAreaElement): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send(el);
    }
  }

  autoResize(el: HTMLTextAreaElement): void {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }

}
