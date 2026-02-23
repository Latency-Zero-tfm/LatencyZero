import { Component, ViewChild, ElementRef, AfterViewChecked, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSessions } from '../../components/chat-sessions/chat-sessions';
import { AgentService } from '../../services/agent.service';
import { ChatHeader } from "../../components/chat-header/chat-header";

@Component({
  selector: 'app-agent-page',
  imports: [FormsModule, ChatSessions, ChatHeader],
  templateUrl: './agent-page.html',
  styleUrl: './agent-page.css',
  host: { class: 'flex flex-1 min-h-0 overflow-hidden' },
})
export class AgentPage implements AfterViewChecked {
  @ViewChild('messagesEnd') messagesEnd!: ElementRef<HTMLDivElement>;

  protected readonly s = inject(AgentService);
  newMessage = '';
  private shouldScrollToBottom = false;

  constructor() {
    // Scroll to bottom whenever messages change or typing state changes
    effect(() => {
      this.s.currentMessages();
      this.s.isTyping();
      this.shouldScrollToBottom = true;
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesEnd?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }

  send(): void {
    if (!this.newMessage.trim() || this.s.isTyping()) return;
    this.s.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  }
}
