
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

export default function ParentCommunication() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const messages = [
    {
      id: '1',
      from: 'Mr. Anderson - Mathematics Teacher',
      subject: 'Excellent Progress',
      preview: 'John has shown excellent progress in mathematics...',
      date: '2024-02-20',
      read: false,
    },
    {
      id: '2',
      from: 'School Admin',
      subject: 'Parent-Teacher Meeting',
      preview: 'We are organizing a parent-teacher meeting...',
      date: '2024-02-18',
      read: true,
    },
  ];

  const announcements = [
    {
      id: '1',
      title: 'School Closure Notice',
      message: 'School will be closed on February 25th for a public holiday.',
      date: '2024-02-19',
    },
    {
      id: '2',
      title: 'Exam Schedule Released',
      message: 'The final exam schedule has been published. Please check the calendar.',
      date: '2024-02-15',
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Communication',
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Messages
        </Text>

        {messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={[styles.messageCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.messageHeader}>
              <View style={[styles.messageAvatar, { backgroundColor: colors.primary + '20' }]}>
                <IconSymbol name="person.fill" size={20} color={colors.primary} />
              </View>
              <View style={styles.messageInfo}>
                <Text style={[styles.messageFrom, { color: themeColors.text }]}>
                  {message.from}
                </Text>
                <Text style={[styles.messageSubject, { color: colors.primary }]}>
                  {message.subject}
                </Text>
                <Text style={[styles.messagePreview, { color: themeColors.textSecondary }]}>
                  {message.preview}
                </Text>
              </View>
              {!message.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={[styles.messageDate, { color: themeColors.textSecondary }]}>
              {new Date(message.date).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Announcements
        </Text>

        {announcements.map((announcement) => (
          <View
            key={announcement.id}
            style={[styles.announcementCard, { backgroundColor: themeColors.card }]}
          >
            <View style={[styles.announcementIcon, { backgroundColor: colors.accent + '20' }]}>
              <IconSymbol name="megaphone.fill" size={24} color={colors.accent} />
            </View>
            <View style={styles.announcementContent}>
              <Text style={[styles.announcementTitle, { color: themeColors.text }]}>
                {announcement.title}
              </Text>
              <Text style={[styles.announcementMessage, { color: themeColors.textSecondary }]}>
                {announcement.message}
              </Text>
              <Text style={[styles.announcementDate, { color: themeColors.textSecondary }]}>
                {new Date(announcement.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
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
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
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
    marginBottom: 8,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
  },
  messageFrom: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  messageSubject: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 13,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  messageDate: {
    fontSize: 12,
    textAlign: 'right',
  },
  announcementCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  announcementMessage: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  announcementDate: {
    fontSize: 12,
  },
});
