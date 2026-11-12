import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { DadosProvider, useDados } from '@/context/dados-context';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <DadosProvider>
      <RootStack />
    </DadosProvider>
  );
}

function RootStack() {
  const { carregando } = useDados();
  const scheme = useColorScheme();
  const theme = useTheme();

  useEffect(() => {
    if (!carregando) SplashScreen.hideAsync();
  }, [carregando]);

  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.background,
      text: theme.text,
      border: theme.border,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="atividade/formulario" options={{ title: 'Atividade' }} />
        <Stack.Screen name="atividade/[id]" options={{ title: 'Atividade' }} />
        <Stack.Screen name="aluno/formulario" options={{ title: 'Aluno' }} />
        <Stack.Screen name="aluno/[id]" options={{ title: 'Boletim' }} />
        <Stack.Screen name="turma/formulario" options={{ title: 'Turma' }} />
      </Stack>
    </ThemeProvider>
  );
}
