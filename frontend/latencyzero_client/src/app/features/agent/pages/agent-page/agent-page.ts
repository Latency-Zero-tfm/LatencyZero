import { Component, ViewChild, ElementRef, AfterViewChecked, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSessions } from '../../components/chat-sessions/chat-sessions';
import { AgentService } from '../../services/agent.service';
import { ChatHeader } from "../../components/chat-header/chat-header";
import { ChatInput } from "../../components/chat-input/chat-input";

@Component({
  selector: 'app-agent-page',
  imports: [FormsModule, ChatSessions, ChatHeader, ChatInput],
  templateUrl: './agent-page.html',
  styleUrl: './agent-page.css',
  host: { class: 'flex flex-1 min-h-0 overflow-hidden' },
})
export class AgentPage {

  protected readonly s = inject(AgentService);

}
