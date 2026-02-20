import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDTO } from '../../interfaces/component-dto.interface';

@Component({
  selector: 'analysis-result',
  imports: [CommonModule],
  templateUrl: './analysis-result.component.html',
  styleUrl: './analysis-result.component.css',
})
export class AnalysisResultComponent {
  isLoading = input<boolean>(false);
  analysisResult = input<ComponentDTO | null>(null);

  copyToClipboard() {
    const result = this.analysisResult();
    if (result) {
      const jsonString = JSON.stringify(result, null, 2);
      navigator.clipboard.writeText(jsonString).then(() => {
        console.log('JSON copiado al portapapeles');
      }).catch(err => {
        console.error('Error al copiar al portapapeles:', err);
      });
    }
  }

  downloadJSON() {
    const result = this.analysisResult();
    if (result) {
      const jsonString = JSON.stringify(result, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analysis-${new Date().getTime()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      console.log('JSON descargado');
    }
  }
}
