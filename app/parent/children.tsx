
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface Child {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  attendance: number;
  performance: string;
  subjects: string[];
  teacher: string;
}

export default function ParentChildren() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const children: Child[] = [
    {
      id: '1',
      name: 'John Kamau',
      class: 'Form 4A',
      rollNumber: 'F4A001',
      attendance: 95,
      performance: 'A',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      teacher: 'Mr. Anderson',
    },
    {
      id: '2',
      name: 'Mary Kamau',
      class: 'Form 2B',
      rollNumber: 'F2B015',
      attendance: 92,
      performance: 'B+',
      subjects: ['Mathematics', 'Science', 'English', 'Kiswahili', 'History'],
      teacher: 'Mrs. Johnson',
    },
  ];

  const handleViewDetails = (child: Child) => {
    setSelectedChild(child);
    setShowDetailsModal(true);
  };

  const getPerformanceColor = (performance: string) => {
    if (performance.startsWith('A')) return colors.secondary;
    if (performance.startsWith('B')) return colors.primary;
    if (performance.startsWith('C')) return colors.warning;
    return colors.error;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Children',
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {children.map((child) => (
          <TouchableOpacity
            key={child.id}
            style={[styles.childCard, { backgroundColor: themeColors.card }]}
            onPress={() => handleViewDetails(child)}
          >
            <View style={[styles.childAvatar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={[styles.childInitial, { color: colors.primary }]}>
                {child.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.childInfo}>
              <Text style={[styles.childName, { color: themeColors.text }]}>
                {child.name}
              </Text>
              <Text style={[styles.childClass, { color: themeColors.textSecondary }]}>
                {child.class} - {child.rollNumber}
              </Text>
              <Text style={[styles.childTeacher, { color: themeColors.textSecondary }]}>
                Class Teacher: {child.teacher}
              </Text>
            </View>

            <View style={styles.childStats}>
              <View
                style={[
                  styles.performanceBadge,
                  { backgroundColor: getPerformanceColor(child.performance) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.performanceText,
                    { color: getPerformanceColor(child.performance) },
                  ]}
                >
                  {child.performance}
                </Text>
              </View>
              <View style={styles.attendanceBadge}>
                <IconSymbol name="checkmark.circle.fill" size={16} color={colors.secondary} />
                <Text style={[styles.attendanceText, { color: themeColors.text }]}>
                  {child.attendance}%
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={[styles.infoCard, { backgroundColor: colors.primary + '10' }]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.primary }]}>
            Tap on a child&apos;s card to view detailed information including subjects, teachers, and academic progress.
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showDetailsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Student Profile
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={[styles.profileCard, { backgroundColor: themeColors.card }]}>
              <View style={[styles.profileAvatar, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.profileInitial, { color: colors.primary }]}>
                  {selectedChild?.name.charAt(0)}
                </Text>
              </View>
              <Text style={[styles.profileName, { color: themeColors.text }]}>
                {selectedChild?.name}
              </Text>
              <Text style={[styles.profileClass, { color: themeColors.textSecondary }]}>
                {selectedChild?.class} - {selectedChild?.rollNumber}
              </Text>
            </View>

            <View style={[styles.detailsCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.detailsTitle, { color: themeColors.text }]}>
                Academic Information
              </Text>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>
                  Class Teacher:
                </Text>
                <Text style={[styles.detailValue, { color: themeColors.text }]}>
                  {selectedChild?.teacher}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>
                  Attendance:
                </Text>
                <Text style={[styles.detailValue, { color: colors.secondary }]}>
                  {selectedChild?.attendance}%
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: themeColors.textSecondary }]}>
                  Performance:
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: getPerformanceColor(selectedChild?.performance || '') },
                  ]}
                >
                  {selectedChild?.performance}
                </Text>
              </View>
            </View>

            <View style={[styles.detailsCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.detailsTitle, { color: themeColors.text }]}>
                Subjects
              </Text>
              {selectedChild?.subjects.map((subject, index) => (
                <View key={index} style={styles.subjectItem}>
                  <IconSymbol name="book.fill" size={16} color={colors.primary} />
                  <Text style={[styles.subjectText, { color: themeColors.text }]}>
                    {subject}
                  </Text>
                </View>
              ))}
            </View>
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
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  childInitial: {
    fontSize: 28,
    fontWeight: '700',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  childClass: {
    fontSize: 14,
    marginBottom: 2,
  },
  childTeacher: {
    fontSize: 13,
  },
  childStats: {
    alignItems: 'flex-end',
    gap: 8,
  },
  performanceBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  performanceText: {
    fontSize: 16,
    fontWeight: '700',
  },
  attendanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
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
  profileCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInitial: {
    fontSize: 36,
    fontWeight: '700',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileClass: {
    fontSize: 16,
  },
  detailsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  subjectText: {
    fontSize: 15,
  },
});
