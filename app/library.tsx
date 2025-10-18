
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, darkColors } from '@/styles/commonStyles';
import { mockBooks } from '@/utils/mockData';

export default function LibraryScreen() {
  const theme = useTheme();
  const isDark = theme.dark;
  const themeColors = isDark ? darkColors : colors;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Library',
          headerShown: true,
          headerBackTitle: 'Back',
        }}
      />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: themeColors.card }]}>
            <IconSymbol name="magnifyingglass" size={20} color={themeColors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: themeColors.text }]}
              placeholder="Search books..."
              placeholderTextColor={themeColors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredBooks.map((book) => (
            <View
              key={book.id}
              style={[styles.bookCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.bookHeader}>
                <View
                  style={[
                    styles.bookIcon,
                    { backgroundColor: book.available ? colors.success + '20' : colors.error + '20' },
                  ]}
                >
                  <IconSymbol
                    name="book.fill"
                    size={32}
                    color={book.available ? colors.success : colors.error}
                  />
                </View>
                <View style={styles.bookInfo}>
                  <Text style={[styles.bookTitle, { color: themeColors.text }]}>
                    {book.title}
                  </Text>
                  <Text style={[styles.bookAuthor, { color: themeColors.textSecondary }]}>
                    by {book.author}
                  </Text>
                  <Text style={[styles.bookCategory, { color: themeColors.textSecondary }]}>
                    {book.category}
                  </Text>
                </View>
              </View>

              <View style={styles.bookDetails}>
                <View style={styles.detailRow}>
                  <IconSymbol
                    name="barcode"
                    size={16}
                    color={themeColors.textSecondary}
                  />
                  <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>
                    ISBN: {book.isbn}
                  </Text>
                </View>
                {book.dueDate && (
                  <View style={styles.detailRow}>
                    <IconSymbol
                      name="calendar"
                      size={16}
                      color={colors.warning}
                    />
                    <Text style={[styles.detailText, { color: colors.warning }]}>
                      Due: {new Date(book.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: book.available ? colors.success : colors.error },
                ]}
              >
                <Text style={styles.statusText}>
                  {book.available ? 'AVAILABLE' : 'BORROWED'}
                </Text>
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
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  bookCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 2,
  },
  bookCategory: {
    fontSize: 12,
  },
  bookDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
});
