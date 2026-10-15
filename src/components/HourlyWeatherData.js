import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SampleData} from '../model/SampleData';

const WeatherIcon = weatherType => {
  if (weatherType == 'Sunny') {
    return <Ionicons name="md-sunny-sharp" size={20} color="#FDB813" />;
  }
  if (weatherType == 'Sunny') {
    return <FontAwesome5 name="cloud" size={20} color="#fff" />;
  }
  if (weatherType == 'Rainy') {
    return <FontAwesome5 name="cloud-rain" size={20} color="#fff" />;
  }
  if (weatherType == 'Cloudy') {
    return <FontAwesome5 name="cloud" size={20} color="gray" />;
  }
  if (weatherType == 'cloud') {
    return <FontAwesome5 name="cloud-showers-heavy" size={20} color="#fff" />;
  }
  if (weatherType == 'Haze') {
    return <FontAwesome5 name="cloud-sun" size={20} color="#fff" />;
  }
  if (weatherType == 'Haze') {
    return <Ionicons name="white-balance-sunny" size={20} color="#fff" />;
  }
};

const HourlyWeatherData = () => {
  const list = () => {
    return SampleData.map(item => {
      return (
        <View key={item.id}>
          <View
            style={{
              height: 60,
              backgroundColor: '#00000033',
              marginBottom: 10,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              paddingEnd:20,
              borderColor:'#fff',
              borderWidth:1,
              borderRadius: 50,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height:60,
                width:100,
                justifyContent: 'center',
                backgroundColor:'#3c3c44',
                borderRadius:40,
              }}>
              <Ionicons name="time-outline" size={20} color={'red'} />
              <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>
                {item.time}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <MaterialCommunityIcons name="coolant-temperature" size={20} color={'red'} />
              <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>
                {item.temparatureMix}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="drop" size={20} color={'#83d7ee'} />
              <Text style={{marginLeft: 5, color: 'white', fontSize: 20}}>
                {item.humidity}%
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {WeatherIcon(item.weatherType)}
              <Text style={{color: 'white', fontSize: 20, marginLeft: 5}}>
                {item.weatherType}
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };
  return <View>{list()}</View>;
};

export default HourlyWeatherData;

const styles = StyleSheet.create({});
