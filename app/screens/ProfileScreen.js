import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../../theme';
import ThemeToggle from '../components/ThemeToggle';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.userName, { color: colors.text }]}>{user?.name || 'Guest'}</Text>
              <ThemeToggle />
            </View>
            <Text style={[styles.userEmail, { color: colors.onSurfaceVariant }]}>
              {user?.email || 'Not logged in'}
            </Text>
          </View>
          
          <Divider style={[styles.divider, { backgroundColor: colors.outline }]} />
          
          <View style={styles.infoSection}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Account Information
            </Text>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
                Member since:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user?.createdAt || 'N/A'}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
                Last login:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {user?.lastLogin || 'N/A'}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.onSurfaceVariant }]}>
                Theme:
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {colorScheme === 'dark' ? 'Dark' : 'Light'}
              </Text>
            </View>
          </View>

          <Divider style={[styles.divider, { backgroundColor: colors.outline }]} />
          
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={[styles.button, { backgroundColor: colors.primary }]}
              labelStyle={{ color: colors.onPrimary }}
              onPress={() => {
                // Navigate to edit profile
              }}
            >
              Edit Profile
            </Button>

            <Button
              mode="outlined"
              style={[styles.button, { borderColor: colors.primary }]}
              labelStyle={{ color: colors.primary }}
              onPress={logout}
            >
              Logout
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
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
  divider: {
    marginVertical: 16,
    height: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
