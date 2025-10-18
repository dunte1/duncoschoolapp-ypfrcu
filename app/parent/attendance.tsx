
import React, { useState } from 'react';
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

export default function ParentAttendance() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedChild, setSelectedChild] = useState('John Kamau');

  const children = ['John Kamau', 'Mary Kamau'];

  const attendanceRecords = [
    { date: '2024-02-20', status: 'present', remarks: '' },
    { date: '2024-02-19', status: 'present', remarks: '' },
    { date: '2024-02-16', status: 'late', remarks: 'Traffic delay' },
    { date: '2024-02-15', status: 'present', remarks: '' },
    { date: '2024-02-14', status: 'absent', remarks: 'Sick leave' },
    { date: '2024-02-13', status: 'present', remarks: '' },
    { date: '2024-02-12', status: 'present', remarks: '' },
  ];

  const stats = {
    present: attendanceRecords.filter((r) => r.status === 'present').length,
    absent: attendanceRecords.filter((r) => r.status === 'absent').length,
    late: attendanceRecords.filter((r) => r.status === 'late').length,
    percentage: 95,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return colors.secondary;
      case 'absent':
        return colors.error;
      case 'late':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return 'checkmark.circle.fill';
      case 'absent':
        return 'xmark.circle.fill';
      case 'late':
        return 'clock.fill';
      default:
        return 'circle';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Attendance',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Select Child
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.childSelector}
          >
            {children.map((child) => (
              <TouchableOpacity
                key={child}
                style={[
                  styles.childChip,
                  selectedChild === child && { backgroundColor: colors.primary },
                ]}
                onPress={() => setSelectedChild(child)}
              >
                <Text
                  style={[
                    styles.childChipText,
                    { color: selectedChild === child ? '#FFFFFF' : themeColors.text },
                  ]}
                >
                  {child}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={[styles.statsCard, { backgroundColor: themeColors.background }]}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.secondary} />
              </View>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {stats.present}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Present
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.error + '20' }]}>
                <IconSymbol name="xmark.circle.fill" size={24} color={colors.error} />
              </View>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {stats.absent}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Absent
              </Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: colors.warning + '20' }]}>
                <IconSymbol name="clock.fill" size={24} color={colors.warning} />
              </View>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {stats.late}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Late
              </Text>
            </View>
          </View>

          <View style={[styles.percentageCard, { backgroundColor: colors.secondary + '20' }]}>
            <Text style={[styles.percentageValue, { color: colors.secondary }]}>
              {stats.percentage}%
            </Text>
            <Text style={[styles.percentageLabel, { color: colors.secondary }]}>
              Overall Attendance
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Attendance History
          </Text>

          {attendanceRecords.map((record, index) => (
            <View
              key={index}
              style={[styles.recordCard, { backgroundColor: themeColors.card }]}
            >
              <View
                style={[
                  styles.recordIcon,
                  { backgroundColor: getStatusColor(record.status) + '20' },
                ]}
              >
                <IconSymbol
                  name={getStatusIcon(record.status) as any}
                  size={24}
                  color={getStatusColor(record.status)}
                />
              </View>
              <View style={styles.recordInfo}>
                <Text style={[styles.recordDate, { color: themeColors.text }]}>
                  {new Date(record.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
                {record.remarks && (
                  <Text style={[styles.recordRemarks, { color: themeColors.textSecondary }]}>
                    {record.remarks}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(record.status) + '20' },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: getStatusColor(record.status) }]}
                >
                  {record.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  childSelector: {
    marginBottom: 16,
  },
  childChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  childChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
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
  percentageCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  percentageValue: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 4,
  },
  percentageLabel: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  recordCard: {
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
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recordInfo: {
    flex: 1,
  },
  recordDate: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordRemarks: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
