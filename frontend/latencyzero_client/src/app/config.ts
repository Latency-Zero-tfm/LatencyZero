import { environments } from '../environments/environments';

export const BASE_URL = environments.baseUrl;

// Auth endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;
export const LOGOUT_ENDPOINT = `${BASE_URL}/auth/logout`;

// Components endpoints
export const HARD_VISION_ENDPOINT = `${BASE_URL}/components/analyze`;

// Opinions endpoints
export const OPINIONS_ENDPOINT = `${BASE_URL}/opinions`;

// Agents endpoints
export const CREATE_CHAT = `${BASE_URL}/chat/`;
export const GET_CHATS = `${BASE_URL}/chat/`; // {session_id}
export const CREATE_SESSION = `${BASE_URL}/session/create`;
export const GET_SESSIONS = `${BASE_URL}/session/sessions`;
export const DELETE_SESSION = `${BASE_URL}/session/delete/`; // {session_id}
