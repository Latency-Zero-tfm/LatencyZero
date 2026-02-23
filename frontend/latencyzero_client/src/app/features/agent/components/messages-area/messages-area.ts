import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'messages-area',
  imports: [],
  templateUrl: './messages-area.html',
  styleUrl: './messages-area.css',
  host: { class: 'flex flex-1 min-h-0 overflow-hidden' },
})
export class MessagesArea {

  protected readonly s = inject(AgentService);

}
