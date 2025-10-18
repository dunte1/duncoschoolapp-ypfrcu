
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';
import { mockMessages } from '@/utils/mockData';

export default function MessagesScreen() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Messages',
          headerShown: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
      >
        {mockMessages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={[
              styles.messageCard,
              { backgroundColor: themeColors.card },
              !message.read && { borderLeftWidth: 4, borderLeftColor: colors.primary },
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="person.fill" size={24} color={colors.primary} />
              </View>
              <View style={styles.messageInfo}>
                <View style={styles.messageTop}>
                  <Text
                    style={[
                      styles.sender,
                      { color: themeColors.text },
                      !message.read && { fontWeight: '700' },
                    ]}
                  >
                    {message.sender}
                  </Text>
                  <Text style={[styles.date, { color: themeColors.textSecondary }]}>
                    {formatDate(message.date)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.subject,
                    { color: themeColors.text },
                    !message.read && { fontWeight: '600' },
                  ]}
                >
                  {message.subject}
                </Text>
                <Text
                  style={[
                    styles.preview,
                    { color: themeColors.textSecondary },
                    !message.read && { fontWeight: '500' },
                  ]}
                  numberOfLines={2}
                >
                  {message.preview}
                </Text>
              </View>
            </View>
            {!message.read && (
              <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
                <Text style={styles.unreadText}>NEW</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
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
  messageCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sender: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
  },
  subject: {
    fontSize: 15,
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
