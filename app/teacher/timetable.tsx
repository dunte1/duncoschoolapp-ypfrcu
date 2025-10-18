
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

export default function TeacherTimetable() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const schedule = [
    { day: 'Monday', periods: [
      { time: '8:00 - 9:00', class: 'Form 4A', subject: 'Mathematics', room: 'Room 101' },
      { time: '10:00 - 11:00', class: 'Form 3B', subject: 'Mathematics', room: 'Room 102' },
      { time: '2:00 - 3:00', class: 'Form 4B', subject: 'Physics', room: 'Lab 1' },
    ]},
    { day: 'Tuesday', periods: [
      { time: '9:00 - 10:00', class: 'Form 3A', subject: 'Physics', room: 'Lab 2' },
      { time: '11:00 - 12:00', class: 'Form 2A', subject: 'Mathematics', room: 'Room 103' },
    ]},
    { day: 'Wednesday', periods: [
      { time: '8:00 - 9:00', class: 'Form 4A', subject: 'Mathematics', room: 'Room 101' },
      { time: '2:00 - 3:00', class: 'Form 4B', subject: 'Physics', room: 'Lab 1' },
    ]},
    { day: 'Thursday', periods: [
      { time: '9:00 - 10:00', class: 'Form 3A', subject: 'Physics', room: 'Lab 2' },
      { time: '10:00 - 11:00', class: 'Form 3B', subject: 'Mathematics', room: 'Room 102' },
    ]},
    { day: 'Friday', periods: [
      { time: '8:00 - 9:00', class: 'Form 4A', subject: 'Mathematics', room: 'Room 101' },
      { time: '9:00 - 10:00', class: 'Form 2A', subject: 'Mathematics', room: 'Room 103' },
    ]},
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Timetable',
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {schedule.map((day, index) => (
          <View key={index} style={[styles.dayCard, { backgroundColor: themeColors.card }]}>
            <Text style={[styles.dayTitle, { color: themeColors.text }]}>{day.day}</Text>
            {day.periods.map((period, pIndex) => (
              <View key={pIndex} style={styles.periodCard}>
                <View style={[styles.timeBox, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="clock.fill" size={16} color={colors.primary} />
                  <Text style={[styles.timeText, { color: colors.primary }]}>
                    {period.time}
                  </Text>
                </View>
                <View style={styles.periodInfo}>
                  <Text style={[styles.periodClass, { color: themeColors.text }]}>
                    {period.class}
                  </Text>
                  <Text style={[styles.periodSubject, { color: colors.primary }]}>
                    {period.subject}
                  </Text>
                  <View style={styles.roomInfo}>
                    <IconSymbol name="location.fill" size={14} color={themeColors.textSecondary} />
                    <Text style={[styles.roomText, { color: themeColors.textSecondary }]}>
                      {period.room}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
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
  dayCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  periodCard: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  timeBox: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  periodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  periodClass: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  periodSubject: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomText: {
    fontSize: 12,
  },
});
