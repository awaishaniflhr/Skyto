import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { getLocation } from '../utils/weatherData';
import LinearGradient from 'react-native-linear-gradient';
import AirQuality from '../components/AirQuality';
import UVIndex from '../components/UVIndex';
import Sunrise from '../components/Sunrise';
import Slider from '@react-native-community/slider';
import GetLocation from 'react-native-get-location';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Header2 from '../components/Header2';
import { getTime } from 'date-fns';
import { roundCelsius, momentHourOnly, getWeatherIcon } from '../utils/functions';
import moment from 'moment-timezone';
import LottieView from 'lottie-react-native';

const Forcast = ({ navigation }) => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const currentTime1 = getTime(new Date());

  const { data } = useSelector(state => state.root.main);
  // console.log(data.daily, 'ForeCastScreen');
  // console.log(data.current.wind_gust,'ssssssssssssssssssssssssssssssss')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log('new')
      setIsLoading(true);
      setWeather(getLocation());
      setIsLoading(false);
      const currentDate = new Date();
      // console.log(data.hourly.rain,'Rainrrrrrrrrrrrrrrrrrrrrrr')
      const timeStamp = new Date(data.current);

      // console.log(timeStamp,'timettttttttt')


      const sunrise = () => {
        const time = new Date(data.current.sunrise * 1000)
        checkSunrise({ date: time })
      }
      const sunset = () => {
        const time = new Date(data.current.sunset * 1000)
        checkSunset({ date: time })
      }
      const currentTime = () => {
        const time = new Date(currentTime1)
        check({ date: time })
      }

      sunrise()
      sunset()
      //  currentTime()
    });
    return unsubscribe;
  }, []);

  const visibilityLevel = () => {
    // console.log(Data.visibility,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjs')
    if (data.current.visibility / 1000 >= 10 && data.current.visibility / 1000 >= 9) {
      return 'Good';
    } else if (data.current.visibility / 1000 <= 8.09 && data.current.visibility / 1000 >= 6) {
      return 'Moderate';
    } else if (data.current.visibility / 1000 <= 5.09 && data.current.visibility / 1000 >= 3) {
      return 'Unhealthy for Sensitive';
    } else if (
      data.current.visibility / 1000 >= 2.09 && data.current.visibility / 1000 >= 1.5
    ) {
      return 'Unhealthy';
    } else if (data.current.visibility / 1000 >= 1.4 && data.current.visibility / 1000 >= 1.1) {
      return 'Very Unhealthy';
    } else if (data.current.visibility / 1000 >= 1 && data.current.visibility / 1000 >= 0) {
      return 'Hazardous';
    } else {
      return 'Unknown';
    }
  };
  const checkSunrise = ({ date }) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'timesssss')
    setSunrise(hours + ":" + minutes)

  };
  const checkSunset = ({ date }) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'timesssss')
    setSunset(hours + ":" + minutes)

  };

  // console.log(sunrise,'sunrise')
  // console.log(sunset,'sunset')
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2E335A'
        }}>
        <LottieView resizeMode='contain'
          style={{ position: 'absolute', height: '80%', width: '80%' }}
          source={require('../assets/loading2.json')} autoPlay loop />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.forecastContainer}
        colors={['rgba(46, 51, 90, 0.9)', 'rgba(28, 27, 51, 1)']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 2 }}>
        <Header2 navigation={navigation} text={'Forecast'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={{ height: 10 }} />
          <AirQuality text={data.current.wind_gust} />
          <View style={styles.UVIndexnSunrise}>
            <UVIndex text={data.current.uvi} />
            <Sunrise text={sunrise} text2={sunset} />
          </View>
          <View style={styles.UVIndexnSunrise}>
            <View style={styles.container}>
              <View style={styles.subContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/airquality.png')}
                />
                <Text style={styles.txt}>WIND</Text>
              </View>
              <Image
                resizeMode="contain"
                style={styles.sectionImg}
                source={require('../assets/compass.png')}
              />
              <Text style={styles.windTxt}>{data.current.wind_speed} Km</Text>
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/rainfall.png')}
                />
                <Text style={styles.txt}>RAINFALL</Text>
              </View>
              <View style={styles.rainTxt}>
                <Text style={styles.rainText}>
                  {data.current.rain ? data.current.rain : 0}
                  {/* {data.current.rain['1h']} */}
                </Text>
                <Text style={styles.mmText}>mm</Text>
              </View>
              <Text style={styles.lastHrTxt}>in last hour</Text>
              <Text style={styles.nextHrTxt}>{data.current.rain ? data.current.rain : 0} mm expected in next 24</Text>
            </View>
          </View>
          <View style={styles.UVIndexnSunrise}>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/thermometer.png')}
                />
                <Text style={styles.txt}>FEELS LIKE</Text>
              </View>
              <View style={styles.subSec}>
                <Text style={styles.rainText}>{Math.round(data.current.feels_like ? data.current.feels_like : 0)}</Text>
                <Text style={styles.degreeTxt}>o</Text>
              </View>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: 16,
                  fontWeight: '400',
                  width: 150,
                  position: 'absolute',
                  bottom: 10,
                  left: 15,
                }}>
                Actual temperature is like{': '}
                <Text style={{ fontSize: 16, color: 'white', fontWeight: '700' }}>
                  {Math.round(data.current.temp ? data.current.temp : 0)}
                </Text>
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 11,
                  fontWeight: '600',
                  position: 'absolute',
                  bottom: 17,
                  left: 84,
                }}>
                o
              </Text>
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/humidity.png')}
                />
                <Text style={styles.txt}>HUMIDITY</Text>
              </View>
              <View style={styles.subSec}>
                <Text style={styles.rainText}>{data.current.humidity}%</Text>
                {/* <Text style={styles.degreeTxt}>o</Text> */}
              </View>
              <Text
                style={[
                  styles.nextHrTxt,
                  { position: 'absolute', bottom: 10, left: 15 },
                ]}>
                The humidity should be in 40-70%
              </Text>
            </View>
          </View>
          <View style={styles.UVIndexnSunrise}>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/eye.png')}
                />
                <Text style={styles.txt}>VISIBILITY</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 40,
                  alignItems: 'baseline',
                }}>
                <Text style={styles.rainText}>
                  {data.current.visibility ? data.current.visibility / 1000 : 0}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: '400',
                  }}>
                  Km
                </Text>
              </View>

              <Text
                style={[
                  styles.nextHrTxt,
                  { position: 'absolute', bottom: 10, left: 15 },
                ]}>
                {visibilityLevel()}
              </Text>
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  resizeMode="contain"
                  style={styles.icon}
                  source={require('../assets/pressure.png')}
                />
                <Text style={styles.txt}>PRESSURE</Text>
              </View>
              <Image
                style={styles.sectionImg}
                source={require('../assets/gauge.png')}
              />
              <Text style={styles.rainText}>{data.current.pressure} psi</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default Forcast;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loaderImg: { height: 300, width: 300 },
  forecastContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
  scrollContent: {
    // Keep the final forecast cards clear of the absolute-positioned tab bar.
    paddingBottom: 140,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.5)',
  },
  txt: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    marginLeft: 10,
  },
  sectionImg: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: 'rgba(255,255,255,0.4)',
    marginTop: 10,
  },
  windTxt: {
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
    marginTop: 5,
    marginRight: 5,
    alignSelf: 'center',
  },
  rainTxt: {
    flexDirection: 'row',
    alignItems: 'baseline',
    height: 40,
  },
  subSec: {
    flexDirection: 'row',
    height: 40,
  },
  rainText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '400',
    marginRight: 5,
  },
  mmText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  lastHrTxt: {
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 5,
  },
  nextHrTxt: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: '400',
    width: 150,
  },
  degreeTxt: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  UVIndexnSunrise: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '48%',
    backgroundColor: 'rgba(46, 51, 90, 0.8)',
    height: 163,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    padding: 15,
  },
});
