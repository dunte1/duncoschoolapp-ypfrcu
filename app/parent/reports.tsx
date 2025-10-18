
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

export default function ParentReports() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedChild, setSelectedChild] = useState('John Kamau');

  const children = ['John Kamau', 'Mary Kamau'];

  const reports = [
    {
      id: '1',
      title: 'Term 1 Report Card',
      term: 'Term 1, 2024',
      date: '2024-01-30',
      overallGrade: 'A',
      status: 'available',
    },
    {
      id: '2',
      title: 'Mid-Term Progress Report',
      term: 'Term 1, 2024',
      date: '2024-02-15',
      overallGrade: 'A-',
      status: 'available',
    },
    {
      id: '3',
      title: 'Term 2 Report Card',
      term: 'Term 2, 2024',
      date: '2024-04-30',
      status: 'pending',
    },
  ];

  const handleDownloadReport = (reportTitle: string) => {
    Alert.alert('Download Report', `Downloading ${reportTitle}...`);
    console.log('Downloading report:', reportTitle);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return colors.secondary;
    if (grade.startsWith('B')) return colors.primary;
    if (grade.startsWith('C')) return colors.warning;
    return colors.error;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Reports',
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
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Available Reports
          </Text>

          {reports.map((report) => (
            <View
              key={report.id}
              style={[styles.reportCard, { backgroundColor: themeColors.card }]}
            >
              <View
                style={[
                  styles.reportIcon,
                  {
                    backgroundColor:
                      report.status === 'available'
                        ? colors.primary + '20'
                        : colors.textSecondary + '20',
                  },
                ]}
              >
                <IconSymbol
                  name="doc.text.fill"
                  size={28}
                  color={
                    report.status === 'available' ? colors.primary : colors.textSecondary
                  }
                />
              </View>
              <View style={styles.reportInfo}>
                <Text style={[styles.reportTitle, { color: themeColors.text }]}>
                  {report.title}
                </Text>
                <Text style={[styles.reportTerm, { color: themeColors.textSecondary }]}>
                  {report.term}
                </Text>
                <View style={styles.reportMeta}>
                  <IconSymbol name="calendar" size={14} color={themeColors.textSecondary} />
                  <Text style={[styles.reportDate, { color: themeColors.textSecondary }]}>
                    {new Date(report.date).toLocaleDateString()}
                  </Text>
                </View>
                {report.overallGrade && (
                  <View
                    style={[
                      styles.gradeBadge,
                      { backgroundColor: getGradeColor(report.overallGrade) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.gradeText,
                        { color: getGradeColor(report.overallGrade) },
                      ]}
                    >
                      Overall: {report.overallGrade}
                    </Text>
                  </View>
                )}
              </View>
              {report.status === 'available' ? (
                <TouchableOpacity
                  style={[styles.downloadButton, { backgroundColor: colors.primary }]}
                  onPress={() => handleDownloadReport(report.title)}
                >
                  <IconSymbol name="arrow.down.circle.fill" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              ) : (
                <View style={[styles.pendingBadge, { backgroundColor: colors.warning + '20' }]}>
                  <Text style={[styles.pendingText, { color: colors.warning }]}>
                    Pending
                  </Text>
                </View>
              )}
            </View>
          ))}

          <View style={[styles.infoCard, { backgroundColor: colors.primary + '10' }]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary }]}>
              Report cards are generated at the end of each term. You will receive a notification when new reports are available.
            </Text>
          </View>
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
    flexDirection: 'row',
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
  reportCard: {
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
  reportIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reportTerm: {
    fontSize: 13,
    marginBottom: 6,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 12,
  },
  gradeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  downloadButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pendingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
