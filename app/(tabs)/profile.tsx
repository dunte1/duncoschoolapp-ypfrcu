
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { colors, darkColors } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { icon: 'person.fill', label: 'Name', value: user?.name || 'N/A' },
        { icon: 'envelope.fill', label: 'Email', value: user?.email || 'N/A' },
        { icon: 'phone.fill', label: 'Phone', value: user?.phone || 'N/A' },
        { icon: 'briefcase.fill', label: 'Role', value: user?.role?.toUpperCase() || 'N/A' },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: 'gear', label: 'App Settings', action: () => console.log('Settings') },
        { icon: 'bell.fill', label: 'Notifications', action: () => console.log('Notifications') },
        { icon: 'lock.fill', label: 'Privacy', action: () => console.log('Privacy') },
        { icon: 'questionmark.circle.fill', label: 'Help & Support', action: () => console.log('Help') },
      ],
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
      ]}
    >
      <View style={[styles.header, { backgroundColor: themeColors.card }]}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
          <IconSymbol name="person.fill" size={48} color="#FFFFFF" />
        </View>
        <Text style={[styles.name, { color: themeColors.text }]}>
          {user?.name || 'User'}
        </Text>
        <Text style={[styles.email, { color: themeColors.textSecondary }]}>
          {user?.email || 'email@example.com'}
        </Text>
      </View>

      {profileSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: themeColors.card }]}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.item,
                  itemIndex < section.items.length - 1 && styles.itemBorder,
                  { borderBottomColor: themeColors.border },
                ]}
                onPress={item.action}
                disabled={!item.action}
              >
                <View style={styles.itemLeft}>
                  <IconSymbol
                    name={item.icon as any}
                    size={20}
                    color={themeColors.textSecondary}
                  />
                  <Text style={[styles.itemLabel, { color: themeColors.text }]}>
                    {item.label}
                  </Text>
                </View>
                {item.value ? (
                  <Text style={[styles.itemValue, { color: themeColors.textSecondary }]}>
                    {item.value}
                  </Text>
                ) : (
                  <IconSymbol
                    name="chevron.right"
                    size={16}
                    color={themeColors.textSecondary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <IconSymbol name="arrow.right.square.fill" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  itemValue: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
