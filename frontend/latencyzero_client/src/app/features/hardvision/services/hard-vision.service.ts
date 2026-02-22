import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HARD_VISION_ENDPOINT } from '../../../config';
import { ComponentDTO } from '../interfaces/component-dto.interface';

@Injectable({ providedIn: 'root' })
export class HardVisionService {

  private http = inject(HttpClient);

  analyzeImage(file: File): Observable<ComponentDTO> {

    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

    if (!allowedFormats.includes(file.type)) {
      return throwError(() => new Error('El archivo debe ser JPG, PNG o WEBP'));
    }

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ComponentDTO>(HARD_VISION_ENDPOINT, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          let message = 'Error inesperado al analizar la imagen';

          if (error.status === 0) {
            message = 'No se pudo conectar con el servidor';
          }

          if (error.status === 400) {
            message = 'Solicitud inválida';
          }

          if (error.status === 500) {
            message = 'Error interno del servidor';
          }

          return throwError(() => new Error(message));
        })
      );
  }
}
