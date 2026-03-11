import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZWFjaGVyMSIsImlhdCI6MTc3MzI0MzIwNCwiZXhwIjoxNzczMzI5NjA0fQ.EpXWwDnVFJG-mVBTXf-CkKVaru9LW9hwgfxfUE8vDgg';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('Error saving token', error);
  }
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const clearToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};
