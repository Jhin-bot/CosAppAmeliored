import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'Not logged in'}</Text>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <Text style={styles.infoItem}>Member since: {user?.createdAt || 'N/A'}</Text>
            <Text style={styles.infoItem}>Last login: {user?.lastLogin || 'N/A'}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                // Navigate to edit profile
              }}
            >
              Edit Profile
            </Button>

            <Button
              mode="outlined"
              style={styles.button}
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 24,
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
