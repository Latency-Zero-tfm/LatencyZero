import { Component, inject, signal } from '@angular/core';
import { ImageInputComponent } from "../../components/image-input-component/image-input-component";
import { AnalysisResultComponent } from "../../components/analysis-result/analysis-result.component";
import { HardVisionService } from '../../services/hard-vision.service';
import { ComponentDTO } from '../../interfaces/component-dto.interface';
import { CommonModule } from '@angular/common';
import { NgToastComponent } from 'ng-angular-popup';

@Component({
  imports: [ImageInputComponent, AnalysisResultComponent, CommonModule, NgToastComponent],
  templateUrl: './hard-vision-page.html',
  styleUrl: './hard-vision-page.css',
  selector: 'hard-vision-page',
})
export class HardVisionPage {

  private hardVisionService = inject(HardVisionService);

  isLoading = signal(false);
  analysisResult = signal<ComponentDTO | null>(null);

  handleImageRemoved() {
    this.analysisResult.set(null);
    this.isLoading.set(false);
  }

  handleAnalysis(file: File) {
    console.log('Iniciando análisis para:', file.name);

    this.isLoading.set(true);
    this.analysisResult.set(null);

    this.hardVisionService.analyzeImage(file).subscribe({
      next: (response) => {
        console.log('Análisis completado:', response);
        this.analysisResult.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error en el análisis:', error);
        this.analysisResult.set(null);
        this.isLoading.set(false);
      }
    });
  }

}
