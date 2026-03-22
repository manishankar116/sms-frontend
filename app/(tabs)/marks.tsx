import { DataContext } from '@/hooks/DataContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type SubjectMark = {
  subjectName: string;
  id: string;
  subject: string;
  grade: string;
  score: number;
  total: number;
  teacherName: string;  
  marks: number;
  maxMarks: number;
  examDate: String;
  status: 'PASS' | 'FAIL';
};



export default function MarksScreen() {
  const {data} = useContext(DataContext);
  console.log('Marks Data:', data.marks);
  return (
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View style={[styles.metricCard, styles.gradeCard]}>
              <Text style={styles.metricLabel}>Average Grade</Text>
              <Text style={styles.metricValue}>{data?.grade}</Text>
            </View>

            <View style={[styles.metricCard, styles.percentageCard]}>
              <Text style={styles.metricLabel}>Percentage</Text>
              <Text style={styles.metricValue}>{data?.percentage} %</Text>
            </View>
          </View>
        </View>

        <Text style={styles.subjectHeading}>Subject Marks</Text>

        <View style={styles.subjectCard}>
            {data?.marks?.map((item: SubjectMark, index: number) => (
            <View key={item.id}>
              <View style={styles.subjectRow}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{item.subjectName}</Text>
                  <Text style={styles.subjectDetail}>
                  Grade: {item.grade} {"\n"}
                  Score: {item.marks} / {item.maxMarks}
                  </Text>
                </View>
                
                <View>
                  <Text style={[styles.statusText, { color: item.status === 'PASS' ? '#0adf54' : '#da1313', backgroundColor: item.status === 'PASS' ? '#c0fed5' : '#ffc2c2' }]} >
                    {item.status}
                  </Text>
                  <Text style={styles.teacherName}>{item.teacherName} {"\n"} held on: {item.examDate}</Text>
                </View>
              </View>

              <View style={styles.subjectDivider} />

            </View>
            ))}
        </View>
      </ScrollView>
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
    statusText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 8,
    width: 40,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: 'center',
    paddingBottom: 2,
  },
  teacherName:{
    fontSize: 14,
    color: '#404040',
    fontWeight: '400',

  },
  subjectDetail: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  subjectDivider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 10,
  },
});