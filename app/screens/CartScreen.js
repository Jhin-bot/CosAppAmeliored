import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, FlatList, Image, Alert, ScrollView } from 'react-native';
import { Card, Button, Text, IconButton, useTheme } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, total } = useCart();
  const theme = useTheme();

  const handleRemoveItem = useCallback((cartId, itemName) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${itemName} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            try {
              removeFromCart(cartId);
            } catch (error) {
              Alert.alert('Error', 'Failed to remove item from cart. Please try again.');
            }
          } 
        },
      ]
    );
  }, [removeFromCart]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty', 'Add some products to your cart before checking out.');
      return;
    }
    
    Alert.alert(
      'Checkout',
      `Your total is $${total.toFixed(2)}. Proceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            // In a real app, you would navigate to a payment screen
            Alert.alert(
              'Order Placed!', 
              'Thank you for your purchase!',
              [
                { 
                  text: 'OK', 
                  onPress: () => {
                    clearCart();
                    navigation.navigate('Home');
                  } 
                }
              ]
            );
          } 
        },
      ]
    );
  }, [cartItems.length, total, clearCart, navigation]);

  const dynamicStyles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      backgroundColor: theme.colors.background,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 18,
      marginBottom: 24,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
    continueShoppingButton: {
      width: '100%',
      maxWidth: 300,
    },
    card: {
      margin: 8,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    itemContainer: {
      flexDirection: 'row',
      padding: 12,
      alignItems: 'center',
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceVariant,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 12,
      marginRight: 8,
    },
    itemName: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    quantityText: {
      marginHorizontal: 12,
      minWidth: 24,
      textAlign: 'center',
      color: theme.colors.onSurfaceVariant,
    },
    summaryContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceVariant,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.colors.onSurface,
    },
    totalAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    checkoutButton: {
      marginTop: 8,
      borderRadius: 8,
    },
    checkoutButtonContent: {
      height: 48,
    },
  }), [theme]);

  if (cartItems.length === 0) {
    return (
      <View style={dynamicStyles.emptyContainer}>
        <IconButton 
          icon="cart-off" 
          size={64} 
          color={theme.colors.outline}
          style={dynamicStyles.emptyIcon}
        />
        <Text style={dynamicStyles.emptyText}>Your cart is empty</Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Home')}
          style={dynamicStyles.continueShoppingButton}
          contentStyle={dynamicStyles.checkoutButtonContent}
        >
          Continue Shopping
        </Button>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Card style={dynamicStyles.card}>
            <View style={dynamicStyles.itemContainer}>
              <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/100' }} 
                style={dynamicStyles.itemImage}
                resizeMode="cover"
              />
              <View style={dynamicStyles.itemDetails}>
                <Text style={dynamicStyles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={dynamicStyles.itemPrice}>${item.price.toFixed(2)}</Text>
                <View style={dynamicStyles.quantityContainer}>
                  <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => {}}
                    style={styles.quantityButton}
                    iconColor={theme.colors.primary}
                  />
                  <Text style={dynamicStyles.quantityText}>{item.quantity || 1}</Text>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => {}}
                    style={styles.quantityButton}
                    iconColor={theme.colors.primary}
                  />
                </View>
              </View>
              <IconButton
                icon="delete"
                size={24}
                onPress={() => handleRemoveItem(item.cartId, item.name)}
                style={styles.removeButton}
                iconColor={theme.colors.error}
              />
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.cartId}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={
          <View style={dynamicStyles.summaryContainer}>
            <View style={dynamicStyles.totalRow}>
              <Text style={dynamicStyles.totalLabel}>Total:</Text>
              <Text style={dynamicStyles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
            <Button
              mode="contained"
              onPress={handleCheckout}
              style={[dynamicStyles.checkoutButton, { backgroundColor: theme.colors.primary }]}
              labelStyle={{ color: theme.colors.onPrimary }}
              contentStyle={dynamicStyles.checkoutButtonContent}
              icon="credit-card"
            >
              Proceed to Checkout
            </Button>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 100,
  },
  removeButton: {
    margin: 0,
  },
  quantityButton: {
    margin: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
});

export default React.memo(CartScreen);
