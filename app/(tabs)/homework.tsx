import React, { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { DataContext } from '@/hooks/DataContext';

type HomeworkItem = {
  id: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  studentName: string;
  subject: string;
};

function HomeworkCard({ item }: { item: HomeworkItem }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        await fetchChildOverview();
        router.replace('/(tabs)/attendance');
      }
    };

    checkToken();
  }, [fetchChildOverview]);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { response, payload } = await requestLogin(username, password);
      const token = payload?.token;

      if (!response.ok || !token) {
        setError(payload?.message || 'Login failed. Please check credentials.');

        return;
      }

      await saveToken(token);
      await fetchChildOverview();
      router.replace('/(tabs)/attendance');
    } catch {
      setError('Unable to reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const formatDate = (value: string | undefined) => {
  if (!value) return '-';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const extractHomeworkArray = (data: any) => {
  const candidate = data?.homework ?? data?.homeworks ?? data?.homeworkList ?? data?.homeworkData;

  if (Array.isArray(candidate)) return candidate;
  if (Array.isArray(candidate?.items)) return candidate.items;
  if (Array.isArray(candidate?.content)) return candidate.content;
  return [];
};

export default function HomeworkScreen() {
  const contextValue = useContext(DataContext);
  const data = contextValue?.data;
  const isLoading = contextValue?.isLoading;

  const homeworkList = useMemo(() => {
    const apiList = extractHomeworkArray(data);

    return apiList.map((item: any, index: number) => ({
      id: String(item?.id ?? item?.homeworkId ?? index),
      title: item?.title ?? item?.name ?? 'Homework',
      description: item?.description ?? item?.details ?? '-',
      assignedDate: formatDate(item?.assignedDate ?? item?.createdAt),
      dueDate: formatDate(item?.dueDate),
      studentName: item?.studentName ?? data?.student?.name ?? 'Student',
      subject: item?.subject ?? item?.subjectName ?? '-',
    }));
  }, [data]);

  return (
    <ScrollView>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.content}>
          {isLoading ? <Text style={styles.stateText}>Loading homework...</Text> : null}
          {!isLoading && homeworkList.length === 0 ? (
            <Text style={styles.stateText}>No homework data available.</Text>
          ) : null}
          {homeworkList.map((item: HomeworkItem) => (
            <HomeworkCard key={item.id} item={item} />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE1E7',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 0,
    rowGap: 14,
  },
  stateText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#374151',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',

    marginTop: 6,
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: '#0f172a',
  },
  error: {
    color: '#b91c1c',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  subjectText: {
    fontSize: 14,
    color: '#111',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
