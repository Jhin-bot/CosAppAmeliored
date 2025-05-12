import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback(async (item) => {
    const newCart = [...cartItems, item];
    setCartItems(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  }, [cartItems]);

  const removeFromCart = useCallback(async (itemId) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  }, [cartItems]);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    await AsyncStorage.removeItem('cart');
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
