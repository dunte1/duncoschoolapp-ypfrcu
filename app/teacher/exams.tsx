
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface Exam {
  id: string;
  title: string;
  class: string;
  subject: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: 'upcoming' | 'completed' | 'graded';
  studentsMarked?: number;
  totalStudents?: number;
}

export default function TeacherExams() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMarkingModal, setShowMarkingModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'graded'>('upcoming');

  const [newExam, setNewExam] = useState({
    title: '',
    class: 'Form 4A',
    subject: 'Mathematics',
    date: '',
    duration: '',
    totalMarks: '',
  });

  const exams: Exam[] = [
    {
      id: '1',
      title: 'Mid-Term Exam',
      class: 'Form 4A',
      subject: 'Mathematics',
      date: '2024-02-20',
      duration: '2 hours',
      totalMarks: 100,
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Unit Test 3',
      class: 'Form 3B',
      subject: 'Mathematics',
      date: '2024-02-15',
      duration: '1 hour',
      totalMarks: 50,
      status: 'completed',
      studentsMarked: 15,
      totalStudents: 28,
    },
    {
      id: '3',
      title: 'Final Exam',
      class: 'Form 4B',
      subject: 'Physics',
      date: '2024-01-30',
      duration: '2.5 hours',
      totalMarks: 100,
      status: 'graded',
      studentsMarked: 30,
      totalStudents: 30,
    },
  ];

  const students = [
    { id: '1', name: 'John Kamau', rollNumber: 'F4A001', marks: '' },
    { id: '2', name: 'Mary Wanjiru', rollNumber: 'F4A002', marks: '' },
    { id: '3', name: 'Peter Ochieng', rollNumber: 'F4A003', marks: '' },
    { id: '4', name: 'Grace Akinyi', rollNumber: 'F4A004', marks: '' },
    { id: '5', name: 'David Mwangi', rollNumber: 'F4A005', marks: '' },
  ];

  const filteredExams = exams.filter((exam) => exam.status === activeTab);

  const handleCreateExam = () => {
    if (!newExam.title || !newExam.date || !newExam.duration || !newExam.totalMarks) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Exam created successfully');
    console.log('Creating exam:', newExam);
    setShowCreateModal(false);
    setNewExam({
      title: '',
      class: 'Form 4A',
      subject: 'Mathematics',
      date: '',
      duration: '',
      totalMarks: '',
    });
  };

  const handleMarkExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowMarkingModal(true);
  };

  const handleSaveMarks = () => {
    Alert.alert('Success', 'Marks saved successfully');
    console.log('Saving marks for exam:', selectedExam);
    setShowMarkingModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return colors.primary;
      case 'completed':
        return colors.warning;
      case 'graded':
        return colors.secondary;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Exams & Marks',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <View style={styles.tabContainer}>
            {(['upcoming', 'completed', 'graded'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && {
                    backgroundColor: colors.primary,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: activeTab === tab ? '#FFFFFF' : themeColors.text,
                    },
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowCreateModal(true)}
          >
            <IconSymbol name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create Exam</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.examsList} contentContainerStyle={styles.examsContent}>
          {filteredExams.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="doc.text" size={64} color={themeColors.textSecondary} />
              <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                No {activeTab} exams
              </Text>
            </View>
          ) : (
            filteredExams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                style={[styles.examCard, { backgroundColor: themeColors.card }]}
                onPress={() => {
                  if (exam.status === 'completed') {
                    handleMarkExam(exam);
                  }
                }}
              >
                <View style={styles.examHeader}>
                  <View style={styles.examInfo}>
                    <Text style={[styles.examTitle, { color: themeColors.text }]}>
                      {exam.title}
                    </Text>
                    <Text style={[styles.examSubject, { color: colors.primary }]}>
                      {exam.subject} - {exam.class}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(exam.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: getStatusColor(exam.status) }]}
                    >
                      {exam.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.examDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                    <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                      {new Date(exam.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="clock.fill" size={16} color={themeColors.textSecondary} />
                    <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                      {exam.duration}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol
                      name="chart.bar.fill"
                      size={16}
                      color={themeColors.textSecondary}
                    />
                    <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                      {exam.totalMarks} marks
                    </Text>
                  </View>
                </View>

                {exam.status !== 'upcoming' && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${((exam.studentsMarked || 0) / (exam.totalStudents || 1)) * 100}%`,
                            backgroundColor: getStatusColor(exam.status),
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressText, { color: themeColors.textSecondary }]}>
                      {exam.studentsMarked}/{exam.totalStudents} students marked
                    </Text>
                  </View>
                )}

                {exam.status === 'completed' && (
                  <TouchableOpacity
                    style={[styles.markButton, { backgroundColor: colors.warning }]}
                    onPress={() => handleMarkExam(exam)}
                  >
                    <IconSymbol name="pencil" size={16} color="#FFFFFF" />
                    <Text style={styles.markButtonText}>Enter Marks</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>

      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Create New Exam
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Exam Title</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="e.g., Mid-Term Exam"
                placeholderTextColor={themeColors.textSecondary}
                value={newExam.title}
                onChangeText={(text) => setNewExam({ ...newExam, title: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Class</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                value={newExam.class}
                onChangeText={(text) => setNewExam({ ...newExam, class: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Subject</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                value={newExam.subject}
                onChangeText={(text) => setNewExam({ ...newExam, subject: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Date</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={themeColors.textSecondary}
                value={newExam.date}
                onChangeText={(text) => setNewExam({ ...newExam, date: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Duration</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="e.g., 2 hours"
                placeholderTextColor={themeColors.textSecondary}
                value={newExam.duration}
                onChangeText={(text) => setNewExam({ ...newExam, duration: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Total Marks</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="e.g., 100"
                placeholderTextColor={themeColors.textSecondary}
                keyboardType="numeric"
                value={newExam.totalMarks}
                onChangeText={(text) => setNewExam({ ...newExam, totalMarks: text })}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleCreateExam}
            >
              <Text style={styles.submitButtonText}>Create Exam</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={showMarkingModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowMarkingModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowMarkingModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Enter Marks
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={[styles.examInfoCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.examInfoTitle, { color: themeColors.text }]}>
                {selectedExam?.title}
              </Text>
              <Text style={[styles.examInfoSubtitle, { color: themeColors.textSecondary }]}>
                {selectedExam?.class} - {selectedExam?.subject}
              </Text>
              <Text style={[styles.examInfoMarks, { color: colors.primary }]}>
                Total Marks: {selectedExam?.totalMarks}
              </Text>
            </View>

            {students.map((student) => (
              <View
                key={student.id}
                style={[styles.studentMarkCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.studentMarkInfo}>
                  <Text style={[styles.studentMarkName, { color: themeColors.text }]}>
                    {student.name}
                  </Text>
                  <Text style={[styles.studentMarkRoll, { color: themeColors.textSecondary }]}>
                    {student.rollNumber}
                  </Text>
                </View>
                <TextInput
                  style={[styles.markInput, { backgroundColor: themeColors.background, color: themeColors.text }]}
                  placeholder="0"
                  placeholderTextColor={themeColors.textSecondary}
                  keyboardType="numeric"
                  value={student.marks}
                />
              </View>
            ))}

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleSaveMarks}
            >
              <Text style={styles.submitButtonText}>Save Marks</Text>
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
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  examsList: {
    flex: 1,
  },
  examsContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  examCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  examSubject: {
    fontSize: 14,
    fontWeight: '500',
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
  examDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
  },
  markButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    marginTop: 8,
  },
  markButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  examInfoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  examInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  examInfoSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  examInfoMarks: {
    fontSize: 14,
    fontWeight: '600',
  },
  studentMarkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  studentMarkInfo: {
    flex: 1,
  },
  studentMarkName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  studentMarkRoll: {
    fontSize: 14,
  },
  markInput: {
    width: 80,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
