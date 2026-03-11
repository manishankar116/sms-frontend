import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useContext } from 'react';

import { PieChart } from 'react-native-gifted-charts';
import { DataContext } from '@/hooks/DataContext';

const Attendance = () => {
  const recentAttendance = ({ item }: any) => {
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: '2-digit',
    });

    return (
      <View style={styles.recentAttendanceBox}>
        <Text>{formattedDate}</Text>
        <Text style={{ color: item?.status === 'PRESENT' ? 'green' : 'red' }}>{item?.status}</Text>
      </View>
    );
  };

  const { data } = useContext(DataContext);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const stats = {
    last3Months: { present: 0, absent: 0 },
  };

  data?.attendance?.forEach((item: any) => {
    const date = new Date(item.date);
    const month = date.getMonth();
    const year = date.getFullYear();

    const diffMonths = (currentYear - year) * 12 + (currentMonth - month);
    const isPresent = item.status === 'PRESENT';

    if (diffMonths >= 0 && diffMonths < 3) {
      if (isPresent) stats.last3Months.present++;
      else stats.last3Months.absent++;
    }
  });

  const pieData = [
    { value: stats.last3Months.present, color: '#35b85c' },
    { value: stats.last3Months.absent, color: '#f69999' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grayBox}>
        <Text style={styles.text}>Overall Attendance</Text>
        <Text style={styles.horizontalLine}></Text>

        <View style={styles.chartRow}>
          <PieChart donut showText textColor="white" radius={70} textSize={12} innerRadius={45} data={pieData} />

          <View style={{ gap: 10 }}>
            <View style={styles.present}>
              <Text style={styles.cardText}>Present</Text>
              <Text style={styles.cardText}>{stats.last3Months.present} Days</Text>
            </View>

            <View style={styles.absent}>
              <Text style={styles.cardText}>Absent</Text>
              <Text style={styles.cardText}>{stats.last3Months.absent} Days</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Attendance</Text>
      <FlatList
        data={data?.attendance ?? []}
        renderItem={recentAttendance}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fbff' },
  grayBox: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: 'black',
  },
  text: { fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10 },
  horizontalLine: { height: 0.5, backgroundColor: '#bebbbb', margin: 10 },
  chartRow: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  present: {
    width: 140,
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  absent: {
    width: 140,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  cardText: { color: 'white', fontSize: 16 },
  sectionTitle: { marginLeft: 30, marginBottom: 10, marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  recentAttendanceBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 0.1,
  },
});

export default Attendance;
