import { Component, inject, signal } from '@angular/core';
import { ImageInputComponent } from "../../components/image-input-component/image-input-component";
import { AnalysisResultComponent } from "../../components/analysis-result/analysis-result.component";
import { HardVisionService } from '../../services/hard-vision.service';
import { ComponentDTO } from '../../interfaces/component-dto.interface';
import { CommonModule } from '@angular/common';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { finalize } from 'rxjs';

@Component({
  imports: [ImageInputComponent, AnalysisResultComponent, CommonModule, NgToastComponent],
  templateUrl: './hard-vision-page.html',
  styleUrl: './hard-vision-page.css',
  selector: 'hard-vision-page',
})
export class HardVisionPage {

  private hardVisionService = inject(HardVisionService);

  private toast = inject(NgToastService);

  isLoading = signal(false);
  analysisResult = signal<ComponentDTO | null>(null);

  handleImageRemoved() {
    this.analysisResult.set(null);
    this.isLoading.set(false);
  }

handleAnalysis(file: File) {

  this.isLoading.set(true);
  this.analysisResult.set(null);

  this.hardVisionService.analyzeImage(file)
    .pipe(
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response) => {
        this.analysisResult.set(response);
      },
      error: (error) => {

        this.analysisResult.set(null);

        this.toast.danger('No se pudo analizar la imagen');
      }
    });
}

}
