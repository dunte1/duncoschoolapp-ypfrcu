
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface AcademicItem {
  id: string;
  title: string;
  type: 'timetable' | 'exam' | 'result' | 'subject';
  class: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  date: string;
}

export default function AcademicControl() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [items, setItems] = useState<AcademicItem[]>([
    {
      id: '1',
      title: 'Mathematics Timetable - Term 1',
      type: 'timetable',
      class: 'Form 4A',
      status: 'pending',
      submittedBy: 'Mr. Anderson',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Final Exam Schedule',
      type: 'exam',
      class: 'All Classes',
      status: 'approved',
      submittedBy: 'Principal',
      date: '2024-01-14',
    },
    {
      id: '3',
      title: 'Mid-term Results - Science',
      type: 'result',
      class: 'Form 3B',
      status: 'pending',
      submittedBy: 'Mrs. Johnson',
      date: '2024-01-13',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const getTypeColor = (type: string) => {
    const colors_map = {
      timetable: colors.primary,
      exam: colors.accent,
      result: colors.secondary,
      subject: colors.warning,
    };
    return colors_map[type as keyof typeof colors_map] || colors.primary;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      timetable: 'calendar',
      exam: 'doc.text.fill',
      result: 'chart.bar.fill',
      subject: 'book.fill',
    };
    return icons[type as keyof typeof icons] || 'doc.fill';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'rejected':
        return colors.error;
      default:
        return themeColors.textSecondary;
    }
  };

  const handleApprove = (id: string) => {
    Alert.alert(
      'Approve Item',
      'Are you sure you want to approve this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setItems(items.map(item => 
              item.id === id ? { ...item, status: 'approved' } : item
            ));
            Alert.alert('Success', 'Item approved successfully');
          },
        },
      ]
    );
  };

  const handleReject = (id: string) => {
    Alert.alert(
      'Reject Item',
      'Are you sure you want to reject this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setItems(items.map(item => 
              item.id === id ? { ...item, status: 'rejected' } : item
            ));
            Alert.alert('Success', 'Item rejected');
          },
        },
      ]
    );
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.status === filter);

  const quickStats = [
    {
      label: 'Subjects',
      value: '24',
      icon: 'book.fill',
      color: colors.primary,
    },
    {
      label: 'Classes',
      value: '16',
      icon: 'person.3.fill',
      color: colors.secondary,
    },
    {
      label: 'Exams',
      value: '8',
      icon: 'doc.text.fill',
      color: colors.accent,
    },
    {
      label: 'Pending',
      value: items.filter(i => i.status === 'pending').length.toString(),
      icon: 'clock.fill',
      color: colors.warning,
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Academic Control',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
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

          <View style={styles.filterContainer}>
            {(['all', 'pending', 'approved'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filter === status && { backgroundColor: colors.primary },
                  filter !== status && { backgroundColor: themeColors.card },
                ]}
                onPress={() => setFilter(status)}
              >
                <Text style={[
                  styles.filterText,
                  { color: filter === status ? '#FFFFFF' : themeColors.text }
                ]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Academic Items ({filteredItems.length})
          </Text>

          {filteredItems.map((item) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.itemHeader}>
                <View style={[styles.typeIcon, { backgroundColor: getTypeColor(item.type) + '20' }]}>
                  <IconSymbol name={getTypeIcon(item.type) as any} size={24} color={getTypeColor(item.type)} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemTitle, { color: themeColors.text }]}>
                    {item.title}
                  </Text>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                    <Text style={styles.typeText}>
                      {item.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.itemDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="person.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {item.submittedBy}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="building.2.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {item.class}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              {item.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.success }]}
                    onPress={() => handleApprove(item.id)}
                  >
                    <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles.actionText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.error }]}
                    onPress={() => handleReject(item.id)}
                  >
                    <IconSymbol name="xmark" size={18} color="#FFFFFF" />
                    <Text style={styles.actionText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  itemCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
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
  itemDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
