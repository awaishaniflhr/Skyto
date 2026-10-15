import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment-timezone';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HourNext from './HourNext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icons from '../../utils/icons';
const HourScroll = ({weatherData}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      showsHorizontalScrollIndicator={false}>
      <CurrentTempEl
        data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
      />
      <HourNext data={weatherData} />
    </ScrollView>
  );
};
export const momentHourOnly = dt => {
  return moment.unix(dt).format('hA');
};
const CurrentTempEl = ({data}) => {
  if (data && data.weather) {
    const img = {
      uri:
        'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png',
    };
    return (
      <View style={{alignSelf:'center'}}>
    <View 
        style={{
          width:Dimensions.get('screen').width-20,
          height: 80,
          backgroundColor: 'rgba(0,0,0,0.2)',
          margin: 10,
          borderColor:'#fff',
          borderWidth:1,
          borderRadius: 20,
          padding: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{width:'20%',alignItems: 'center',justifyContent:'center',height:40,width:40,borderRadius:20,borderColor:'white',borderWidth:1}}>
          <Text style={{color: '#fff',fontSize:10}}>{momentHourOnly(data.dt)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <Icons weatherType={data.weather[0].main}/>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width:'20%'
          }}>
          <Fontisto name="blood-drop" size={15} color={'#024B86'} />
          <Text style={{color: 'white',marginLeft:5}}>{Math.round(data.humidity)}%</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <FontAwesome5 name='temperature-high' color={'red'} size={15}/>
        <Text  numberOfLines={1} style={{color: 'white',marginLeft:5}}>{Math.round(data.temp)}°</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <Text numberOfLines={1} style={styles.temp}>{data && data.weather[0].main}</Text>
        </View> */}
      
      </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  scrollView: {
  },
  image: {
    width: 50,
    height:50,
    alignSelf:'center'
  },
  currentTempContainer: {
    flexDirection: 'row',
    backgroundColor:' rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    padding: 10,
    height: 300,
  },
  day: {
    fontSize: 20,
    color: 'white',
    backgroundColor: '#3c3c44',
    padding: 10,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: '200',
  },
  temp: {
    fontSize: 14,
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
    marginLeft: 10,
    padding: 10,
    color:'white',
    textTransform:'capitalize'
  },
  otherContainer: {},
});

export default HourScroll;
