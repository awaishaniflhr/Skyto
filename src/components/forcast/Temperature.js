import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native';
import moment from 'moment-timezone';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DayTemperature from './DayTemperature';
import Icons from '../../utils/icons';

const TemperatureScroll = ({tempData}) => {
  const weatherData=tempData;
  return (
    <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
      <CurrentTempEl
        data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
      />
      <DayTemperature data={weatherData} />
    </ScrollView>
  );
};

const CurrentTempEl = ({data}) => {
  if (data && data.weather) {
    const img = {
      uri:
        'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png',
    };
    return (
      <View style={styles.currentTempContainer}>
   
        
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.day}>
              Today
          </Text>
          <Icons weatherType={data.weather[0].main}/>
          <View style={{flexDirection:'row',padding:10}}>
          <FontAwesome5 name='temperature-high' color={'yellow'} size={20}/>
          <Text style={styles.temp}>{Math.round(data.temp.max)}°</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <View style={styles.infoBar}>
                        <View
                          style={{
                            height: data.temp.max,
                            width:5,
                            backgroundColor: 'red',
                            alignItems:'flex-end',
                            borderRadius:2
                          }}
                        />
                      </View>
                      </View>
          <View style={{flexDirection:'row',padding:10}}>
          <FontAwesome5 name='temperature-low' color={'yellow'} size={20}/>
          <Text style={styles.temp}>{Math.round(data.temp.min)}°</Text>
          </View>
         
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
    height: 50,
    alignSelf:'center'
  },
  currentTempContainer: {
    backgroundColor: '#00000033',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
    marginHorizontal:10
  },
  day: {
    fontSize: 20,
    color: 'white',
    padding: 5,
    borderRadius:5,
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    textAlign: 'center',
    margin:5
  },
  temp: {
    fontSize: 16,
    color: 'white',
    fontWeight: '100',
    textAlign: 'center',
    marginLeft:5
  },
  infoBar: {
    width: 5,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent:'flex-end',
    borderRadius:2
  },
});

export default TemperatureScroll;
