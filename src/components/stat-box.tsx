import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { radius, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type StatBoxProps = {
  label: string;
  value: string;
};

export function StatBox({ label, value }: StatBoxProps) {
  const theme = useTheme();

  return (
    <View style={[styles.box, { backgroundColor: theme.primarySoft }]}>
      <AppText variant="subtitle" color="primarySoftText">
        {value}
      </AppText>
      <AppText variant="caption" color="textSecondary">
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
    gap: 2,
  },
});
