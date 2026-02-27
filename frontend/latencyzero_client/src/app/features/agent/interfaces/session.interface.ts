export interface ChatSession {
  id: number;
  session_name: string;
  create_at: string;
  update_at: string;
}

export interface SessionsResponse {
  sessions: ChatSession[];
}

export interface DeleteSessionResponse {
  detail: string;
}
