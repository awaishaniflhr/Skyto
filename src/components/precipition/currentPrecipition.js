import React from 'react';
import {View, ScrollView, Image, Text, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment-timezone';
import NextPrecipition from './NextPrecipition';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icons from '../../utils/icons';
const CurrentPrecipition = ({weatherData}) => {
  return (
    <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
      <CurrentTempEl
        data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
      />
      <NextPrecipition data={weatherData} />
    </ScrollView>
  );
};

const CurrentTempEl = ({data}) => {
  if (data && data.weather) {
    const img = {
      uri:
        'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png',
    };
    return (
      <View style={styles.currentTempContainer}>
        <View style={{alignItems:'center',justifyContent:'space-evenly'}}>
          <Text style={styles.day}>
              Today
          </Text>
          <Icons weatherType={data.weather[0].main}/>
          <View style={{flexDirection:'row',padding:10}}>
          <Fontisto name='rain' color={'yellow'} size={20}/>
          <Text style={styles.temp}>{Math.round(!data.rain?'':data.rain)}</Text>
          </View>
         
      </View>
      </View>
    );
  } else {
    return <View>

    </View>;
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
marginLeft:10,marginRight:10,
padding:10
  },
  day: {
    fontSize: 20,
    color: 'white',
    padding: 5,fontWeight:'bold',
    borderRadius:5,
    backgroundColor: '#533E85',
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

export default CurrentPrecipition;
