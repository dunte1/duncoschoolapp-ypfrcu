
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';
import { mockAttendance } from '@/utils/mockData';

export default function AttendanceScreen() {
  const theme = useTheme();
  const router = useRouter();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return colors.success;
      case 'absent':
        return colors.error;
      case 'late':
        return colors.warning;
      case 'excused':
        return colors.primary;
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
      case 'excused':
        return 'exclamationmark.circle.fill';
      default:
        return 'circle.fill';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Attendance',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.summaryCard, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.summaryTitle, { color: themeColors.text }]}>
            Attendance Summary
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.success }]}>85%</Text>
              <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
                Present
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.error }]}>10%</Text>
              <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
                Absent
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.warning }]}>5%</Text>
              <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
                Late
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Recent Records
        </Text>

        {mockAttendance.map((record) => (
          <View
            key={record.id}
            style={[styles.recordCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.recordHeader}>
              <View style={styles.recordLeft}>
                <View
                  style={[
                    styles.statusIcon,
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
                  <Text style={[styles.studentName, { color: themeColors.text }]}>
                    {record.studentName}
                  </Text>
                  <Text style={[styles.recordDate, { color: themeColors.textSecondary }]}>
                    {new Date(record.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(record.status) },
                ]}
              >
                <Text style={styles.statusText}>{record.status.toUpperCase()}</Text>
              </View>
            </View>
            {record.remarks && (
              <Text style={[styles.remarks, { color: themeColors.textSecondary }]}>
                {record.remarks}
              </Text>
            )}
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
  },
  summaryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  recordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
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
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  remarks: {
    fontSize: 14,
    marginTop: 12,
    fontStyle: 'italic',
  },
});
