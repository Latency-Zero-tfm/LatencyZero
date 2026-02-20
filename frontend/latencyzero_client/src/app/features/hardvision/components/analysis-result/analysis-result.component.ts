import { Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentDTO } from '../../interfaces/component-dto.interface';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'analysis-result',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './analysis-result.component.html',
  styleUrl: './analysis-result.component.css',
})
export class AnalysisResultComponent {
  isLoading = input<boolean>(false);
  analysisResult = input<ComponentDTO | null>(null);

  constructor() {
    Chart.register(...registerables);

    effect(() => {
      const result = this.analysisResult();

      if (result?.confidences) {
        const entries = Object.entries(result.confidences).sort((a, b) => b[1] - a[1]);

        const colors = [
          '#3B82F6',
          '#EF4444',
          '#10B981',
          '#F59E0B',
          '#8B5CF6',
          '#EC4899',
          '#06B6D4',
          '#84CC16',
          '#F97316',
          '#6366F1',
          '#14B8A6',
          '#D946EF',
          '#0EA5E9',
          '#22C55E',
          '#FB923C',
        ];

        const hoverColors = [
          '#60A5FA',
          '#F87171',
          '#34D399',
          '#FBBF24',
          '#A78BFA',
          '#F472B6',
          '#22D3EE',
          '#A3E635',
          '#FB923C',
          '#818CF8',
          '#2DD4BF',
          '#E879F9',
          '#38BDF8',
          '#4ADE80',
          '#FDBA74',
        ];

        this.pieChartData = {
          labels: entries.map((e) => e[0]),
          datasets: [
            {
              data: entries.map((e) => e[1] * 100),
              backgroundColor: entries.map((_, i) => colors[i % colors.length]),
              hoverBackgroundColor: entries.map((_, i) => hoverColors[i % hoverColors.length]),
              borderColor: '#0F172A',
              borderWidth: 2,
            },
          ],
        };
      }
    });
  }

  // Datos de la tarta
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }],
  };

  // Opciones de la tarta
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#E2E8F0',
          font: { weight: 'bold', size: 12 },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#60A5FA',
        bodyColor: '#FFFFFF',
        borderColor: '#3B82F6',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  copyToClipboard() {
    const result = this.analysisResult();
    if (result) {
      navigator.clipboard
        .writeText(JSON.stringify(result, null, 2))
        .then(() => console.log('JSON copiado'))
        .catch((err) => console.error('Error al copiar:', err));
    }
  }

  downloadJSON() {
    const result = this.analysisResult();
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `analysis-${Date.now()}.json`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
}
