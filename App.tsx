
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Routes } from '@routes/index';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from 'src/components/atoms/Loader';
import { TimesProvider } from 'src/context/times';
import { createTable, getDBConnection } from 'src/services/db';
import theme from 'src/theme';
import { ThemeProvider } from 'styled-components/native';

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  const init = async () => {
    const db = await getDBConnection();
    await createTable(db);
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <TimesProvider>
          <GestureHandlerRootView>
            {
              fontsLoaded ?
                <Routes />
                :
                <Loader />
            }

          </GestureHandlerRootView>
        </TimesProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
