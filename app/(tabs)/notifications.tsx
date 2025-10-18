
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';
import { mockNotifications } from '@/utils/mockData';

export default function NotificationsTabScreen() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'checkmark.circle.fill';
      case 'warning':
        return 'exclamationmark.triangle.fill';
      case 'error':
        return 'xmark.circle.fill';
      default:
        return 'info.circle.fill';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={[
        styles.contentContainer,
        Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
      ]}
    >
      {mockNotifications.map((notification) => (
        <TouchableOpacity
          key={notification.id}
          style={[
            styles.notificationCard,
            { backgroundColor: themeColors.card },
            !notification.read && { borderLeftWidth: 4, borderLeftColor: getTypeColor(notification.type) },
          ]}
        >
          <View style={styles.notificationHeader}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getTypeColor(notification.type) + '20' },
              ]}
            >
              <IconSymbol
                name={getTypeIcon(notification.type) as any}
                size={24}
                color={getTypeColor(notification.type)}
              />
            </View>
            <View style={styles.notificationContent}>
              <Text
                style={[
                  styles.title,
                  { color: themeColors.text },
                  !notification.read && { fontWeight: '700' },
                ]}
              >
                {notification.title}
              </Text>
              <Text
                style={[
                  styles.message,
                  { color: themeColors.textSecondary },
                  !notification.read && { fontWeight: '500' },
                ]}
              >
                {notification.message}
              </Text>
              <Text style={[styles.date, { color: themeColors.textSecondary }]}>
                {formatDate(notification.date)}
              </Text>
            </View>
          </View>
          {!notification.read && (
            <View style={[styles.unreadDot, { backgroundColor: getTypeColor(notification.type) }]} />
          )}
        </TouchableOpacity>
      ))}
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
  notificationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
