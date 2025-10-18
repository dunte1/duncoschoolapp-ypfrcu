
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

export default function TeacherReports() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [selectedClass, setSelectedClass] = useState('Form 4A');

  const classes = ['Form 4A', 'Form 3B', 'Form 4B', 'Form 3A', 'Form 2A'];

  const reportTypes = [
    {
      id: '1',
      title: 'Class Performance Report',
      description: 'Overall class academic performance',
      icon: 'chart.bar.fill',
      color: colors.primary,
    },
    {
      id: '2',
      title: 'Student Report Cards',
      description: 'Individual student progress reports',
      icon: 'doc.text.fill',
      color: colors.secondary,
    },
    {
      id: '3',
      title: 'Attendance Summary',
      description: 'Class attendance statistics',
      icon: 'checkmark.circle.fill',
      color: colors.accent,
    },
    {
      id: '4',
      title: 'Exam Analysis',
      description: 'Detailed exam performance analysis',
      icon: 'chart.pie.fill',
      color: colors.warning,
    },
    {
      id: '5',
      title: 'Export Marksheet',
      description: 'Download marks in Excel format',
      icon: 'square.and.arrow.down.fill',
      color: colors.error,
    },
  ];

  const handleGenerateReport = (reportType: string) => {
    Alert.alert('Generate Report', `Generating ${reportType} for ${selectedClass}`);
    console.log('Generating report:', reportType, selectedClass);
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
            Select Class
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.classSelector}
          >
            {classes.map((className) => (
              <TouchableOpacity
                key={className}
                style={[
                  styles.classChip,
                  selectedClass === className && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setSelectedClass(className)}
              >
                <Text
                  style={[
                    styles.classChipText,
                    {
                      color:
                        selectedClass === className ? '#FFFFFF' : themeColors.text,
                    },
                  ]}
                >
                  {className}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Available Reports
          </Text>

          {reportTypes.map((report) => (
            <TouchableOpacity
              key={report.id}
              style={[styles.reportCard, { backgroundColor: themeColors.card }]}
              onPress={() => handleGenerateReport(report.title)}
            >
              <View style={[styles.reportIcon, { backgroundColor: report.color + '20' }]}>
                <IconSymbol name={report.icon as any} size={28} color={report.color} />
              </View>
              <View style={styles.reportInfo}>
                <Text style={[styles.reportTitle, { color: themeColors.text }]}>
                  {report.title}
                </Text>
                <Text style={[styles.reportDescription, { color: themeColors.textSecondary }]}>
                  {report.description}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={themeColors.textSecondary} />
            </TouchableOpacity>
          ))}

          <View style={[styles.infoCard, { backgroundColor: colors.primary + '10' }]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.primary }]}>
              Reports are generated based on the latest data. You can export them in PDF or Excel format.
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
  classSelector: {
    flexDirection: 'row',
  },
  classChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  classChipText: {
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
  reportDescription: {
    fontSize: 13,
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
