import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { fontSize, radius, spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, onPress, variant = 'primary', disabled = false, style }: ButtonProps) {
  const theme = useTheme();

  const variantes = {
    primary: { fundo: theme.primary, borda: theme.primary, texto: theme.textOnPrimary },
    secondary: { fundo: theme.primarySoft, borda: theme.primarySoft, texto: theme.primarySoftText },
    danger: { fundo: 'transparent', borda: theme.danger, texto: theme.danger },
  };
  const cores = variantes[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: cores.fundo, borderColor: cores.borda },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.text, { color: cores.texto }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
