
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';

export default function SettingsManagement() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;

  const [settings, setSettings] = useState({
    schoolName: 'Dunco School Management System',
    apiUrl: 'https://multischool.duncowebsolutions.co.ke/api',
    currentTerm: 'Term 1, 2024',
    enableNotifications: true,
    enableSMS: true,
    enableEmail: true,
    autoBackup: true,
    maintenanceMode: false,
  });

  const handleSaveSettings = () => {
    Alert.alert('Success', 'Settings saved successfully!');
    console.log('Settings saved:', settings);
  };

  const handleBackupDatabase = () => {
    Alert.alert(
      'Backup Database',
      'Are you sure you want to backup the database?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Backup',
          onPress: () => {
            console.log('Backing up database...');
            Alert.alert('Success', 'Database backup initiated. You will receive a notification when complete.');
          },
        },
      ]
    );
  };

  const handleRestoreDatabase = () => {
    Alert.alert(
      'Restore Database',
      'WARNING: This will restore the database from the last backup. All current data will be replaced. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          style: 'destructive',
          onPress: () => {
            console.log('Restoring database...');
            Alert.alert('Success', 'Database restore initiated.');
          },
        },
      ]
    );
  };

  const settingSections = [
    {
      title: 'General Settings',
      icon: 'gearshape.fill',
      color: colors.primary,
      items: [
        {
          label: 'School Name',
          type: 'text',
          value: settings.schoolName,
          key: 'schoolName',
        },
        {
          label: 'Current Term',
          type: 'text',
          value: settings.currentTerm,
          key: 'currentTerm',
        },
      ],
    },
    {
      title: 'API Configuration',
      icon: 'link',
      color: colors.secondary,
      items: [
        {
          label: 'API Base URL',
          type: 'text',
          value: settings.apiUrl,
          key: 'apiUrl',
        },
      ],
    },
    {
      title: 'Communication',
      icon: 'megaphone.fill',
      color: colors.accent,
      items: [
        {
          label: 'Push Notifications',
          type: 'switch',
          value: settings.enableNotifications,
          key: 'enableNotifications',
        },
        {
          label: 'SMS Notifications',
          type: 'switch',
          value: settings.enableSMS,
          key: 'enableSMS',
        },
        {
          label: 'Email Notifications',
          type: 'switch',
          value: settings.enableEmail,
          key: 'enableEmail',
        },
      ],
    },
    {
      title: 'System',
      icon: 'server.rack',
      color: colors.warning,
      items: [
        {
          label: 'Auto Backup',
          type: 'switch',
          value: settings.autoBackup,
          key: 'autoBackup',
        },
        {
          label: 'Maintenance Mode',
          type: 'switch',
          value: settings.maintenanceMode,
          key: 'maintenanceMode',
        },
      ],
    },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Settings & Configuration',
          headerShown: true,
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
                  <IconSymbol name={section.icon as any} size={24} color={section.color} />
                </View>
                <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                  {section.title}
                </Text>
              </View>

              <View style={[styles.sectionContent, { backgroundColor: themeColors.card }]}>
                {section.items.map((item, itemIndex) => (
                  <View
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 && styles.settingItemBorder,
                    ]}
                  >
                    <Text style={[styles.settingLabel, { color: themeColors.text }]}>
                      {item.label}
                    </Text>
                    {item.type === 'text' ? (
                      <TextInput
                        style={[styles.settingInput, { 
                          backgroundColor: themeColors.background,
                          color: themeColors.text,
                          borderColor: themeColors.border,
                        }]}
                        value={item.value as string}
                        onChangeText={(text) => handleSettingChange(item.key, text)}
                      />
                    ) : (
                      <Switch
                        value={item.value as boolean}
                        onValueChange={(value) => handleSettingChange(item.key, value)}
                        trackColor={{ false: '#767577', true: section.color }}
                        thumbColor={item.value ? '#FFFFFF' : '#f4f3f4'}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIcon, { backgroundColor: colors.error + '20' }]}>
                <IconSymbol name="externaldrive.fill" size={24} color={colors.error} />
              </View>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Database Management
              </Text>
            </View>

            <View style={[styles.sectionContent, { backgroundColor: themeColors.card }]}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={handleBackupDatabase}
              >
                <IconSymbol name="arrow.down.doc.fill" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Backup Database</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.warning }]}
                onPress={handleRestoreDatabase}
              >
                <IconSymbol name="arrow.up.doc.fill" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Restore Database</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.success }]}
            onPress={handleSaveSettings}
          >
            <IconSymbol name="checkmark.circle.fill" size={24} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save All Settings</Text>
          </TouchableOpacity>

          <View style={[styles.infoCard, { backgroundColor: themeColors.card }]}>
            <IconSymbol name="info.circle.fill" size={24} color={colors.primary} />
            <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
              Changes to system settings may require app restart. Database operations are logged and can be audited in the activity logs.
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
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionContent: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    paddingVertical: 12,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  settingInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
