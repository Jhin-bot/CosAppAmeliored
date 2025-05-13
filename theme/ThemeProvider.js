import React, { useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { ThemeContext, lightTheme, darkTheme } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'user_theme_preference';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference', error);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    const saveThemePreference = async () => {
      if (!isThemeLoaded) return;
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
      } catch (error) {
        console.error('Failed to save theme preference', error);
      }
    };

    saveThemePreference();
  }, [isDark, isThemeLoaded]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (dark) => {
    setIsDark(dark);
  };

  const themeContextValue = useMemo(
    () => ({
      isDark,
      theme,
      setTheme,
      toggleTheme,
    }),
    [isDark, theme]
  );

  if (!isThemeLoaded) {
    return null; // or a loading indicator
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
