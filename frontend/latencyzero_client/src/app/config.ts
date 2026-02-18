import { environments } from '../environments/environments';

export const BASE_URL = environments.baseUrl;

export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
