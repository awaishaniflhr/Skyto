import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {useSelector} from 'react-redux';
import {roundCelsius, momentHourOnly, getWeatherIcon} from '../utils/functions';
import {getTime} from 'date-fns';


const Sunrise = ({navigation,text, text2}) => {

  const {data} = useSelector(state => state.root.main);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginTop: 10,
        }}>
        <Image
          resizeMode="contain"
          style={{width: 25, height: 25, tintColor: 'rgba(255, 255, 255, 0.5)'}}
          source={require('../assets/sunrise.png')}
        />
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16,
            marginLeft: 10,
          }}>
          SUNRISE
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 35,
          marginLeft: 15,
        }}>
        {text?text:null}
      </Text>
      <Image
        resizeMode="contain"
        style={{
          width: '100%',
          height: 45,
          tintColor: 'rgba(255, 255, 255, 0.5)',
        }}
        source={require('../assets/sunrise3.png')}
      />
      <Text
        style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: 14,
          marginLeft: 15,
        }}>
        Sunset: {text2?text2:null} PM
      </Text>
    </View>
  );
};

export default Sunrise;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: 'rgba(46, 51, 90, 0.8)',
    height: 163,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
