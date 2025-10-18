
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

export default function ParentCalendar() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const events = [
    {
      id: '1',
      title: 'Mid-Term Exams',
      type: 'exam',
      date: '2024-02-20',
      endDate: '2024-02-25',
      description: 'Mid-term examinations for all classes',
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      type: 'meeting',
      date: '2024-03-01',
      description: 'Discuss student progress with teachers',
    },
    {
      id: '3',
      title: 'Sports Day',
      type: 'event',
      date: '2024-03-10',
      description: 'Annual sports day activities',
    },
    {
      id: '4',
      title: 'Term Break',
      type: 'holiday',
      date: '2024-03-15',
      endDate: '2024-03-30',
      description: 'End of term break',
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam':
        return colors.error;
      case 'meeting':
        return colors.primary;
      case 'event':
        return colors.accent;
      case 'holiday':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return 'doc.text.fill';
      case 'meeting':
        return 'person.2.fill';
      case 'event':
        return 'star.fill';
      case 'holiday':
        return 'sun.max.fill';
      default:
        return 'calendar';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'School Calendar',
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: themeColors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[styles.headerCard, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            Upcoming Events
          </Text>
          <Text style={[styles.headerSubtitle, { color: themeColors.textSecondary }]}>
            Stay updated with school activities
          </Text>
        </View>

        {events.map((event) => (
          <View
            key={event.id}
            style={[styles.eventCard, { backgroundColor: themeColors.card }]}
          >
            <View
              style={[
                styles.eventIcon,
                { backgroundColor: getEventColor(event.type) + '20' },
              ]}
            >
              <IconSymbol
                name={getEventIcon(event.type) as any}
                size={24}
                color={getEventColor(event.type)}
              />
            </View>
            <View style={styles.eventContent}>
              <Text style={[styles.eventTitle, { color: themeColors.text }]}>
                {event.title}
              </Text>
              <Text style={[styles.eventDescription, { color: themeColors.textSecondary }]}>
                {event.description}
              </Text>
              <View style={styles.eventDate}>
                <IconSymbol name="calendar" size={14} color={themeColors.textSecondary} />
                <Text style={[styles.eventDateText, { color: themeColors.textSecondary }]}>
                  {new Date(event.date).toLocaleDateString()}
                  {event.endDate &&
                    ` - ${new Date(event.endDate).toLocaleDateString()}`}
                </Text>
              </View>
              <View
                style={[
                  styles.eventTypeBadge,
                  { backgroundColor: getEventColor(event.type) + '20' },
                ]}
              >
                <Text
                  style={[styles.eventTypeText, { color: getEventColor(event.type) }]}
                >
                  {event.type.toUpperCase()}
                </Text>
              </View>
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
  headerCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  eventCard: {
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
  eventIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  eventDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  eventDateText: {
    fontSize: 12,
  },
  eventTypeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  eventTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
