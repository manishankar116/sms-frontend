import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SubjectMark = {
  id: string;
  subject: string;
  grade: string;
  score: number;
  total: number;
};

const SUBJECT_MARKS: SubjectMark[] = [
  { id: '1', subject: 'Mathematics', grade: 'A', score: 92, total: 100 },
  { id: '2', subject: 'Physics', grade: 'A', score: 89, total: 100 },
  { id: '3', subject: 'Chemistry', grade: 'B+', score: 84, total: 100 },
  { id: '4', subject: 'English', grade: 'A', score: 91, total: 100 },
];

const averageScore =
  SUBJECT_MARKS.reduce((sum, subject) => sum + subject.score, 0) / SUBJECT_MARKS.length;

const percentage = Math.round(averageScore);
const averageGrade = 'A';

export default function MarksScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View style={[styles.metricCard, styles.gradeCard]}>
              <Text style={styles.metricLabel}>Average Grade</Text>
              <Text style={styles.metricValue}>{averageGrade}</Text>
            </View>

            <View style={[styles.metricCard, styles.percentageCard]}>
              <Text style={styles.metricLabel}>Percentage</Text>
              <Text style={styles.metricValue}>{percentage} %</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subjectHeading}>Subject Marks</Text>

        <View style={styles.subjectCard}>
          {SUBJECT_MARKS.map((item, index) => (
            <View key={item.id}>
              <View style={styles.subjectRow}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <Text style={styles.subjectDetail}>Grade: {item.grade}</Text>
                  <Text style={styles.subjectDetail}>
                    Score: {item.score} / {item.total}
                  </Text>
                </View>

                <MaterialIcons name="chevron-right" size={28} color="#111111" />
              </View>

              {index < SUBJECT_MARKS.length - 1 ? <View style={styles.subjectDivider} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E9EEF8',
  },
  content: {
    padding: 14,
    paddingBottom: 32,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 12,
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  gradeCard: {
    backgroundColor: '#4DE073',
  },
  percentageCard: {
    backgroundColor: '#7A74F6',
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  subjectHeading: {
    fontSize: 14,
    color: '#444444',
    fontWeight: '500',
    marginTop: 28,
    marginBottom: 10,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minHeight: 520,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  subjectInfo: {
    gap: 5,
  },
  subjectName: {
    fontSize: 15,
    color: '#171717',
    fontWeight: '500',
  },
  subjectDetail: {
    fontSize: 14,
    color: '#4B5563',
  },
  subjectDivider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 10,
  },
});
