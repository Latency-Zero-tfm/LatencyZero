import { ChatMessage } from "./chatMessage.interface";

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messages: ChatMessage[];
}
