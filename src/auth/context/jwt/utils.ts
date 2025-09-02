import axios from '@/utils/axios';
import { paths } from '@/routes/paths';

import { STORAGE_KEY, STORAGE_USER, STORAGE_ACCESS_TOKEN } from './constant';

// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length < 2) {
      throw new Error('Invalid token!');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export function isValidToken(accessToken: string) {
  if (!accessToken) {
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);

    if (!decoded || !('exp' in decoded)) {
      return false;
    }

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error during token validation:', error);
    return false;
  }
}

// ----------------------------------------------------------------------

export function tokenExpired(exp: number) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      alert('Token expired!');
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = paths.auth.signIn;
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}

// ----------------------------------------------------------------------

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      sessionStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem(STORAGE_ACCESS_TOKEN);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
export async function setLocalStorage(accessToken: string | null, user: string | null) {
  try {
    if (accessToken) {
      localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem(STORAGE_ACCESS_TOKEN);
      delete axios.defaults.headers.common.Authorization;
    }
    if (user) {
      localStorage.setItem(STORAGE_USER, user);
    } else {
      localStorage.removeItem(STORAGE_USER);
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}
