import AsyncStorage from '@react-native-async-storage/async-storage';

// This is only the AsyncStorage key name where the backend JWT is saved.
// The actual token value comes from /api/auth/login response (payload.token).
const JWT_STORAGE_KEY = 'jwtToken';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(JWT_STORAGE_KEY, token);
  } catch (error) {
    console.log('Error saving token', error);
  }
};

export const getToken = async () => {
  return AsyncStorage.getItem(JWT_STORAGE_KEY);
};

const decodeJwtPayload = (token: string) => {
  const parts = token.split('.');

  if (parts.length < 2) {
    return null;
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const normalized = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const payload = JSON.parse(atob(normalized));
    return payload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;

  if (typeof exp !== 'number') {
    return true;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return exp <= nowInSeconds;
};

export const getValidToken = async () => {
  const token = await getToken();

  if (!token) {
    return null;
  }

  if (isTokenExpired(token)) {
    await clearToken();
    return null;
  }

  return token;
};

export const clearToken = async () => {
  await AsyncStorage.removeItem(JWT_STORAGE_KEY);
};
