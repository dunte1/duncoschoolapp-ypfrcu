
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface Invoice {
  id: string;
  studentName: string;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export default function ParentFees() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const invoices: Invoice[] = [
    {
      id: '1',
      studentName: 'John Kamau',
      title: 'Tuition Fee - Term 1',
      amount: 15000,
      dueDate: '2024-03-01',
      status: 'pending',
      description: 'First term tuition payment',
    },
    {
      id: '2',
      studentName: 'John Kamau',
      title: 'Library Fee',
      amount: 500,
      dueDate: '2024-02-15',
      status: 'paid',
      description: 'Annual library membership',
    },
    {
      id: '3',
      studentName: 'Mary Kamau',
      title: 'Tuition Fee - Term 1',
      amount: 12000,
      dueDate: '2024-03-01',
      status: 'pending',
      description: 'First term tuition payment',
    },
    {
      id: '4',
      studentName: 'Mary Kamau',
      title: 'Sports Fee',
      amount: 1000,
      dueDate: '2024-01-30',
      status: 'overdue',
      description: 'Sports activities fee',
    },
  ];

  const payments = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 15000,
      method: 'M-PESA',
      reference: 'QA12345678',
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-01-10',
      amount: 500,
      method: 'Bank Transfer',
      reference: 'BT98765432',
      status: 'completed',
    },
  ];

  const handlePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = () => {
    if (paymentMethod === 'mpesa' && !phoneNumber) {
      Alert.alert('Error', 'Please enter M-PESA phone number');
      return;
    }
    Alert.alert(
      'Payment Initiated',
      `Payment of KES ${selectedInvoice?.amount} via ${paymentMethod.toUpperCase()} has been initiated. You will receive a confirmation shortly.`
    );
    console.log('Payment submitted:', { invoice: selectedInvoice, method: paymentMethod, phone: phoneNumber });
    setShowPaymentModal(false);
    setPhoneNumber('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return colors.secondary;
      case 'pending':
        return colors.warning;
      case 'overdue':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const totalPending = invoices
    .filter((inv) => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Fees & Payments',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.summaryCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
              Total Pending
            </Text>
            <Text style={[styles.summaryValue, { color: colors.error }]}>
              KES {totalPending.toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: themeColors.textSecondary }]}>
              Paid This Term
            </Text>
            <Text style={[styles.summaryValue, { color: colors.secondary }]}>
              KES 15,500
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Invoices
          </Text>

          {invoices.map((invoice) => (
            <View
              key={invoice.id}
              style={[styles.invoiceCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.invoiceHeader}>
                <View style={styles.invoiceInfo}>
                  <Text style={[styles.invoiceTitle, { color: themeColors.text }]}>
                    {invoice.title}
                  </Text>
                  <Text style={[styles.invoiceStudent, { color: themeColors.textSecondary }]}>
                    {invoice.studentName}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(invoice.status) + '20' },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: getStatusColor(invoice.status) }]}
                  >
                    {invoice.status}
                  </Text>
                </View>
              </View>

              <Text style={[styles.invoiceDescription, { color: themeColors.textSecondary }]}>
                {invoice.description}
              </Text>

              <View style={styles.invoiceDetails}>
                <View style={styles.detailItem}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    Due: {new Date(invoice.dueDate).toLocaleDateString()}
                  </Text>
                </View>
                <Text style={[styles.invoiceAmount, { color: colors.primary }]}>
                  KES {invoice.amount.toLocaleString()}
                </Text>
              </View>

              {invoice.status !== 'paid' && (
                <TouchableOpacity
                  style={[styles.payButton, { backgroundColor: colors.primary }]}
                  onPress={() => handlePayment(invoice)}
                >
                  <IconSymbol name="creditcard.fill" size={16} color="#FFFFFF" />
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Payment History
          </Text>

          {payments.map((payment) => (
            <View
              key={payment.id}
              style={[styles.paymentCard, { backgroundColor: themeColors.card }]}
            >
              <View style={[styles.paymentIcon, { backgroundColor: colors.secondary + '20' }]}>
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.secondary} />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={[styles.paymentAmount, { color: themeColors.text }]}>
                  KES {payment.amount.toLocaleString()}
                </Text>
                <Text style={[styles.paymentMethod, { color: themeColors.textSecondary }]}>
                  {payment.method} - {payment.reference}
                </Text>
                <Text style={[styles.paymentDate, { color: themeColors.textSecondary }]}>
                  {new Date(payment.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={showPaymentModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Make Payment
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={[styles.paymentInfoCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.paymentInfoTitle, { color: themeColors.text }]}>
                {selectedInvoice?.title}
              </Text>
              <Text style={[styles.paymentInfoStudent, { color: themeColors.textSecondary }]}>
                {selectedInvoice?.studentName}
              </Text>
              <Text style={[styles.paymentInfoAmount, { color: colors.primary }]}>
                KES {selectedInvoice?.amount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>
                Payment Method
              </Text>
              <View style={styles.methodButtons}>
                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    paymentMethod === 'mpesa' && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setPaymentMethod('mpesa')}
                >
                  <Text
                    style={[
                      styles.methodButtonText,
                      { color: paymentMethod === 'mpesa' ? '#FFFFFF' : themeColors.text },
                    ]}
                  >
                    M-PESA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.methodButton,
                    paymentMethod === 'bank' && { backgroundColor: colors.primary },
                  ]}
                  onPress={() => setPaymentMethod('bank')}
                >
                  <Text
                    style={[
                      styles.methodButtonText,
                      { color: paymentMethod === 'bank' ? '#FFFFFF' : themeColors.text },
                    ]}
                  >
                    Bank Transfer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {paymentMethod === 'mpesa' && (
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: themeColors.text }]}>
                  M-PESA Phone Number
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: themeColors.card, color: themeColors.text },
                  ]}
                  placeholder="e.g., 0712345678"
                  placeholderTextColor={themeColors.textSecondary}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
                <Text style={[styles.helpText, { color: themeColors.textSecondary }]}>
                  You will receive an M-PESA prompt on this number
                </Text>
              </View>
            )}

            {paymentMethod === 'bank' && (
              <View style={[styles.bankInfoCard, { backgroundColor: themeColors.card }]}>
                <Text style={[styles.bankInfoTitle, { color: themeColors.text }]}>
                  Bank Details
                </Text>
                <Text style={[styles.bankInfoText, { color: themeColors.textSecondary }]}>
                  Bank: Equity Bank
                </Text>
                <Text style={[styles.bankInfoText, { color: themeColors.textSecondary }]}>
                  Account: 0123456789
                </Text>
                <Text style={[styles.bankInfoText, { color: themeColors.textSecondary }]}>
                  Branch: Nairobi
                </Text>
                <Text style={[styles.bankInfoNote, { color: colors.warning }]}>
                  Please use invoice ID as reference
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSubmitPayment}
            >
              <Text style={styles.submitButtonText}>
                {paymentMethod === 'mpesa' ? 'Send M-PESA Prompt' : 'Confirm Payment'}
              </Text>
            </TouchableOpacity>
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
  summaryCard: {
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
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
    marginTop: 8,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  invoiceStudent: {
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
  invoiceDescription: {
    fontSize: 13,
    marginBottom: 12,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  paymentCard: {
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
  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 13,
    marginBottom: 2,
  },
  paymentDate: {
    fontSize: 12,
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
  paymentInfoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  paymentInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentInfoStudent: {
    fontSize: 14,
    marginBottom: 12,
  },
  paymentInfoAmount: {
    fontSize: 28,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 12,
  },
  bankInfoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  bankInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  bankInfoText: {
    fontSize: 14,
    marginBottom: 6,
  },
  bankInfoNote: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
