
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

export default function TeacherResources() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [activeTab, setActiveTab] = useState<'materials' | 'lessons'>('materials');

  const materials = [
    { id: '1', title: 'Quadratic Equations Notes.pdf', type: 'pdf', size: '2.5 MB', date: '2024-02-20', class: 'Form 4A' },
    { id: '2', title: 'Physics Lab Video.mp4', type: 'video', size: '45 MB', date: '2024-02-18', class: 'Form 4B' },
    { id: '3', title: 'Algebra Practice Sheet.pdf', type: 'pdf', size: '1.2 MB', date: '2024-02-15', class: 'Form 3B' },
  ];

  const lessons = [
    { id: '1', title: 'Introduction to Quadratic Equations', subject: 'Mathematics', class: 'Form 4A', duration: '45 min' },
    { id: '2', title: 'Newton&apos;s Laws of Motion', subject: 'Physics', class: 'Form 4B', duration: '60 min' },
    { id: '3', title: 'Algebraic Expressions', subject: 'Mathematics', class: 'Form 3B', duration: '40 min' },
  ];

  const handleUpload = () => {
    Alert.alert('Upload', 'File upload functionality would open here');
    console.log('Upload file');
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'doc.fill';
      case 'video':
        return 'play.rectangle.fill';
      default:
        return 'doc';
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Teaching Resources',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'materials' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab('materials')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'materials' ? '#FFFFFF' : themeColors.text },
                ]}
              >
                Materials
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'lessons' && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveTab('lessons')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === 'lessons' ? '#FFFFFF' : themeColors.text },
                ]}
              >
                Lesson Plans
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.uploadButton, { backgroundColor: colors.primary }]}
            onPress={handleUpload}
          >
            <IconSymbol name="arrow.up.doc.fill" size={20} color="#FFFFFF" />
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {activeTab === 'materials' ? (
            materials.map((material) => (
              <TouchableOpacity
                key={material.id}
                style={[styles.materialCard, { backgroundColor: themeColors.card }]}
              >
                <View style={[styles.fileIcon, { backgroundColor: colors.accent + '20' }]}>
                  <IconSymbol name={getFileIcon(material.type) as any} size={24} color={colors.accent} />
                </View>
                <View style={styles.materialInfo}>
                  <Text style={[styles.materialTitle, { color: themeColors.text }]}>
                    {material.title}
                  </Text>
                  <Text style={[styles.materialClass, { color: colors.primary }]}>
                    {material.class}
                  </Text>
                  <View style={styles.materialMeta}>
                    <Text style={[styles.materialSize, { color: themeColors.textSecondary }]}>
                      {material.size}
                    </Text>
                    <Text style={[styles.materialDate, { color: themeColors.textSecondary }]}>
                      {new Date(material.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            ))
          ) : (
            lessons.map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={[styles.lessonCard, { backgroundColor: themeColors.card }]}
              >
                <View style={[styles.lessonIcon, { backgroundColor: colors.secondary + '20' }]}>
                  <IconSymbol name="book.fill" size={24} color={colors.secondary} />
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={[styles.lessonTitle, { color: themeColors.text }]}>
                    {lesson.title}
                  </Text>
                  <Text style={[styles.lessonSubject, { color: colors.primary }]}>
                    {lesson.subject} - {lesson.class}
                  </Text>
                  <View style={styles.lessonMeta}>
                    <IconSymbol name="clock.fill" size={14} color={themeColors.textSecondary} />
                    <Text style={[styles.lessonDuration, { color: themeColors.textSecondary }]}>
                      {lesson.duration}
                    </Text>
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={20} color={themeColors.textSecondary} />
              </TouchableOpacity>
            ))
          )}
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  materialCard: {
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
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  materialClass: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  materialMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  materialSize: {
    fontSize: 12,
  },
  materialDate: {
    fontSize: 12,
  },
  lessonCard: {
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
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonSubject: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonDuration: {
    fontSize: 12,
  },
});
