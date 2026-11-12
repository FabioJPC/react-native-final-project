import { Tabs } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabIcon } from '@/components/tab-icon';
import { useTheme } from '@/hooks/use-theme';

const TAB_BAR_HEIGHT = 60;

export default function TabsLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: { height: TAB_BAR_HEIGHT + insets.bottom },
        tabBarItemStyle: { justifyContent: 'center' },
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.background }]} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: 'list.clipboard', android: 'assignment', web: 'assignment' }}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="alunos"
        options={{
          title: 'Alunos',
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: 'person.2', android: 'group', web: 'group' }}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="turmas"
        options={{
          title: 'Turmas',
          tabBarIcon: ({ color, size }) => (
            <TabIcon
              name={{ ios: 'building.columns', android: 'school', web: 'school' }}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
