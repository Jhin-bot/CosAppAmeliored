import React, { useEffect, useMemo, ReactNode } from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '../../theme';
import { useCart } from '../contexts/CartContext';
import { View, StatusBar, Platform, Text, StyleProp } from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { AppTheme, HeaderTitleProps, ScreenOptionsProps, TabBarIconProps } from './types';

// Helper function to render header title
const renderHeaderTitle = ({ theme, options, route }: HeaderTitleProps<AppTheme>) => {
  const { colors } = theme;
  return (
    <Text style={{
      color: colors.onPrimary,
      fontSize: 20,
      fontWeight: '600' as const,
      marginLeft: 8,
    }}>
      {options.title || route.name}
    </Text>
  );
};

// Screen options with header
const getScreenOptions = (theme: AppTheme) => ({
  header: ({ route, options }: ScreenOptionsProps) => (
    <CustomHeader>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {renderHeaderTitle({ theme, options, route })}
      </View>
    </CustomHeader>
  ),
});

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Create navigators
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Custom header component for better theming
interface CustomHeaderProps {
  children: ReactNode;
  style?: StyleProp<{}>;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ children, style }) => {
  const { theme } = useTheme();
  const { colors } = theme;
  return (
    <View style={[{
      backgroundColor: colors.primary,
      height: Platform.OS === 'ios' ? 100 : 60,
      paddingTop: Platform.OS === 'ios' ? 40 : 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }, style]}>
      {children}
    </View>
  );
};

// Home Stack Navigator
function HomeStackScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  
  const screenOptions = useMemo<NativeStackNavigationOptions>(() => ({
    headerStyle: {
      backgroundColor: colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: colors.onPrimary,
    headerTitleStyle: {
      fontWeight: '600' as const,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    contentStyle: { backgroundColor: colors.background },
  }), [colors]);
  
  const screenOptionsWithHeader = getScreenOptions(theme);

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={screenOptionsWithHeader}
      />
      <HomeStack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        options={{ 
          title: 'Product Details',
          headerBackTitle: 'Back',
        }}
      />
    </HomeStack.Navigator>
  );
}

// Cart Stack Navigator
function CartStackScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  
  const screenOptions = useMemo<NativeStackNavigationOptions>(() => ({
    headerStyle: {
      backgroundColor: colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: colors.onPrimary,
    headerTitleStyle: {
      fontWeight: '600' as const,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    contentStyle: { backgroundColor: colors.background },
  }), [colors]);
  
  const screenOptionsWithHeader = getScreenOptions(theme);

  return (
    <CartStack.Navigator screenOptions={screenOptions}>
      <CartStack.Screen 
        name="CartScreen" 
        component={CartScreen} 
        options={screenOptionsWithHeader}
      />
    </CartStack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStackScreen() {
  const { theme } = useTheme();
  const { colors } = theme;
  
  const screenOptions = useMemo<NativeStackNavigationOptions>(() => ({
    headerStyle: {
      backgroundColor: colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: colors.onPrimary,
    headerTitleStyle: {
      fontWeight: '600' as const,
      fontSize: 20,
    },
    headerBackTitleVisible: false,
    contentStyle: { backgroundColor: colors.background },
  }), [colors]);
  
  const screenOptionsWithHeader = getScreenOptions(theme);

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={screenOptionsWithHeader}
      />
    </ProfileStack.Navigator>
  );
}

// Get tab icon name based on route and focus state
const getTabIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'HomeStack':
      return focused ? 'home' : 'home-outline';
    case 'CartStack':
      return focused ? 'cart' : 'cart-outline';
    case 'ProfileStack':
      return focused ? 'person' : 'person-outline';
    default:
      return 'help' as const;
  }
};

// Main App Navigator with Bottom Tabs
function AppNavigator() {
  const { theme, isDark } = useTheme() as { theme: AppTheme; isDark: boolean };
  const { cartItems = [] } = useCart ? useCart() : { cartItems: [] };
  
  // Set up splash screen hiding
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Custom theme for navigation container
  const navigationTheme = useMemo(() => ({
    ...(isDark ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.onSurface,
      border: theme.colors.outline,
      notification: theme.colors.error,
    },
  }), [isDark, theme.colors]);

  // Tab bar icon component
  const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, name, label }) => {
    // Use a type assertion for the icon name
    const iconName = name as any; // We know these are valid Ionicons names
    const iconSize = 24;
    const iconColor = focused ? theme.colors.primary : theme.colors.onSurfaceVariant;
    
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
        <Text style={{
          fontSize: 12,
          color: iconColor,
          marginTop: 4,
          fontFamily: 'sans-serif-medium',
        }}>
          {label}
        </Text>
      </View>
    );
  };

  // Tab bar style
  const tabBarOptions = useMemo<BottomTabNavigationOptions>(() => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.surfaceVariant,
      height: 60,
      paddingBottom: 8,
      paddingTop: 6,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } as const,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarHideOnKeyboard: true,
  }), [theme.colors]);

  // Status bar style based on theme
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';
  const statusBarBackgroundColor = theme.colors.background;

  return (
    <>
      <StatusBar 
        barStyle={statusBarStyle} 
        backgroundColor={statusBarBackgroundColor} 
        translucent={false}
      />
      <NavigationContainer 
        theme={navigationTheme}
        onReady={async () => {
          await SplashScreen.hideAsync();
        }}
      >
        <Tab.Navigator screenOptions={tabBarOptions}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                const iconName = getTabIconName('HomeStack', focused);
                return (
                  <TabBarIcon 
                    focused={focused} 
                    name={iconName}
                    label="Home"
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="CartStack"
            component={CartStackScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                const iconName = getTabIconName('CartStack', focused);
                return (
                  <TabBarIcon 
                    focused={focused} 
                    name={iconName}
                    label="Cart"
                  />
                );
              },
              tabBarBadge: cartItems?.length > 0 ? cartItems.length : undefined,
              tabBarBadgeStyle: {
                backgroundColor: theme.colors.error,
                color: theme.colors.onError,
                fontSize: 12,
                fontFamily: 'sans-serif-medium',
              },
            }}
          />
          <Tab.Screen
            name="ProfileStack"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                const iconName = getTabIconName('ProfileStack', focused);
                return (
                  <TabBarIcon 
                    focused={focused} 
                    name={iconName}
                    label="Profile"
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default React.memo(AppNavigator);
