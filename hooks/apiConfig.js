import Constants from 'expo-constants';
import { Platform } from 'react-native';

const DEFAULT_PORT = '8080';

const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const trimmed = trimTrailingSlash(value.trim());
  if (!trimmed) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `http://${trimmed}`;
};

const extractHost = () => {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.expoGoConfig?.debuggerHost,
    Constants.manifest2?.extra?.expoGo?.debuggerHost,
    Constants.manifest?.debuggerHost,
    Constants.linkingUri,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const match = String(candidate).match(/(?:^|:\/\/)([^/:?#]+)(?::(\d+))?/i);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
};

export const getApiBaseUrls = () => {
  const urls = [];

  const pushUrl = (value) => {
    const normalized = normalizeBaseUrl(value);
    if (normalized && !urls.includes(normalized)) {
      urls.push(normalized);
    }
  };

  pushUrl(process.env.EXPO_PUBLIC_API_BASE_URL);

  if (Platform.OS === 'android') {
    pushUrl(`http://10.0.2.2:${DEFAULT_PORT}`);
  }

  const expoHost = extractHost();
  if (expoHost) {
    pushUrl(`http://${expoHost}:${DEFAULT_PORT}`);
  }

  if (Platform.OS === 'web') {
    pushUrl(`http://127.0.0.1:${DEFAULT_PORT}`);
  }

  pushUrl(`http://localhost:${DEFAULT_PORT}`);

  return urls;
};

export const getApiConnectionHelpText = () => {
  const configuredBaseUrl = normalizeBaseUrl(process.env.EXPO_PUBLIC_API_BASE_URL);

  if (configuredBaseUrl) {
    return `Unable to reach server at ${configuredBaseUrl}. Please confirm your backend is running and reachable from this device.`;
  }

  return "Unable to reach server. If you are testing on a phone, set EXPO_PUBLIC_API_BASE_URL to your laptop's Wi-Fi IP (for example http://192.168.1.10:8080) and restart Expo.";
};
