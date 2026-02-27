import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CREATE_CHAT, CREATE_SESSION, DELETE_SESSION, GET_SESSIONS } from '../../../config';
import { CreateSessionResponse } from '../interfaces/createSessionResponse.interface';
import { ChatResponse } from '../interfaces/chatResponse.interface';
import { DeleteSessionResponse, SessionsResponse } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root',
})
export class AgentHttpService {
  private http = inject(HttpClient);

  create_session(username: string, password: string): Observable<CreateSessionResponse> {
    return this.http
      .post<CreateSessionResponse>(
        CREATE_SESSION,
        { username, password },
        { withCredentials: true },
      )
      .pipe(
        catchError((error) => {
          console.error('Create session error:', error);
          return throwError(() => error);
        }),
      );
  }

  createMessage(
    session_id: number,
    user_message: string,
    tools_mode: 'llm' | 'ml_model',
    user_file: File | null,
  ): Observable<ChatResponse> {
    const formData = new FormData();

    formData.append('session_id', String(session_id));
    formData.append('user_message', user_message);
    formData.append('tools_mode', tools_mode);

    if (user_file) {
      formData.append('user_file', user_file);
    }

    return this.http.post<ChatResponse>(CREATE_CHAT, formData, { withCredentials: true });
  }

  getMessages(session_id: number): Observable<ChatResponse[]> {
    return this.http.get<ChatResponse[]>(`${CREATE_CHAT}${session_id}`, { withCredentials: true });
  }

  getMySessions(): Observable<SessionsResponse> {
    return this.http.get<SessionsResponse>(`${GET_SESSIONS}`, { withCredentials: true });
  }

  deleteSession(session_id: number): Observable<DeleteSessionResponse> {
    return this.http.delete<DeleteSessionResponse>(`${DELETE_SESSION}${session_id}`, {
      withCredentials: true,
    });
  }
}
