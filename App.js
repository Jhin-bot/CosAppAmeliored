import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { CartProvider } from './app/contexts/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}
