
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

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  attendance: number;
  leaveBalance: number;
  salary: number;
  status: 'active' | 'on-leave' | 'inactive';
}

export default function HRManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Mr. Anderson',
      role: 'Mathematics Teacher',
      department: 'Science',
      attendance: 95,
      leaveBalance: 12,
      salary: 45000,
      status: 'active',
    },
    {
      id: '2',
      name: 'Mrs. Johnson',
      role: 'English Teacher',
      department: 'Languages',
      attendance: 92,
      leaveBalance: 8,
      salary: 42000,
      status: 'active',
    },
    {
      id: '3',
      name: 'Mr. Smith',
      role: 'Physics Teacher',
      department: 'Science',
      attendance: 88,
      leaveBalance: 5,
      salary: 48000,
      status: 'on-leave',
    },
  ]);

  const stats = [
    { label: 'Total Staff', value: staff.length.toString(), icon: 'person.3.fill', color: colors.primary },
    { label: 'Active', value: staff.filter(s => s.status === 'active').length.toString(), icon: 'checkmark.circle.fill', color: colors.success },
    { label: 'On Leave', value: staff.filter(s => s.status === 'on-leave').length.toString(), icon: 'calendar', color: colors.warning },
    { label: 'Departments', value: '8', icon: 'building.2.fill', color: colors.secondary },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.success;
      case 'on-leave':
        return colors.warning;
      case 'inactive':
        return colors.error;
      default:
        return themeColors.textSecondary;
    }
  };

  const handleViewPayroll = (staffId: string) => {
    const member = staff.find(s => s.id === staffId);
    Alert.alert(
      'Payroll Details',
      `Staff: ${member?.name}\nSalary: KES ${member?.salary.toLocaleString()}\n\nPayroll management coming soon!`
    );
  };

  const handleViewAttendance = (staffId: string) => {
    const member = staff.find(s => s.id === staffId);
    Alert.alert(
      'Attendance Details',
      `Staff: ${member?.name}\nAttendance: ${member?.attendance}%\n\nDetailed attendance tracking coming soon!`
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'HR & Staff Management',
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
            Staff Members
          </Text>

          {staff.map((member) => (
            <View key={member.id} style={[styles.staffCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.staffHeader}>
                <View style={[styles.staffIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="person.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.staffInfo}>
                  <Text style={[styles.staffName, { color: themeColors.text }]}>
                    {member.name}
                  </Text>
                  <Text style={[styles.staffRole, { color: themeColors.textSecondary }]}>
                    {member.role}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(member.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(member.status) }]}>
                    {member.status}
                  </Text>
                </View>
              </View>

              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricValue, { color: themeColors.text }]}>
                    {member.attendance}%
                  </Text>
                  <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>
                    Attendance
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricValue, { color: themeColors.text }]}>
                    {member.leaveBalance}
                  </Text>
                  <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>
                    Leave Days
                  </Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricValue, { color: colors.success }]}>
                    {member.salary.toLocaleString()}
                  </Text>
                  <Text style={[styles.metricLabel, { color: themeColors.textSecondary }]}>
                    Salary (KES)
                  </Text>
                </View>
              </View>

              <View style={styles.staffDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="building.2.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {member.department} Department
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.primary + '20' }]}
                  onPress={() => handleViewAttendance(member.id)}
                >
                  <IconSymbol name="calendar" size={18} color={colors.primary} />
                  <Text style={[styles.actionText, { color: colors.primary }]}>Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.success + '20' }]}
                  onPress={() => handleViewPayroll(member.id)}
                >
                  <IconSymbol name="dollarsign.circle.fill" size={18} color={colors.success} />
                  <Text style={[styles.actionText, { color: colors.success }]}>Payroll</Text>
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
  staffCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  staffHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  staffIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  staffRole: {
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
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
  },
  staffDetails: {
    gap: 8,
    marginBottom: 16,
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
    fontSize: 14,
    fontWeight: '600',
  },
});
