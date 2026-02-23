import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'chat-header',
  imports: [],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.css',
})
export class ChatHeader {

  protected readonly s = inject(AgentService);

}
