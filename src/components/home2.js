import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {getLocation, setAutoLocation} from '../utils/weatherData';
import {fetchOpenMeteoWeather} from '../utils/openMeteo';
import HourScroll from '../components/Hourly/HourScrool';
import GetLocation from 'react-native-get-location';
import Search from '../components/Search';
import DateTime from '../components/DateTime';
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const Home = ({navigation}) => {
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [weather, setWeather] = useState([]);
  const [showCity, setShowCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const img = {
    uri:
      'https://openweathermap.org/img/wn/' +
      weather?.current?.weather[0].icon +
      '.png',
  };

  const fetchDataFromApi = async (latitude, longitude) => {
    if (latitude == null || longitude == null) return;
    setIsLoading(true);
    try {
      const data = await fetchOpenMeteoWeather(latitude, longitude);
      setWeather(data);
      setAutoLocation(data);
    } catch (error) {
      console.warn('Weather lookup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 25000,
      })
        .then(location => {
          // console.log(location);
          fetchDataFromApi(location.latitude, location.longitude);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
          fetchDataFromApi('30.3753', '69.3451');
        });
    })();

    const unsubscribe = navigation.addListener('focus', () => {
      let loc = getLocation();
      setWeather(loc);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? 'pm' : 'am';

      setTime(
        (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes) +
          ampm,
      );

      setDate(days[day] + ', ' + date + ' ' + months[month]);
    }, 1000);
  }, []);
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/loader.gif')}
          style={{height: 300, width: 300}}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#533E85'} />
      <LottieView
        resizeMode="cover"
        style={{position: 'absolute', height: '100%', width: '100%'}}
        source={require('../assets/10201-background-full-screen-night.json')}
        autoPlay
        loop
      />
      <Search navigation={navigation} />
      <ScrollView style={{flex: 1, zIndex: 1, marginBottom: 60}}>
        <DateTime
          navigation={navigation}
          current={weather?.current}
          timezone={weather?.timezone}
          lat={weather?.lat}
          lon={weather?.lon}
          img={img}
          weatherType={weather?.main}
        />

        <View
          style={{
            width: Dimensions.get('screen').width,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <View style={styles.box}>
            <LottieView
              source={require('../assets/82375-cloudy-weather.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>{weather?.current?.clouds}%</Text>
              <Text style={styles.infoText}>Clouds</Text>
            </View>
          </View>
          <View style={styles.box}>
            {/* <Entypo name="water" size={30} color={'#024B86'} /> */}
            <LottieView
              source={require('../assets/74931-humidly.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>{weather?.current?.humidity}%</Text>

              <Text style={styles.infoText}>Humidity</Text>
            </View>
          </View>
          <View style={styles.box}>
            <LottieView
              source={require('../assets/61114-clear-day.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>{weather?.current?.uvi}</Text>
              <Text style={styles.infoText}>UV-Low</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('screen').width,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <View style={styles.box}>
            <LottieView
              source={require('../assets/90797-visibility-forked.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>
                {weather?.current?.visibility}
              </Text>
              <Text style={styles.infoText}>Visibility</Text>
            </View>
          </View>
          <View style={styles.box}>
            <LottieView
              source={require('../assets/17484-drop-icon.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>{weather?.current?.dew_point}</Text>
              <Text style={styles.infoText}>Dew Point</Text>
            </View>
          </View>
          <View style={styles.box}>
            <LottieView
              source={require('../assets/59892-air-pressure.json')}
              autoPlay
              loop
              style={{height: 50, width: 50}}></LottieView>
            <View
              style={{
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>{weather?.current?.pressure}</Text>
              <Text style={styles.infoText}>Pressure</Text>
            </View>
          </View>
        </View>
        <HourScroll weatherData={weather.hourly} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 15,
  },
  box: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-evenly',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
    height: 150,
    width: 100,
  },
  infoText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: ' #bfafb2 ',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    //flexBasis: '42%',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
