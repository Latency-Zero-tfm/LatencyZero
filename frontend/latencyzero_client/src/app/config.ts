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
