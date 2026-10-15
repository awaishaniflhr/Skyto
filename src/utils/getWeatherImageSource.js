import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {roundCelsius, momentHourOnly, getWeatherIcon} from '../utils/functions';
import moment from 'moment-timezone';
import {getTime} from 'date-fns';


const getWeatherImageSource = (item) => {
    const hour = momentHourOnly(item.dt);
  
    if (
      hour === '5am' || hour === '6am' || hour === '7am' || hour === '8am' ||
      hour === '9am' || hour === '10am' || hour === '11am' || hour === '12pm' ||
      hour === '1pm' || hour === '2pm' || hour === '3pm' || hour === '4pm' ||
      hour === '5pm' || hour === '6pm' || hour === '7pm'
    ) {
      if (item.clouds >= 70 && item.clouds <= 100) {
        return require('../assets/cloud4.png');
      } else if (item.clouds <= 69 && item.clouds >= 50) {
        return require('../assets/cloud4.png');
      } else if (item.clouds <= 49 && item.clouds >= 20) {
        return require('../assets/daycloud1.png');
      } else if (item.clouds <= 19 && item.clouds >= 0) {
        return require('../assets/daysunny5.png');
      } else {
        return require('../assets/cloud1.png');
      }
    } else {
      if (item.clouds >= 70 && item.clouds <= 100) {
        return require('../assets/nightrain2.png');
      } else if (item.clouds <= 69 && item.clouds >= 50) {
        return require('../assets/nightcloud1.png');
      } else if (item.clouds <= 49 && item.clouds >= 20) {
        return require('../assets/nightstrom3.png');
      } else if (item.clouds <= 19 && item.clouds >= 0) {
        return require('../assets/night4.png');
      } else {
        return require('../assets/cloud1.png');
      }
    }
  };
  

export default getWeatherImageSource

const styles = StyleSheet.create({})