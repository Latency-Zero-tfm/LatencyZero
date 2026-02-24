import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';
import { TypingAnimation } from '../../../../shared/components/typing-animation/typing-animation';
import { SuggestionChips } from "../suggestion-chips/suggestion-chips";

@Component({
  selector: 'messages-area',
  imports: [TypingAnimation, SuggestionChips],
  templateUrl: './messages-area.html',
  styleUrl: './messages-area.css',
  host: { class: 'flex flex-1 min-h-0 overflow-hidden' },
})
export class MessagesArea {

  protected readonly s = inject(AgentService);

}
