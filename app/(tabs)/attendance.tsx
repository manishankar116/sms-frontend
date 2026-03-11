import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useContext } from 'react'

import { PieChart } from 'react-native-gifted-charts';
import { DataContext } from '@/hooks/DataContext';

const Attendance = () => {

  const recentAttendance = ({item}:any) => {
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
    });

    return (
      <View style={styles.recentAttendanceBox}>
        <Text>{formattedDate}</Text>
        <Text style={{color: item?.status === 'PRESENT' ? 'green' : 'red'}}>{item?.status}</Text> 
      </View>
      
    )
  }

const { data } = useContext(DataContext);

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

const stats = {
  currentMonth: { present: 0, absent: 0 },
  lastMonth: { present: 0, absent: 0 },
  last3Months: { present: 0, absent: 0 },
  currentYear: { present: 0, absent: 0 }
};

data?.attendance?.forEach((item: any) => {
  const date = new Date(item.date);
  const month = date.getMonth();
  const year = date.getFullYear();

  const diffMonths = (currentYear - year) * 12 + (currentMonth - month);

  const isPresent = item.status === "PRESENT";

  // Current Year
    if (year === currentYear) {
      if (isPresent) stats.currentYear.present++;
      else stats.currentYear.absent++;
    }

    // Current Month
    if (month === currentMonth && year === currentYear) {
      if (isPresent) stats.currentMonth.present++;
      else stats.currentMonth.absent++;
    }

    // Last Month
    if (diffMonths === 1) {
      if (isPresent) stats.lastMonth.present++;
      else stats.lastMonth.absent++;
    }

    // Last 3 Months
    if (diffMonths >= 0 && diffMonths < 3) {
      if (isPresent) stats.last3Months.present++;
      else stats.last3Months.absent++;
    }
  });

  console.log("Hi");
  

  const pieData = [
    {value: stats.last3Months.present, color: '#35b85c'},
    {value: stats.last3Months.absent, color: '#f69999'},
  ];
  return (
<View style={styles.container}>
  <View style={styles.grayBox}>
    <Text style={styles.text}>Overall Attandance</Text>
    <Text style={styles.horizontalLine}></Text>

    <View style={{alignItems : 'center', marginBottom : 20, display: "flex", flexDirection : 'row', justifyContent : 'space-evenly' }}>
      <PieChart
        donut
        showText
        textColor="white"
        radius={70}
        textSize={12}
        textBackgroundRadius={10}
        innerRadius={45}
        data={pieData && pieData}                    
      />

      <View style={{display : 'flex', gap : 10 }}>

        <View style={styles.present}>
          <Text style={{color : 'white', fontSize : 16}}>Present</Text>
          <Text style={{color : 'white', fontSize : 16}}>25 Days</Text>
        </View>

        <View style={styles.absent}>
          <Text style={{color : 'white', fontSize : 16}}>Absent</Text>
          <Text style={{color : 'white', fontSize : 16}}>25 Days</Text>
        </View>

      </View>
    </View>
  </View>

  <View style={styles.attendanceTimeline}>
    <Text style={{backgroundColor: 'orange', padding: 5, borderRadius: 30, paddingHorizontal: 10}}>This Month</Text>
    <Text style={{ padding: 5, borderRadius: 30, paddingHorizontal: 10, borderColor: 'grey', borderWidth: .20}}>Last Month</Text>
    <Text>Last 2 Months</Text>
    <Text>Last 6 Months</Text>
    <Text>This Year</Text>
  </View>

  
  
    <Text style={{marginLeft: 30, marginBottom: 10, marginTop:20, fontSize: 18, fontWeight: 'bold'}}>Recent Attendance</Text>
    <FlatList 
      data = {data?.attendance}
      renderItem={recentAttendance}
      keyExtractor={item => String(item.id)}
    />
  

</View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
  },

  grayBox: {
    height: 'auto',
    backgroundColor: '#ffffff',
    margin: 16, 
    borderRadius : 10,
    borderWidth : 0.25,
    borderColor : 'black'
  },

  text: {
    fontWeight : 'bold',
    fontSize : 20,
    marginLeft : 10,
    marginTop : 10
  },

  horizontalLine: {
    height : .5,
    backgroundColor : '#bebbbb',
    margin:10

  },

  present:{
    width: 140,
    backgroundColor : 'green',
    height: 'auto',
    borderRadius: 5,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 7
  },

  absent:{
    backgroundColor : 'red',
    height: 'auto',
    borderRadius: 5,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 7
  }, 
  
  recentAttendanceBox: {
    display : 'flex', 
    flexDirection:'row', 
    justifyContent : 'space-around',
    backgroundColor : 'white',
    marginHorizontal: 30,
    borderColor : 'black', 
    paddingVertical : 8,
    borderRadius: 6,
    borderWidth : 0.10,
  },

  attendanceTimeline: {
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    gap: 10,
    justifyContent:'center',
    alignItems:'center'
  }


});

export default Attendance