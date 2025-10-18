
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

interface School {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  departments: number;
  classes: number;
  students: number;
}

export default function SchoolManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [schools, setSchools] = useState<School[]>([
    {
      id: '1',
      name: 'Dunco Primary School',
      address: '123 Education Street, Nairobi',
      phone: '+254700000001',
      email: 'primary@dunco.co.ke',
      departments: 5,
      classes: 12,
      students: 450,
    },
    {
      id: '2',
      name: 'Dunco Secondary School',
      address: '456 Learning Avenue, Nairobi',
      phone: '+254700000002',
      email: 'secondary@dunco.co.ke',
      departments: 8,
      classes: 16,
      students: 680,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleAddSchool = () => {
    setEditingSchool(null);
    setFormData({ name: '', address: '', phone: '', email: '' });
    setModalVisible(true);
  };

  const handleEditSchool = (school: School) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      address: school.address,
      phone: school.phone,
      email: school.email,
    });
    setModalVisible(true);
  };

  const handleSaveSchool = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (editingSchool) {
      setSchools(schools.map(s => 
        s.id === editingSchool.id 
          ? { ...s, ...formData }
          : s
      ));
      Alert.alert('Success', 'School updated successfully');
    } else {
      const newSchool: School = {
        id: Date.now().toString(),
        ...formData,
        departments: 0,
        classes: 0,
        students: 0,
      };
      setSchools([...schools, newSchool]);
      Alert.alert('Success', 'School added successfully');
    }

    setModalVisible(false);
  };

  const handleDeleteSchool = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this school?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setSchools(schools.filter(s => s.id !== id));
            Alert.alert('Success', 'School deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'School Management',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Schools ({schools.length})
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={handleAddSchool}
            >
              <IconSymbol name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add School</Text>
            </TouchableOpacity>
          </View>

          {schools.map((school) => (
            <View key={school.id} style={[styles.schoolCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.schoolHeader}>
                <View style={[styles.schoolIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name="building.2.fill" size={24} color={colors.primary} />
                </View>
                <View style={styles.schoolInfo}>
                  <Text style={[styles.schoolName, { color: themeColors.text }]}>
                    {school.name}
                  </Text>
                  <Text style={[styles.schoolDetail, { color: themeColors.textSecondary }]}>
                    {school.address}
                  </Text>
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: themeColors.text }]}>
                    {school.departments}
                  </Text>
                  <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                    Departments
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: themeColors.text }]}>
                    {school.classes}
                  </Text>
                  <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                    Classes
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: themeColors.text }]}>
                    {school.students}
                  </Text>
                  <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>
                    Students
                  </Text>
                </View>
              </View>

              <View style={styles.contactInfo}>
                <View style={styles.contactItem}>
                  <IconSymbol name="phone.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.contactText, { color: themeColors.textSecondary }]}>
                    {school.phone}
                  </Text>
                </View>
                <View style={styles.contactItem}>
                  <IconSymbol name="envelope.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.contactText, { color: themeColors.textSecondary }]}>
                    {school.email}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.secondary + '20' }]}
                  onPress={() => handleEditSchool(school)}
                >
                  <IconSymbol name="pencil" size={18} color={colors.secondary} />
                  <Text style={[styles.actionText, { color: colors.secondary }]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.error + '20' }]}
                  onPress={() => handleDeleteSchool(school.id)}
                >
                  <IconSymbol name="trash" size={18} color={colors.error} />
                  <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                {editingSchool ? 'Edit School' : 'Add New School'}
              </Text>

              <TextInput
                style={[styles.input, { 
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                }]}
                placeholder="School Name"
                placeholderTextColor={themeColors.textSecondary}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                }]}
                placeholder="Address"
                placeholderTextColor={themeColors.textSecondary}
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                }]}
                placeholder="Phone"
                placeholderTextColor={themeColors.textSecondary}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[styles.input, { 
                  backgroundColor: themeColors.background,
                  color: themeColors.text,
                  borderColor: themeColors.border,
                }]}
                placeholder="Email"
                placeholderTextColor={themeColors.textSecondary}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: themeColors.background }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: themeColors.text }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleSaveSchool}
                >
                  <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  schoolCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  schoolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  schoolDetail: {
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  contactInfo: {
    gap: 8,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
