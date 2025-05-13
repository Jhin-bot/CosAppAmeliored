import * as React from 'react';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

const { LightTheme: LightNavTheme, DarkTheme: DarkNavTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const lightTheme = {
  ...MD3LightTheme,
  ...LightNavTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightNavTheme.colors,
    primary: '#6200ee',
    accent: '#03dac6',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
    error: '#b00020',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  ...DarkNavTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkNavTheme.colors,
    primary: '#bb86fc',
    accent: '#03dac6',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    error: '#cf6679',
  },
};

export const ThemeContext = React.createContext({
  isDark: false,
  theme: lightTheme,
  setTheme: () => {},
});

export const useTheme = () => React.useContext(ThemeContext);
