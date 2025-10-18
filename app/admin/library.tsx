
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

interface LibraryItem {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'author' | 'borrow' | 'return';
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  date: string;
}

export default function LibraryManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [items, setItems] = useState<LibraryItem[]>([
    {
      id: '1',
      title: 'Introduction to Physics',
      author: 'Dr. Smith',
      type: 'book',
      status: 'pending',
      submittedBy: 'Librarian',
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'Advanced Mathematics',
      author: 'Prof. Johnson',
      type: 'book',
      status: 'approved',
      submittedBy: 'Librarian',
      date: '2024-01-14',
    },
  ]);

  const stats = [
    { label: 'Total Books', value: '1,245', icon: 'book.fill', color: colors.primary },
    { label: 'Borrowed', value: '342', icon: 'arrow.up.right', color: colors.warning },
    { label: 'Available', value: '903', icon: 'checkmark.circle.fill', color: colors.success },
    { label: 'Overdue', value: '23', icon: 'exclamationmark.triangle.fill', color: colors.error },
  ];

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

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Library Management',
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

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Pending Approvals
          </Text>

          {items.filter(item => item.status === 'pending').map((item) => (
            <View key={item.id} style={[styles.itemCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.itemHeader}>
                <View style={[styles.bookIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="book.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemTitle, { color: themeColors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.itemAuthor, { color: themeColors.textSecondary }]}>
                    by {item.author}
                  </Text>
                </View>
              </View>

              <View style={styles.itemDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="person.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    Submitted by {item.submittedBy}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>

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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
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
    marginBottom: 12,
  },
  bookIcon: {
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
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 13,
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
