import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaFrameContext, SafeAreaProvider } from 'react-native-safe-area-context';

type Announcement = {
  id: string;
  title: string;
  day: string;
  time: string;
  description: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Special Lecture on Modern Physics',
    day: 'Tomorrow',
    time: '10:00 AM',
    description:
      'A special lecture -non modern physics by Dr.smith has been scheduled for tomorrow at 10AM in the physics lab. All intrested students are welcome to attend.',
  },
  {
    id: '2',
    title: 'Special Lecture on Modern Physics',
    day: 'Tomorrow',
    time: '10:00 AM',
    description:
      'A special lecture -non modern physics by Dr.smith has been scheduled for tomorrow at 10AM in the physics lab. All intrested students are welcome to attend.',
  },
  {
    id: '3',
    title: 'Special Lecture on Modern Physics',
    day: 'Tomorrow',
    time: '10:00 AM',
    description:
      'A special lecture -non modern physics by Dr.smith has been scheduled for tomorrow at 10AM in the physics lab. All intrested students are welcome to attend.',
  },
  {
    id: '4',
    title: 'Special Lecture on Modern Physics',
    day: 'Tomorrow',
    time: '10:00 AM',
    description:
      'A special lecture -non modern physics by Dr.smith has been scheduled for tomorrow at 10AM in the physics lab. All intrested students are welcome to attend.',
  },
];

function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.metaPrimary}>{item.day}</Text>
        <Text style={styles.metaSecondary}>{item.time}</Text>
      </View>

      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

export default function AnnouncementScreen() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <FlatList
        data={ANNOUNCEMENTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.heading}>Announcements</Text>}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f6fc',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
  },
  heading: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3b3f46',
    marginBottom: 12,
    marginLeft: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 16,
    marginBottom: 12,
    shadowColor: '#7f8aa3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: '#111317',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  metaPrimary: {
    fontSize: 16,
    color: '#15181d',
    fontWeight: '500',
    marginRight: 18,
  },
  metaSecondary: {
    fontSize: 16,
    color: '#767b84',
    fontWeight: '400',
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: '#43474f',
  },
});
