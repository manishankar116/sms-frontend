import { DataContext } from '@/hooks/DataContext';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type UpcomingExam = {
  id: string;
  subject: string;
  date: string;
  time: string;
};

type PastExam = {
  id: string;
  subject: string;
  date: string;
  score: string;
  result: string;
  status: 'Pass' | 'Fail';
};

const UPCOMING_EXAMS: UpcomingExam[] = [
  {
    id: '1',
    subject: 'Mathematics',
    date: 'Thursday, May 2, 2026',
    time: '10:00 AM',
  },
  {
    id: '2',
    subject: 'Mathematics',
    date: 'Thursday, May 2, 2026',
    time: '10:00 AM',
  },
  {
    id: '3',
    subject: 'Mathematics',
    date: 'Thursday, May 2, 2026',
    time: '10:00 AM',
  },
];

const PAST_EXAMS: PastExam[] = [
  {
    id: '1',
    subject: 'Chemistry',
    date: 'Friday, Jan 12, 2026',
    score: '90/100',
    result: 'A',
    status: 'Pass',
  },
  {
    id: '2',
    subject: 'Chemistry',
    date: 'Friday, Jan 12, 2026',
    score: '90/100',
    result: 'A',
    status: 'Pass',
  },
  {
    id: '3',
    subject: 'Chemistry',
    date: 'Friday, Jan 12, 2026',
    score: '90/100',
    result: 'A',
    status: 'Pass',
  },
];

export default function ExamsScreen() {
    const {data} = useContext(DataContext);
    console.log(data?.exams);
    
  return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>Upcoming Exams</Text>
          <View style={styles.sectionDivider} />

          {UPCOMING_EXAMS.map((exam) => (
            <View key={exam.id} style={styles.upcomingCard}>
              <Text style={styles.subjectText}>{exam.subject}</Text>
              <Text style={styles.detailText}>{exam.date}</Text>
              <Text style={styles.detailText}>{exam.time}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.pastHeading}>Past Exams</Text>

        <View style={styles.pastContainer}>
          {PAST_EXAMS.map((exam, index) => (
            <View key={exam.id} style={styles.pastRow}>
              <View>
                <Text style={styles.subjectText}>{exam.subject}</Text>
                <Text style={styles.pastDetailText}>{exam.date}</Text>
                <Text style={styles.pastDetailText}>Score : {exam.score}</Text>
              </View>

              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Result: {exam.result}</Text>
                <Text style={styles.statusText}>{exam.status}</Text>
              </View>

              {index < PAST_EXAMS.length - 1 && <View style={styles.pastDivider} />}
            </View>
          ))}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d4d8dc',
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 28,
  },
  upcomingContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    padding: 16,
    gap: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
    marginTop: -4,
  },
  upcomingCard: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 20,
  },
  pastHeading: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111',
    marginTop: 24,
    marginBottom: 14,
  },
  pastContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  pastRow: {
    position: 'relative',
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pastDetailText: {
    fontSize: 12,
    color: '#242424',
    lineHeight: 20,
  },
  resultContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 12,
    color: '#111',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#12A946',
    fontWeight: '500',
    backgroundColor: '#d4fee0',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pastDivider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -7,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D4D4',
  },
});
