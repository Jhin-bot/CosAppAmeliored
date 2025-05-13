import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, LogBox, useColorScheme } from 'react-native';
import { ThemeProvider } from './theme/ThemeProvider';

// Navigation
import AppNavigator from './app/navigation/AppNavigator';

// Context Providers
import { CartProvider } from './app/contexts/CartContext';
import { AuthProvider } from './app/contexts/AuthContext';
import { useTheme } from './theme';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native core',
]);

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <AuthProvider>
      <CartProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
