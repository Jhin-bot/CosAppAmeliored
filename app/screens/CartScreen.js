import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, total } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeItem}>Remove</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <Button
          mode="contained"
          style={styles.checkoutButton}
          onPress={() => {
            // Checkout logic here
          }}
        >
          Checkout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
  },
  removeItem: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  checkoutButton: {
    marginTop: 8,
  },
});
