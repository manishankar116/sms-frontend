import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type MarkRecord = {
  id: string;
  subject: string;
  obtained: number;
  total: number;
  grade: string;
};

const MARKS: MarkRecord[] = [
  { id: '1', subject: 'Mathematics', obtained: 92, total: 100, grade: 'A+' },
  { id: '2', subject: 'Physics', obtained: 88, total: 100, grade: 'A' },
  { id: '3', subject: 'Chemistry', obtained: 84, total: 100, grade: 'A' },
  { id: '4', subject: 'English', obtained: 90, total: 100, grade: 'A+' },
];

export default function MarksScreen() {
  const totalObtained = MARKS.reduce((sum, item) => sum + item.obtained, 0);
  const totalMarks = MARKS.reduce((sum, item) => sum + item.total, 0);
  const percentage = Math.round((totalObtained / totalMarks) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Marks</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Overall Score</Text>
          <Text style={styles.summaryValue}>{percentage}%</Text>
          <Text style={styles.summaryMeta}>
            {totalObtained}/{totalMarks} marks secured
          </Text>
        </View>

        {MARKS.map((item) => (
          <View key={item.id} style={styles.markCard}>
            <View>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.score}>
                {item.obtained}/{item.total}
              </Text>
            </View>
            <View style={styles.gradeBadge}>
              <Text style={styles.gradeText}>{item.grade}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f6fc',
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#4f46e5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  summaryLabel: {
    color: '#c7d2fe',
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
  },
  summaryMeta: {
    color: '#e0e7ff',
    fontSize: 14,
    marginTop: 8,
  },
  markCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#7f8aa3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  score: {
    fontSize: 15,
    color: '#4b5563',
  },
  gradeBadge: {
    minWidth: 54,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
  },
  gradeText: {
    color: '#4338ca',
    fontSize: 15,
    fontWeight: '700',
  },
});
