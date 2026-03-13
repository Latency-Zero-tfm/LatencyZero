import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  github: string;
  linkedin: string;
  image: string;
}

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  team: TeamMember[] = [
    {
      name: 'Alejandro Barrionuevo Rosado',
      github: 'https://github.com/Alejandro-BR',
      linkedin: 'https://www.linkedin.com/in/alejandro-barrionuevo-rosado/',
      image: 'https://github.com/Alejandro-BR.png',
    },
    {
      name: 'Álvaro López Guerrero',
      github: 'https://github.com/Alvalogue72',
      linkedin: 'https://www.linkedin.com/in/%C3%A1lvaro-l%C3%B3pez-guerrero-490891302/',
      image: 'https://github.com/Alvalogue72.png',
    },
    {
      name: 'Andrei Munteanu Popa',
      github: 'https://github.com/andu8705',
      linkedin: 'https://www.linkedin.com/in/andrei-munteanu-popa/',
      image: 'https://github.com/andu8705.png',
    },
  ];
}
