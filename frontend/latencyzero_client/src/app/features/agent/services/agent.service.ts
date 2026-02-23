import { Injectable, computed, signal } from '@angular/core';
import { ChatSession } from '../interfaces/chatSession.interface';
import { MOCK_CHAT_SESSIONS } from '../mocks/chat-sessions.mock';

@Injectable({ providedIn: 'root' })
export class AgentService {

  // ── State ────────────────────────────────────────────────────────────────

  readonly sidebarOpen = signal(true);
  readonly currentChatId = signal<string | null>(null);
  readonly chatSessions = signal<ChatSession[]>(MOCK_CHAT_SESSIONS);
  readonly isTyping = signal(false);

  // ── Derived ──────────────────────────────────────────────────────────────

  readonly currentSession = computed(() =>
    this.chatSessions().find((s) => s.id === this.currentChatId()) ?? null
  );

  readonly currentMessages = computed(() => this.currentSession()?.messages ?? []);

  readonly groupedSessions = computed(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86_400_000);
    const weekAgo = new Date(today.getTime() - 7 * 86_400_000);
    const monthAgo = new Date(today.getTime() - 30 * 86_400_000);

    const groups: { label: string; sessions: ChatSession[] }[] = [
      { label: 'Hoy', sessions: [] },
      { label: 'Ayer', sessions: [] },
      { label: 'Últimos 7 días', sessions: [] },
      { label: 'Este mes', sessions: [] },
      { label: 'Más antiguo', sessions: [] },
    ];

    for (const session of this.chatSessions()) {
      const d = new Date(
        session.timestamp.getFullYear(),
        session.timestamp.getMonth(),
        session.timestamp.getDate(),
      );
      if (d >= today) groups[0].sessions.push(session);
      else if (d >= yesterday) groups[1].sessions.push(session);
      else if (d >= weekAgo) groups[2].sessions.push(session);
      else if (d >= monthAgo) groups[3].sessions.push(session);
      else groups[4].sessions.push(session);
    }

    return groups.filter((g) => g.sessions.length > 0);
  });

  // ── Actions ──────────────────────────────────────────────────────────────

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  selectChat(id: string): void {
    this.currentChatId.set(id);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      this.sidebarOpen.set(false);
    }
  }

  newChat(): void {
    const id = crypto.randomUUID();
    this.chatSessions.update((sessions) => [
      { id, title: 'Nueva conversación', preview: '', timestamp: new Date(), messages: [] },
      ...sessions,
    ]);
    this.currentChatId.set(id);
  }

  deleteChat(id: string): void {
    this.chatSessions.update((sessions) => sessions.filter((s) => s.id !== id));
    if (this.currentChatId() === id) {
      this.currentChatId.set(null);
    }
  }

  sendMessage(content: string): void {
    const trimmed = content.trim();
    if (!trimmed || this.isTyping()) return;

    const chatId = this.currentChatId();
    if (!chatId) return;

    this.chatSessions.update((sessions) =>
      sessions.map((s) =>
        s.id === chatId
          ? {
              ...s,
              preview: trimmed,
              title: s.messages.length === 0 ? this.generateTitle(trimmed) : s.title,
              messages: [
                ...s.messages,
                { id: crypto.randomUUID(), role: 'user' as const, content: trimmed, timestamp: new Date() },
              ],
            }
          : s,
      ),
    );

    this.isTyping.set(true);

    // Simulated agent reply — replace with real API call
    setTimeout(() => {
      this.chatSessions.update((sessions) =>
        sessions.map((s) =>
          s.id === chatId
            ? {
                ...s,
                messages: [
                  ...s.messages,
                  {
                    id: crypto.randomUUID(),
                    role: 'assistant' as const,
                    content:
                      'Esta es una respuesta simulada del agente IA de LatencyZero. En la implementación real, aquí aparecería la respuesta generada por el modelo de lenguaje para ayudarte a construir tu PC ideal.',
                    timestamp: new Date(),
                  },
                ],
              }
            : s,
        ),
      );
      this.isTyping.set(false);
    }, 2000);
  }

  startWithSuggestion(text: string): void {
    this.newChat();
    setTimeout(() => this.sendMessage(text), 50);
  }

  // ── Utilities ─────────────────────────────────────────────────────────────

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(date);
  }

  private generateTitle(content: string): string {
    return content.length > 40 ? content.slice(0, 40) + '…' : content;
  }
}
