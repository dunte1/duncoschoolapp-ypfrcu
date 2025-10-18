
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

interface Transaction {
  id: string;
  studentName: string;
  type: 'tuition' | 'library' | 'sports' | 'transport' | 'other';
  amount: number;
  method: 'mpesa' | 'bank' | 'cash';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  reference: string;
}

export default function FinanceManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      studentName: 'Jane Student',
      type: 'tuition',
      amount: 15000,
      method: 'mpesa',
      status: 'pending',
      date: '2024-01-15',
      reference: 'MPESA123456',
    },
    {
      id: '2',
      studentName: 'John Doe',
      type: 'library',
      amount: 500,
      method: 'bank',
      status: 'approved',
      date: '2024-01-14',
      reference: 'BANK789012',
    },
    {
      id: '3',
      studentName: 'Mary Smith',
      type: 'sports',
      amount: 1000,
      method: 'cash',
      status: 'pending',
      date: '2024-01-13',
      reference: 'CASH345678',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

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

  const getTypeIcon = (type: string) => {
    const icons = {
      tuition: 'graduationcap.fill',
      library: 'book.fill',
      sports: 'sportscourt.fill',
      transport: 'bus.fill',
      other: 'dollarsign.circle.fill',
    };
    return icons[type as keyof typeof icons] || 'dollarsign.circle.fill';
  };

  const getMethodIcon = (method: string) => {
    const icons = {
      mpesa: 'phone.fill',
      bank: 'building.columns.fill',
      cash: 'banknote.fill',
    };
    return icons[method as keyof typeof icons] || 'dollarsign.circle.fill';
  };

  const handleApprove = (id: string) => {
    Alert.alert(
      'Approve Payment',
      'Are you sure you want to approve this payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            setTransactions(transactions.map(t => 
              t.id === id ? { ...t, status: 'approved' } : t
            ));
            Alert.alert('Success', 'Payment approved successfully');
          },
        },
      ]
    );
  };

  const handleReject = (id: string) => {
    Alert.alert(
      'Reject Payment',
      'Are you sure you want to reject this payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            setTransactions(transactions.map(t => 
              t.id === id ? { ...t, status: 'rejected' } : t
            ));
            Alert.alert('Success', 'Payment rejected');
          },
        },
      ]
    );
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.status === filter);

  const totalRevenue = transactions
    .filter(t => t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Finance & Fees',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.success + '20' }]}>
              <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
              <Text style={[styles.statValue, { color: colors.success }]}>
                KES {totalRevenue.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: colors.success }]}>
                Total Revenue
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.warning + '20' }]}>
              <IconSymbol name="clock.fill" size={32} color={colors.warning} />
              <Text style={[styles.statValue, { color: colors.warning }]}>
                KES {pendingAmount.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: colors.warning }]}>
                Pending
              </Text>
            </View>
          </View>

          <View style={styles.filterContainer}>
            {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
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
            Transactions ({filteredTransactions.length})
          </Text>

          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={[styles.transactionCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.transactionHeader}>
                <View style={[styles.typeIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name={getTypeIcon(transaction.type) as any} size={24} color={colors.primary} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={[styles.studentName, { color: themeColors.text }]}>
                    {transaction.studentName}
                  </Text>
                  <Text style={[styles.transactionType, { color: themeColors.textSecondary }]}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} Fee
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>

              <View style={styles.transactionDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name={getMethodIcon(transaction.method) as any} size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {transaction.method.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="number" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {transaction.reference}
                  </Text>
                </View>
              </View>

              <View style={styles.amountContainer}>
                <Text style={[styles.amount, { color: colors.success }]}>
                  KES {transaction.amount.toLocaleString()}
                </Text>
              </View>

              {transaction.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.success }]}
                    onPress={() => handleApprove(transaction.id)}
                  >
                    <IconSymbol name="checkmark" size={18} color="#FFFFFF" />
                    <Text style={styles.actionText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.error }]}
                    onPress={() => handleReject(transaction.id)}
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
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
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
  transactionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
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
  transactionInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionType: {
    fontSize: 13,
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
  transactionDetails: {
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
  amountContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
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
