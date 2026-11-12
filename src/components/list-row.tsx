import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { Card } from '@/components/card';
import { spacing } from '@/constants/theme';

type ListRowProps = {
  title: string;
  subtitle?: string;
  value?: string;
  valueMuted?: boolean;
  onPress?: () => void;
};

export function ListRow({ title, subtitle, value, valueMuted = false, onPress }: ListRowProps) {
  return (
    <Card onPress={onPress} style={styles.row}>
      <View style={styles.texts}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {value ? (
        <AppText
          variant={valueMuted ? 'caption' : 'subtitle'}
          color={valueMuted ? 'textSecondary' : 'primary'}>
          {value}
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '600',
  },
});
