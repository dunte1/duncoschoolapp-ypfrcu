
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
import { UserRole } from '@/types/auth';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: 'active' | 'inactive';
  school: string;
}

export default function UserManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: '1',
      name: 'John Teacher',
      email: 'teacher@dunco.com',
      role: 'teacher',
      phone: '+254700000002',
      status: 'active',
      school: 'Dunco Primary School',
    },
    {
      id: '2',
      name: 'Jane Student',
      email: 'student@dunco.com',
      role: 'student',
      phone: '+254700000003',
      status: 'active',
      school: 'Dunco Primary School',
    },
    {
      id: '3',
      name: 'Mary Parent',
      email: 'parent@dunco.com',
      role: 'parent',
      phone: '+254700000004',
      status: 'active',
      school: 'Dunco Primary School',
    },
  ]);

  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student' as UserRole,
    phone: '',
    school: '',
  });

  const roles: UserRole[] = ['admin', 'teacher', 'student', 'parent', 'librarian', 'accountant'];

  const getRoleColor = (role: UserRole) => {
    const roleColors = {
      admin: colors.error,
      teacher: colors.primary,
      student: colors.secondary,
      parent: colors.accent,
      librarian: '#9C27B0',
      accountant: colors.warning,
    };
    return roleColors[role];
  };

  const getRoleIcon = (role: UserRole) => {
    const roleIcons = {
      admin: 'shield.checkered',
      teacher: 'person.fill',
      student: 'graduationcap.fill',
      parent: 'person.2.fill',
      librarian: 'book.fill',
      accountant: 'dollarsign.circle.fill',
    };
    return roleIcons[role];
  };

  const filteredUsers = filterRole === 'all' 
    ? users 
    : users.filter(u => u.role === filterRole);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'student', phone: '', school: '' });
    setModalVisible(true);
  };

  const handleEditUser = (user: UserAccount) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      school: user.school,
    });
    setModalVisible(true);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.school) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
      Alert.alert('Success', 'User updated successfully');
    } else {
      const newUser: UserAccount = {
        id: Date.now().toString(),
        ...formData,
        status: 'active',
      };
      setUsers([...users, newUser]);
      Alert.alert('Success', 'User added successfully');
    }

    setModalVisible(false);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const handleDeleteUser = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== id));
            Alert.alert('Success', 'User deleted successfully');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'User Management',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.header}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterRole === 'all' && { backgroundColor: colors.primary },
                filterRole !== 'all' && { backgroundColor: themeColors.card },
              ]}
              onPress={() => setFilterRole('all')}
            >
              <Text style={[
                styles.filterText,
                { color: filterRole === 'all' ? '#FFFFFF' : themeColors.text }
              ]}>
                All ({users.length})
              </Text>
            </TouchableOpacity>
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.filterButton,
                  filterRole === role && { backgroundColor: getRoleColor(role) },
                  filterRole !== role && { backgroundColor: themeColors.card },
                ]}
                onPress={() => setFilterRole(role)}
              >
                <Text style={[
                  styles.filterText,
                  { color: filterRole === role ? '#FFFFFF' : themeColors.text }
                ]}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}s
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddUser}
          >
            <IconSymbol name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={[styles.userCard, { backgroundColor: themeColors.card }]}>
              <View style={styles.userHeader}>
                <View style={[styles.userIcon, { backgroundColor: getRoleColor(user.role) + '20' }]}>
                  <IconSymbol name={getRoleIcon(user.role) as any} size={24} color={getRoleColor(user.role)} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: themeColors.text }]}>
                    {user.name}
                  </Text>
                  <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                    <Text style={styles.roleText}>{user.role.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: user.status === 'active' ? colors.success + '20' : colors.error + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: user.status === 'active' ? colors.success : colors.error }
                  ]}>
                    {user.status}
                  </Text>
                </View>
              </View>

              <View style={styles.userDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol name="envelope.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {user.email}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="phone.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {user.phone}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <IconSymbol name="building.2.fill" size={16} color={themeColors.textSecondary} />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    {user.school}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.secondary + '20' }]}
                  onPress={() => handleEditUser(user)}
                >
                  <IconSymbol name="pencil" size={18} color={colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { 
                    backgroundColor: user.status === 'active' ? colors.warning + '20' : colors.success + '20'
                  }]}
                  onPress={() => handleToggleStatus(user.id)}
                >
                  <IconSymbol 
                    name={user.status === 'active' ? 'pause.fill' : 'play.fill'} 
                    size={18} 
                    color={user.status === 'active' ? colors.warning : colors.success} 
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: colors.error + '20' }]}
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <IconSymbol name="trash" size={18} color={colors.error} />
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
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
                <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                  {editingUser ? 'Edit User' : 'Add New User'}
                </Text>

                <TextInput
                  style={[styles.input, { 
                    backgroundColor: themeColors.background,
                    color: themeColors.text,
                    borderColor: themeColors.border,
                  }]}
                  placeholder="Full Name"
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
                  placeholder="Email"
                  placeholderTextColor={themeColors.textSecondary}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  placeholder="School"
                  placeholderTextColor={themeColors.textSecondary}
                  value={formData.school}
                  onChangeText={(text) => setFormData({ ...formData, school: text })}
                />

                <Text style={[styles.label, { color: themeColors.text }]}>Select Role:</Text>
                <View style={styles.roleSelector}>
                  {roles.map((role) => (
                    <TouchableOpacity
                      key={role}
                      style={[
                        styles.roleOption,
                        formData.role === role && { backgroundColor: getRoleColor(role) },
                        formData.role !== role && { backgroundColor: themeColors.background },
                      ]}
                      onPress={() => setFormData({ ...formData, role })}
                    >
                      <Text style={[
                        styles.roleOptionText,
                        { color: formData.role === role ? '#FFFFFF' : themeColors.text }
                      ]}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

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
                    onPress={handleSaveUser}
                  >
                    <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  filterContainer: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  userCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
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
  userDetails: {
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
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  roleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  roleOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  roleOptionText: {
    fontSize: 13,
    fontWeight: '600',
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
