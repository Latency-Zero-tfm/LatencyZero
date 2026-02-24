import { Component, inject } from '@angular/core';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'suggestion-chips',
  imports: [],
  templateUrl: './suggestion-chips.html',
  styleUrl: './suggestion-chips.css',
})
export class SuggestionChips {

  protected readonly s = inject(AgentService);

}
