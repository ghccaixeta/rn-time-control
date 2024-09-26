
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Routes } from '@routes/index';
import { useFonts } from 'expo-font';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from 'src/atoms/Loader';
import { TimesProvider } from 'src/context/times';
import theme from 'src/theme';
import { ThemeProvider } from 'styled-components/native';

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <TimesProvider>
          {
            fontsLoaded ?
              <Routes />
              :
              <Loader />
          }
        </TimesProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
