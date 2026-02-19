import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HARD_VISION_ENDPOINT } from '../../../config';
import { ComponentDTO } from '../interfaces/component-dto.interface';

@Injectable({ providedIn: 'root' })
export class HardVisionService {

  private http = inject(HttpClient);

analyzeImage(file: File): Observable<ComponentDTO> {
  const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

  if (!allowedFormats.includes(file.type)) {
    throw new Error('El archivo debe ser JPG, PNG o JPEG');
  }

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post<ComponentDTO>(HARD_VISION_ENDPOINT, formData);
}
}

