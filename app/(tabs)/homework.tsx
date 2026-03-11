import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { DataContext } from '@/hooks/DataContext';

type HomeworkItem = {
  id: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacherId: string;
  subjectName: string;
};



const HOMEWORK_LIST: HomeworkItem[] = [
  {
    id: '1',
    title: 'Solve Algebra Worksheet',
    description: 'Complete attached worksheet on algebraic equations and submit it',
    assignedDate: 'Mar 05, 2026',
    dueDate: 'Mar 07, 2026',
    teacherId: 'Mani Shankar',
    subjectName: 'Mathematics',
  },
  {
    id: '2',
    title: 'Solve Algebra Worksheet',
    description: 'Complete attached worksheet on algebraic equations and submit it',
    assignedDate: 'Mar 05, 2026',
    dueDate: 'Mar 07, 2026',
    teacherId: 'Mani Shankar',
    subjectName: 'Mathematics',
  },
  {
    id: '3',
    title: 'Solve Algebra Worksheet',
    description: 'Complete attached worksheet on algebraic equations and submit it',
    assignedDate: 'Mar 05, 2026',
    dueDate: 'Mar 07, 2026',
    teacherId: 'Mani Shankar',
    subjectName: 'Mathematics',
  },
  {
    id: '4',
    title: 'Solve Algebra Worksheet',
    description: 'Complete attached worksheet on algebraic equations and submit it',
    assignedDate: 'Mar 05, 2026',
    dueDate: 'Mar 07, 2026',
    teacherId: 'Mani Shankar',
    subjectName: 'Mathematics',
  },
];

function HomeworkCard({ item }: { item: HomeworkItem }) {
  const data = useContext(DataContext);
  console.log('Homework List from Context:', data?.homework); 

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

      <View style={styles.divider} />

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={14} color="#111" />
        <Text style={styles.metaText}>Assigned : {item.assignedDate}</Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name="calendar-outline" size={14} color="#111" />
        <Text style={styles.metaText}>Due : {item.dueDate}</Text>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.metaRow}>
          <Ionicons name="person" size={14} color="#111" />
          <Text style={styles.metaText}>{item.teacherId}</Text>
        </View>
        <Text style={styles.subjectText}>{item.subjectName}</Text>
      </View>
    </View>
  );
}

export default function HomeworkScreen() {
  const data = useContext(DataContext);
  return (
    <ScrollView>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.content}>
          {data?.homework?.map((item: HomeworkItem) => (
            <HomeworkCard key={item.id} item={item} />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DCE1E7',
  },
  header: {
    backgroundColor: '#5371CF',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 0,
    rowGap: 14,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#222',
    marginBottom: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#242424',
  },
  footerRow: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 14,
    color: '#111',
    marginBottom: 10,
    fontWeight:'bold'
  },
});
