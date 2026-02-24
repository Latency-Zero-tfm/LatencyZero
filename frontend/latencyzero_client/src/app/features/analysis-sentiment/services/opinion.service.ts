import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OPINIONS_ENDPOINT } from '../../../config';

export interface OpinionCreate {
  name?: string;
  message: string;
}

export interface OpinionOut {
  id: number;
  name?: string;
  message: string;
  sentiment_label?: 'positive' | 'neutral' | 'negative';
  sentiment_score?: number;
  create_at: string;
}

@Injectable({ providedIn: 'root' })
export class OpinionService {
  private http = inject(HttpClient);

  submit(opinion: OpinionCreate): Observable<OpinionOut> {
    return this.http.post<OpinionOut>(OPINIONS_ENDPOINT, opinion);
  }

  getAll(): Observable<OpinionOut[]> {
    return this.http.get<OpinionOut[]>(OPINIONS_ENDPOINT);
  }
}
