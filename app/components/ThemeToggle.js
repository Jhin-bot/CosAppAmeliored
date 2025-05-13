import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ThemeToggle = ({ size = 24, style }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={toggleTheme} 
      style={[styles.button, style]}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <MaterialCommunityIcons
        name={isDark ? 'weather-sunny' : 'weather-night'}
        size={size}
        color={isDark ? '#FFD700' : '#000000'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(ThemeToggle);
