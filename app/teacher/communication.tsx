
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

export default function TeacherCommunication() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [showComposeModal, setShowComposeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements'>('messages');

  const [newMessage, setNewMessage] = useState({
    recipient: 'students',
    subject: '',
    message: '',
  });

  const messages = [
    {
      id: '1',
      from: 'Parent - Mary Wanjiru',
      subject: 'Question about homework',
      preview: 'Hello teacher, I wanted to ask about...',
      date: '2024-02-20',
      read: false,
    },
    {
      id: '2',
      from: 'Admin Office',
      subject: 'Staff Meeting Tomorrow',
      preview: 'Reminder: Staff meeting at 2 PM...',
      date: '2024-02-19',
      read: true,
    },
  ];

  const announcements = [
    {
      id: '1',
      title: 'Homework Reminder',
      message: 'Complete Chapter 5 exercises by Friday',
      class: 'Form 4A',
      date: '2024-02-20',
    },
    {
      id: '2',
      title: 'Exam Schedule',
      message: 'Mid-term exams start next week',
      class: 'All Classes',
      date: '2024-02-18',
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Message sent successfully');
    console.log('Sending message:', newMessage);
    setShowComposeModal(false);
    setNewMessage({ recipient: 'students', subject: '', message: '' });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Communication',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'messages' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab('messages')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'messages' ? '#FFFFFF' : themeColors.text },
                ]}
              >
                Messages
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'announcements' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab('announcements')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'announcements' ? '#FFFFFF' : themeColors.text },
                ]}
              >
                Announcements
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.composeButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowComposeModal(true)}
          >
            <IconSymbol name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.composeButtonText}>
              {activeTab === 'messages' ? 'New Message' : 'New Announcement'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {activeTab === 'messages' ? (
            messages.map((message) => (
              <TouchableOpacity
                key={message.id}
                style={[styles.messageCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.messageHeader}>
                  <View
                    style={[
                      styles.messageAvatar,
                      { backgroundColor: colors.primary + '20' },
                    ]}
                  >
                    <IconSymbol name="person.fill" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.messageInfo}>
                    <Text style={[styles.messageFrom, { color: themeColors.text }]}>
                      {message.from}
                    </Text>
                    <Text style={[styles.messageSubject, { color: colors.primary }]}>
                      {message.subject}
                    </Text>
                    <Text
                      style={[styles.messagePreview, { color: themeColors.textSecondary }]}
                    >
                      {message.preview}
                    </Text>
                  </View>
                  {!message.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={[styles.messageDate, { color: themeColors.textSecondary }]}>
                  {new Date(message.date).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            announcements.map((announcement) => (
              <View
                key={announcement.id}
                style={[styles.announcementCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.announcementHeader}>
                  <View
                    style={[
                      styles.announcementIcon,
                      { backgroundColor: colors.accent + '20' },
                    ]}
                  >
                    <IconSymbol name="megaphone.fill" size={20} color={colors.accent} />
                  </View>
                  <View style={styles.announcementInfo}>
                    <Text style={[styles.announcementTitle, { color: themeColors.text }]}>
                      {announcement.title}
                    </Text>
                    <Text
                      style={[styles.announcementClass, { color: themeColors.textSecondary }]}
                    >
                      {announcement.class}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.announcementMessage, { color: themeColors.text }]}>
                  {announcement.message}
                </Text>
                <Text style={[styles.announcementDate, { color: themeColors.textSecondary }]}>
                  {new Date(announcement.date).toLocaleDateString()}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showComposeModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowComposeModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowComposeModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              {activeTab === 'messages' ? 'New Message' : 'New Announcement'}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>To</Text>
              <View style={styles.recipientButtons}>
                {['students', 'parents', 'both'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.recipientButton,
                      newMessage.recipient === type && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setNewMessage({ ...newMessage, recipient: type })}
                  >
                    <Text
                      style={[
                        styles.recipientButtonText,
                        {
                          color:
                            newMessage.recipient === type ? '#FFFFFF' : themeColors.text,
                        },
                      ]}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Subject</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: themeColors.card, color: themeColors.text },
                ]}
                placeholder="Enter subject"
                placeholderTextColor={themeColors.textSecondary}
                value={newMessage.subject}
                onChangeText={(text) => setNewMessage({ ...newMessage, subject: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Message</Text>
              <TextInput
                style={[
                  styles.textArea,
                  { backgroundColor: themeColors.card, color: themeColors.text },
                ]}
                placeholder="Type your message here..."
                placeholderTextColor={themeColors.textSecondary}
                multiline
                numberOfLines={8}
                value={newMessage.message}
                onChangeText={(text) => setNewMessage({ ...newMessage, message: text })}
              />
            </View>

            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: colors.primary }]}
              onPress={handleSendMessage}
            >
              <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  composeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  composeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
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
    fontSize: 14,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  announcementClass: {
    fontSize: 13,
  },
  announcementMessage: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  announcementDate: {
    fontSize: 12,
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  recipientButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  recipientButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recipientButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
