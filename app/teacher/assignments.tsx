
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

interface Assignment {
  id: string;
  title: string;
  class: string;
  subject: string;
  dueDate: string;
  totalSubmissions: number;
  pendingSubmissions: number;
  status: 'active' | 'closed';
}

export default function TeacherAssignments() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    class: 'Form 4A',
    subject: 'Mathematics',
    description: '',
    dueDate: '',
  });

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Quadratic Equations Worksheet',
      class: 'Form 4A',
      subject: 'Mathematics',
      dueDate: '2024-02-25',
      totalSubmissions: 25,
      pendingSubmissions: 7,
      status: 'active',
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      class: 'Form 4B',
      subject: 'Physics',
      dueDate: '2024-02-28',
      totalSubmissions: 18,
      pendingSubmissions: 12,
      status: 'active',
    },
    {
      id: '3',
      title: 'Algebra Practice Problems',
      class: 'Form 3B',
      subject: 'Mathematics',
      dueDate: '2024-02-15',
      totalSubmissions: 28,
      pendingSubmissions: 0,
      status: 'closed',
    },
  ];

  const submissions = [
    {
      id: '1',
      studentName: 'John Kamau',
      rollNumber: 'F4A001',
      submittedDate: '2024-02-20',
      status: 'submitted',
      grade: 'A',
    },
    {
      id: '2',
      studentName: 'Mary Wanjiru',
      rollNumber: 'F4A002',
      submittedDate: '2024-02-22',
      status: 'submitted',
      grade: 'B+',
    },
    {
      id: '3',
      studentName: 'Peter Ochieng',
      rollNumber: 'F4A003',
      submittedDate: null,
      status: 'pending',
      grade: null,
    },
  ];

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', 'Assignment created successfully');
    console.log('Creating assignment:', newAssignment);
    setShowCreateModal(false);
    setNewAssignment({
      title: '',
      class: 'Form 4A',
      subject: 'Mathematics',
      description: '',
      dueDate: '',
    });
  };

  const handleViewSubmissions = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionsModal(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? colors.secondary : colors.textSecondary;
  };

  const getSubmissionStatusColor = (status: string) => {
    return status === 'submitted' ? colors.secondary : colors.warning;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Assignments',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={[styles.header, { backgroundColor: themeColors.card }]}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {assignments.filter((a) => a.status === 'active').length}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Active
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {assignments.reduce((sum, a) => sum + a.pendingSubmissions, 0)}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Pending
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>
                {assignments.reduce((sum, a) => sum + a.totalSubmissions, 0)}
              </Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                Submitted
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowCreateModal(true)}
          >
            <IconSymbol name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create Assignment</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.assignmentsList} contentContainerStyle={styles.assignmentsContent}>
          {assignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={[styles.assignmentCard, { backgroundColor: themeColors.card }]}
              onPress={() => handleViewSubmissions(assignment)}
            >
              <View style={styles.assignmentHeader}>
                <View style={styles.assignmentInfo}>
                  <Text style={[styles.assignmentTitle, { color: themeColors.text }]}>
                    {assignment.title}
                  </Text>
                  <Text style={[styles.assignmentSubject, { color: colors.primary }]}>
                    {assignment.subject} - {assignment.class}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(assignment.status) + '20' },
                  ]}
                >
                  <Text
                    style={[styles.statusText, { color: getStatusColor(assignment.status) }]}
                  >
                    {assignment.status}
                  </Text>
                </View>
              </View>

              <View style={styles.assignmentDetails}>
                <View style={styles.detailItem}>
                  <IconSymbol name="calendar" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(assignment.totalSubmissions / (assignment.totalSubmissions + assignment.pendingSubmissions)) * 100}%`,
                        backgroundColor: colors.secondary,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: themeColors.textSecondary }]}>
                  {assignment.totalSubmissions} submitted, {assignment.pendingSubmissions} pending
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.viewButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => handleViewSubmissions(assignment)}
              >
                <IconSymbol name="eye.fill" size={16} color={colors.primary} />
                <Text style={[styles.viewButtonText, { color: colors.primary }]}>
                  View Submissions
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
              Create Assignment
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Title *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="Assignment title"
                placeholderTextColor={themeColors.textSecondary}
                value={newAssignment.title}
                onChangeText={(text) => setNewAssignment({ ...newAssignment, title: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Class</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                value={newAssignment.class}
                onChangeText={(text) => setNewAssignment({ ...newAssignment, class: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Subject</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                value={newAssignment.subject}
                onChangeText={(text) => setNewAssignment({ ...newAssignment, subject: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Description *</Text>
              <TextInput
                style={[styles.textArea, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="Assignment description and instructions"
                placeholderTextColor={themeColors.textSecondary}
                multiline
                numberOfLines={6}
                value={newAssignment.description}
                onChangeText={(text) => setNewAssignment({ ...newAssignment, description: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: themeColors.text }]}>Due Date *</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={themeColors.textSecondary}
                value={newAssignment.dueDate}
                onChangeText={(text) => setNewAssignment({ ...newAssignment, dueDate: text })}
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={handleCreateAssignment}
            >
              <Text style={styles.submitButtonText}>Create Assignment</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={showSubmissionsModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSubmissionsModal(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
          <View style={[styles.modalHeader, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity onPress={() => setShowSubmissionsModal(false)}>
              <IconSymbol name="xmark" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Submissions
            </Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={[styles.assignmentInfoCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.assignmentInfoTitle, { color: themeColors.text }]}>
                {selectedAssignment?.title}
              </Text>
              <Text style={[styles.assignmentInfoSubtitle, { color: themeColors.textSecondary }]}>
                {selectedAssignment?.class} - {selectedAssignment?.subject}
              </Text>
            </View>

            {submissions.map((submission) => (
              <View
                key={submission.id}
                style={[styles.submissionCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.submissionHeader}>
                  <View style={styles.submissionInfo}>
                    <Text style={[styles.submissionName, { color: themeColors.text }]}>
                      {submission.studentName}
                    </Text>
                    <Text style={[styles.submissionRoll, { color: themeColors.textSecondary }]}>
                      {submission.rollNumber}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.submissionStatusBadge,
                      {
                        backgroundColor:
                          getSubmissionStatusColor(submission.status) + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.submissionStatusText,
                        { color: getSubmissionStatusColor(submission.status) },
                      ]}
                    >
                      {submission.status}
                    </Text>
                  </View>
                </View>

                {submission.submittedDate && (
                  <View style={styles.submissionDetails}>
                    <IconSymbol name="calendar" size={14} color={themeColors.textSecondary} />
                    <Text style={[styles.submissionDate, { color: themeColors.textSecondary }]}>
                      Submitted: {new Date(submission.submittedDate).toLocaleDateString()}
                    </Text>
                  </View>
                )}

                {submission.grade && (
                  <View style={[styles.gradeBadge, { backgroundColor: colors.secondary + '20' }]}>
                    <Text style={[styles.gradeText, { color: colors.secondary }]}>
                      Grade: {submission.grade}
                    </Text>
                  </View>
                )}
              </View>
            ))}
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
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
  assignmentsList: {
    flex: 1,
  },
  assignmentsContent: {
    padding: 16,
    paddingBottom: 100,
  },
  assignmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  assignmentSubject: {
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
  assignmentDetails: {
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
    marginBottom: 12,
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
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
  },
  viewButtonText: {
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
  textArea: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 120,
    textAlignVertical: 'top',
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
  assignmentInfoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  assignmentInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  assignmentInfoSubtitle: {
    fontSize: 14,
  },
  submissionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  submissionInfo: {
    flex: 1,
  },
  submissionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  submissionRoll: {
    fontSize: 14,
  },
  submissionStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  submissionStatusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  submissionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  submissionDate: {
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
});
