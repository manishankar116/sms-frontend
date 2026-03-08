import { View, Text } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-gifted-charts'


const index = () => {
  const pieData = [
        {value: 54, color: '#73d18f'},
        {value: 40, color: '#bde9c4'},
    ];
  return (
    <View>
      <Text>This is Hi....index</Text>
            <PieChart
              donut
              showText
              textColor="white"
              radius={70}
              textSize={12}
              textBackgroundRadius={10}
              innerRadius={45}
              data={pieData}
            />
    </View>
  )
}

export default index