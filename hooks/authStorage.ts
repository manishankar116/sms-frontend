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

export const clearToken = async () => {
  await AsyncStorage.removeItem(JWT_STORAGE_KEY);
};
