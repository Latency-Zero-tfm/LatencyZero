import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionService, OpinionOut } from '../../../features/analysis-sentiment/services/opinion.service';

@Component({
  selector: 'app-analysis-sentiment-page',
  imports: [CommonModule],
  templateUrl: './analysis-sentiment-page.html',
  styleUrl: './analysis-sentiment-page.css',
})
export class AnalysisSentimentPage implements OnInit {

  private opinionService = inject(OpinionService);

  opinions: OpinionOut[] = [];
  loading = true;
  error = false;

  get positive() { return this.opinions.filter(o => o.sentiment_label === 'positive').length; }
  get neutral()  { return this.opinions.filter(o => o.sentiment_label === 'neutral').length; }
  get negative() { return this.opinions.filter(o => o.sentiment_label === 'negative').length; }

  pct(n: number): string {
    if (!this.opinions.length) return '0';
    return ((n / this.opinions.length) * 100).toFixed(0);
  }

  labelColor(label?: string): string {
    if (label === 'positive') return 'text-emerald-400 bg-emerald-400/10 border-emerald-500/30';
    if (label === 'negative') return 'text-red-400 bg-red-400/10 border-red-500/30';
    return 'text-slate-400 bg-slate-400/10 border-slate-600/30';
  }

  labelText(label?: string): string {
    if (label === 'positive') return 'Positivo';
    if (label === 'negative') return 'Negativo';
    return 'Neutro';
  }

  ngOnInit(): void {
    this.opinionService.getAll().subscribe({
      next: (data) => { this.opinions = data; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}

