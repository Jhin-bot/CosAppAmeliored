import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on initial render
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = useCallback(async (item) => {
    try {
      const newCart = [...cartItems, { ...item, cartId: Date.now().toString() }];
      setCartItems(newCart);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  }, [cartItems]);

  const removeFromCart = useCallback(async (cartId) => {
    try {
      const newCart = cartItems.filter(item => item.cartId !== cartId);
      setCartItems(newCart);
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      throw error;
    }
  }, [cartItems]);

  const clearCart = useCallback(async () => {
    try {
      setCartItems([]);
      await AsyncStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
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
