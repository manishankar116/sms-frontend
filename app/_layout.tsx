import { DarkTheme, DefaultTheme, getFocusedRouteNameFromRoute, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { DataProvider } from '@/hooks/DataContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <DataProvider>

        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: '#5f67d9',
          },
          headerTintColor: '#f9f5f5'
          
          }}>
            
          <Stack.Screen name="(tabs)"   options={({ route }) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? "home";

              return {
                headerShown: true,
                headerTitle: routeName.charAt(0).toUpperCase() + routeName.slice(1),
              };
            }} 
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        
        </Stack>


      <StatusBar style="auto" />
      
      </DataProvider>
      
    </ThemeProvider>
  );
}
