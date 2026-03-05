import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameComponent } from '../../components/game.component/game.component';
import { AboutUsComponent } from "../../components/about-us.component/about-us.component";
import { AgentInfoComponent } from "../../components/agent-info.component/agent-info.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, CommonModule, GameComponent, AboutUsComponent, AgentInfoComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
