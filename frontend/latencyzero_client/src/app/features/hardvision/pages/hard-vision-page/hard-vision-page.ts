import { Component } from '@angular/core';
import { ImageInputComponent } from "../../components/image-input-component/image-input-component";

@Component({
  imports: [ImageInputComponent],
  templateUrl: './hard-vision-page.html',
  styleUrl: './hard-vision-page.css',
})
export class HardVisionPage {

  handleAnalysis(file: File) {
    console.log('Iniciando análisis para:', file.name);
    // TODO: Implementar lógica de análisis, posiblemente llamando a un servicio que se comunique con el backend
  }

}
