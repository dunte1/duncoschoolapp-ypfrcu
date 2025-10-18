
import React from 'react';
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
import { mockInvoices } from '@/utils/mockData';

export default function FinanceScreen() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'overdue':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const handlePayment = (invoice: any) => {
    Alert.alert(
      'M-PESA Payment',
      `Initiate M-PESA payment for ${invoice.title}?\nAmount: KES ${invoice.amount.toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: () => {
            Alert.alert('Payment Initiated', 'Please check your phone for M-PESA prompt');
          },
        },
      ]
    );
  };

  const totalPaid = mockInvoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPending = mockInvoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Finance',
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
            Financial Summary
          </Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <IconSymbol name="checkmark.circle.fill" size={32} color={colors.success} />
              <Text style={[styles.summaryValue, { color: colors.success }]}>
                KES {totalPaid.toLocaleString()}
              </Text>
              <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
                Paid
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <IconSymbol name="clock.fill" size={32} color={colors.warning} />
              <Text style={[styles.summaryValue, { color: colors.warning }]}>
                KES {totalPending.toLocaleString()}
              </Text>
              <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
                Pending
              </Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          Invoices
        </Text>

        {mockInvoices.map((invoice) => (
          <View
            key={invoice.id}
            style={[styles.invoiceCard, { backgroundColor: themeColors.card }]}
          >
            <View style={styles.invoiceHeader}>
              <View style={styles.invoiceLeft}>
                <View
                  style={[
                    styles.invoiceIcon,
                    { backgroundColor: getStatusColor(invoice.status) + '20' },
                  ]}
                >
                  <IconSymbol
                    name="dollarsign.circle.fill"
                    size={28}
                    color={getStatusColor(invoice.status)}
                  />
                </View>
                <View style={styles.invoiceInfo}>
                  <Text style={[styles.invoiceTitle, { color: themeColors.text }]}>
                    {invoice.title}
                  </Text>
                  <Text style={[styles.invoiceDescription, { color: themeColors.textSecondary }]}>
                    {invoice.description}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.invoiceDetails}>
              <View style={styles.detailRow}>
                <IconSymbol
                  name="calendar"
                  size={16}
                  color={themeColors.textSecondary}
                />
                <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.amount, { color: themeColors.text }]}>
                KES {invoice.amount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.invoiceFooter}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(invoice.status) },
                ]}
              >
                <Text style={styles.statusText}>{invoice.status.toUpperCase()}</Text>
              </View>
              {invoice.status !== 'paid' && (
                <TouchableOpacity
                  style={[styles.payButton, { backgroundColor: colors.primary }]}
                  onPress={() => handlePayment(invoice)}
                >
                  <IconSymbol name="creditcard.fill" size={16} color="#FFFFFF" />
                  <Text style={styles.payButtonText}>Pay with M-PESA</Text>
                </TouchableOpacity>
              )}
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
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  invoiceCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invoiceHeader: {
    marginBottom: 12,
  },
  invoiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  invoiceDescription: {
    fontSize: 13,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
