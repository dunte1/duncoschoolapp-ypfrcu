
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface Announcement {
  id: string;
  title: string;
  message: string;
  targetAudience: string[];
  channels: ('push' | 'email' | 'sms')[];
  status: 'draft' | 'sent';
  date: string;
}

export default function CommunicationManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'School Reopening Notice',
      message: 'School will reopen on January 20th. All students should report by 8 AM.',
      targetAudience: ['students', 'parents'],
      channels: ['push', 'email', 'sms'],
      status: 'sent',
      date: '2024-01-10',
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      message: 'Annual parent-teacher meeting scheduled for January 25th.',
      targetAudience: ['parents', 'teachers'],
      channels: ['push', 'email'],
      status: 'draft',
      date: '2024-01-15',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    targetAudience: [] as string[],
    channels: [] as ('push' | 'email' | 'sms')[],
  });

  const audienceOptions = ['students', 'teachers', 'parents', 'staff', 'all'];
  const channelOptions: ('push' | 'email' | 'sms')[] = ['push', 'email', 'sms'];

  const stats = [
    { label: 'Sent Today', value: '12', icon: 'paperplane.fill', color: colors.success },
    { label: 'Drafts', value: announcements.filter(a => a.status === 'draft').length.toString(), icon: 'doc.text.fill', color: colors.warning },
    { label: 'Total Sent', value: '248', icon: 'checkmark.circle.fill', color: colors.primary },
    { label: 'Recipients', value: '1,234', icon: 'person.3.fill', color: colors.secondary },
  ];

  const toggleAudience = (audience: string) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(audience)
        ? prev.targetAudience.filter(a => a !== audience)
        : [...prev.targetAudience, audience],
    }));
  };

  const toggleChannel = (channel: 'push' | 'email' | 'sms') => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const handleSendAnnouncement = () => {
    if (!formData.title || !formData.message || formData.targetAudience.length === 0 || formData.channels.length === 0) {
      Alert.alert('Error', 'Please fill all fields and select at least one audience and channel');
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...formData,
      status: 'sent',
      date: new Date().toISOString().split('T')[0],
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setModalVisible(false);
    setFormData({ title: '', message: '', targetAudience: [], channels: [] });
    Alert.alert('Success', 'Announcement sent successfully!');
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      push: 'bell.fill',
      email: 'envelope.fill',
      sms: 'message.fill',
    };
    return icons[channel as keyof typeof icons] || 'bell.fill';
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
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { backgroundColor: themeColors.card }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <IconSymbol name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: themeColors.text }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.composeButton, { backgroundColor: colors.primary }]}
            onPress={() => setModalVisible(true)}
          >
            <IconSymbol name="plus.circle.fill" size={24} color="#FFFFFF" />
            <Text style={styles.composeButtonText}>New Announcement</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Recent Announcements
          </Text>

          {announcements.map((announcement) => (
            <View key={announcement.id} style={[styles.announcementCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.announcementHeader}>
                <View style={[styles.announcementIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="megaphone.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.announcementInfo}>
                  <Text style={[styles.announcementTitle, { color: themeColors.text }]}>
                    {announcement.title}
                  </Text>
                  <Text style={[styles.announcementDate, { color: themeColors.textSecondary }]}>
                    {new Date(announcement.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: announcement.status === 'sent' ? colors.success + '20' : colors.warning + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: announcement.status === 'sent' ? colors.success : colors.warning }
                  ]}>
                    {announcement.status}
                  </Text>
                </View>
              </View>

              <Text style={[styles.announcementMessage, { color: themeColors.textSecondary }]}>
                {announcement.message}
              </Text>

              <View style={styles.metaContainer}>
                <View style={styles.metaRow}>
                  <IconSymbol name="person.3.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.metaText, { color: themeColors.textSecondary }]}>
                    {announcement.targetAudience.join(', ')}
                  </Text>
                </View>
                <View style={styles.channelsRow}>
                  {announcement.channels.map((channel) => (
                    <View key={channel} style={[styles.channelBadge, { backgroundColor: colors.secondary + '20' }]}>
                      <IconSymbol name={getChannelIcon(channel) as any} size={14} color={colors.secondary} />
                      <Text style={[styles.channelText, { color: colors.secondary }]}>
                        {channel}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
                <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                  New Announcement
                </Text>

                <TextInput
                  style={[styles.input, { 
                    backgroundColor: themeColors.background,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  }]}
                  placeholder="Title"
                  placeholderTextColor={themeColors.textSecondary}
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                />

                <TextInput
                  style={[styles.textArea, { 
                    backgroundColor: themeColors.background,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  }]}
                  placeholder="Message"
                  placeholderTextColor={themeColors.textSecondary}
                  value={formData.message}
                  onChangeText={(text) => setFormData({ ...formData, message: text })}
                  multiline
                  numberOfLines={4}
                />

                <Text style={[styles.label, { color: themeColors.text }]}>Target Audience:</Text>
                <View style={styles.optionsContainer}>
                  {audienceOptions.map((audience) => (
                    <TouchableOpacity
                      key={audience}
                      style={[
                        styles.optionButton,
                        formData.targetAudience.includes(audience) && { backgroundColor: colors.primary },
                        !formData.targetAudience.includes(audience) && { backgroundColor: themeColors.background },
                      ]}
                      onPress={() => toggleAudience(audience)}
                    >
                      <Text style={[
                        styles.optionText,
                        { color: formData.targetAudience.includes(audience) ? '#FFFFFF' : themeColors.text }
                      ]}>
                        {audience}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.label, { color: themeColors.text }]}>Channels:</Text>
                <View style={styles.optionsContainer}>
                  {channelOptions.map((channel) => (
                    <TouchableOpacity
                      key={channel}
                      style={[
                        styles.optionButton,
                        formData.channels.includes(channel) && { backgroundColor: colors.secondary },
                        !formData.channels.includes(channel) && { backgroundColor: themeColors.background },
                      ]}
                      onPress={() => toggleChannel(channel)}
                    >
                      <IconSymbol 
                        name={getChannelIcon(channel) as any} 
                        size={16} 
                        color={formData.channels.includes(channel) ? '#FFFFFF' : themeColors.text} 
                      />
                      <Text style={[
                        styles.optionText,
                        { color: formData.channels.includes(channel) ? '#FFFFFF' : themeColors.text }
                      ]}>
                        {channel}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: themeColors.background }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: themeColors.text }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: colors.primary }]}
                    onPress={handleSendAnnouncement}
                  >
                    <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                      Send
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  composeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  composeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  announcementCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  announcementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  announcementMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaContainer: {
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  channelsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  channelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  channelText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
