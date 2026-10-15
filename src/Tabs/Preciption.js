import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import {getLocation} from '../utils/weatherData';
import {useSelector} from 'react-redux';
import {momentHourOnly} from '../utils/functions';
import moment from 'moment-timezone';
import {getTime} from 'date-fns';
import getWeatherImageSource from '../utils/getWeatherImageSource';
import LottieView from 'lottie-react-native';


const Preciption = ({navigation}) => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [focused, setFocused] = useState(false);
  const [forecastType, setForecastType] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const {data, selectedCity} = useSelector(state => state.root.main);
  const [sunset, setSunset] = useState('');
  const currentTime1 = getTime(new Date());
  // console.log(currentTime,'currentTime222222222222222')
  // console.log(locationName,'currentTime222222222222222')

  const SunriseTime = ()=>{
    const time=new Date(data.current.sunrise * 1000)
    checkSunrise({date:time})
   }
    const SunsetTime = ()=>{
     const time=new Date(data.current.sunset *1000)
     checkSunset({date:time})
    }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // console.log(data.current.sunrise, 'sunrise');
      // console.log(data.current.sunset, 'sunset');
      // console.log(currentTime1, 'currentTime');
      setIsLoading(true);
      setWeather(getLocation());
      setIsLoading(false);
      const currentDate = new Date();
      // console.log(momentHourOnly(data.current.dt))
      const timeStamp = new Date(data.current);

      // console.log(timeStamp,'timettttttttt')

      

        //  const currentTime = ()=>{
        //   const time=new Date(currentTime1)
        //    check({date:time})
        //  }
 
         SunriseTime()
         SunsetTime()
        //  currentTime()
    });
    return unsubscribe;
  }, []);

  const checkSunrise = ({date}) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'timesssss')
    setSunrise(hours+ ":" + minutes)
    
  };
  const checkSunset = ({date}) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'timesssss')
    setSunset(hours+ ":" + minutes)
    
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#2E335A'
        }}>
        <LottieView resizeMode='contain' 
        style={{position: 'absolute', height: '80%', width: '80%'}}
        source={require('../assets/loading2.json')}  autoPlay loop/>
      </View>
    );
  }
  // const HourlyData = [
  //   {
  //     id: 1,
  //     name: 'Mon',
  //     temp: 19,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Tue',
  //     temp: 20,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud2.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Wed',
  //     temp: 13,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud3.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Thu',
  //     temp: 23,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud4.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 5,
  //     name: 'Fri',
  //     temp: 30,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 6,
  //     name: 'Sat',
  //     temp: 31,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud5.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 7,
  //     name: 'Sun',
  //     temp: 28,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  // ];
  // const WeeklyData = [
  //   {
  //     id: 1,
  //     name: 'Mon',
  //     temp: 19,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Monday',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 2,
  //     name: 'Tue',
  //     temp: 20,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Tuesday',
  //     Image: require('../assets/cloud2.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 3,
  //     name: 'Wed',
  //     temp: 13,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Wednesday',
  //     Image: require('../assets/cloud3.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 4,
  //     name: 'Thu',
  //     temp: 23,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Thursday',
  //     Image: require('../assets/cloud4.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 5,
  //     name: 'Fri',
  //     temp: 30,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Friday',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 6,
  //     name: 'Sat',
  //     temp: 31,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Satuarday',
  //     Image: require('../assets/cloud5.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  //   {
  //     id: 7,
  //     name: 'Sun',
  //     temp: 28,
  //     degree: 'o',
  //     city: 'Lahore',
  //     country: 'Pakistan',
  //     humidity: 'H:24',
  //     pressure: 'L:18',
  //     day: 'Sunday',
  //     Image: require('../assets/cloud1.png'),
  //     bgimg: require('../assets/rectangle.png'),
  //   },
  // ];
 
  const widgetDataHourly = ({item, index}) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('HourlyForecast', {Data: item})}>
    <ImageBackground
      resizeMode="contain"
      source={require('../assets/rectangle.png')}
      style={styles.cardBgImg}>
      <View style={styles.cardsContent}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#fff', fontSize: 50}}>
            {Math.round(item.temp)}
          </Text>
          <Text style={styles.degreeTxt}>o</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.normalTxt}>
            Humidity {Math.round(item.humidity)}%
          </Text>
          <Text style={[styles.normalTxt, {marginLeft: 10}]}>
            Clouds {Math.round(item.clouds)}%
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.normalTxt, {color: '#fff', fontSize: 22}]}>
            {selectedCity.name?selectedCity.name:'Lahore'}{', '}
          </Text>
          <Text style={[styles.normalTxt, {color: '#fff', fontSize: 22}]}>
            Pakistan
          </Text>
        </View>
      </View>
      <View style={{width: '40%'}}>
        <Image
          resizeMode="contain"
          source={getWeatherImageSource(item)}
          style={styles.cloudImg}
        />
        <Text
          style={[
            styles.normalTxt,
            {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 16,
              alignSelf: 'flex-end',
              marginRight: 20,
            },
          ]}>
          {momentHourOnly(item.dt)}
        </Text>
      </View>
    </ImageBackground>
    </TouchableOpacity>
  );
  const widgetDataWeekly = ({item, index}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('DayForecast', {Data: item})}>
      <ImageBackground
        resizeMode="contain"
        source={require('../assets/rectangle.png')}
        style={styles.cardBgImg}>
        <View style={styles.cardsContent}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 50}}>
              {Math.round(item.temp.max-4)}
            </Text>
            <Text style={styles.degreeTxt}>o</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.normalTxt}>
              {moment(item.dt * 1000).format('dddd')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.normalTxt, {color: '#fff', fontSize: 22}]}>
              {selectedCity.name?selectedCity.name:'Lahore'}{', '}
            </Text>
            <Text style={[styles.normalTxt, {color: '#fff', fontSize: 22}]}>
              Pakistan
            </Text>
          </View>
        </View>
        <View style={{width: '40%'}}>
          <Image
            resizeMode="contain"
            source={
              item.clouds >= 70 && item.clouds <= 100
                ? require('../assets/cloud3.png')
                : item.clouds <= 69 && item.clouds >= 50
                ? require('../assets/dayrain2.png')
                : item.clouds <= 49 && item.clouds >= 20
                ? require('../assets/daystrom4.png')
                : item.clouds <= 19 && item.clouds >= 0
                ? require('../assets/daysunny5.png')
                : require('../assets/daystrom4.png')
            }
            style={styles.cloudImg}
          />
          <Text
            style={[
              styles.normalTxt,
              {
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 16,
                alignSelf: 'flex-end',
                marginRight: 5,
                marginTop: 5,
              },
            ]}>
            {data.timezone}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.HourlynDailyForcastButton}>
        <View style={styles.hourlySection}>
          <TouchableOpacity
            style={[
              styles.tab,
              {borderColor: focused ? '#48319d' : 'rgba(255, 255, 255, 0.12)'},
            ]}
            onPress={() => setForecastType('hourly') || setFocused(true)}>
            <Text
              style={[
                styles.btnTxt,
                {color: focused ? '#fff' : 'rgba(255, 255, 255, 0.4)'},
              ]}>
              Hourly Forecast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {borderColor: focused ? 'rgba(255, 255, 255, 0.12)' : '#48319d'},
            ]}
            onPress={() => setForecastType('weekly') || setFocused(false)}>
            <Text
              style={[
                styles.btnTxt,
                {color: focused ? 'rgba(255, 255, 255, 0.4)' : '#fff'},
              ]}>
              Weekly Forecast
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innerContainer}>
        {forecastType === 'hourly' ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.hourly.slice(0, 24)} // Show only the first 24 hours
            renderItem={({item}) => widgetDataHourly({item})}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.daily.slice(0, 7)}
            renderItem={(index, item) => widgetDataWeekly(index, item)}
          />
        )}
      </View>
    </View>
  );
};

export default Preciption;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(46, 51, 90, 0.9)',
    // paddingTop: 20,
  },
  innerContainer: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height + 20,
    alignSelf: 'center',
    paddingBottom: 150,
  },
  cardBgImg: {
    width: 342,
    height: 184,
    alignSelf: 'center',
    marginVertical: 20,
    flexDirection: 'row',
  },
  cardsContent: {
    flexDirection: 'column',
    marginTop: 40,
    marginLeft: 20,
    width: '50%',
  },
  degreeTxt: {color: '#fff', fontWeight: '800', fontSize: 26},
  normalTxt: {color: 'rgba(255, 255, 255, 0.5)', fontSize: 16},
  cloudImg: {width: 130, height: 130, marginLeft: 15},
  HourlynDailyForcastButton: {
    width: Dimensions.get('window').width,
    height: 90,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(31, 29, 71, 0.4)',
    paddingTop: 15,
  },
  hourlySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 10,
  },
  btnTxt: {fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600'},
  tab: {
    backgroundColor: 'rgba(46, 51, 90, 0.8)',
    height: 40,
    width: 150,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 10,
    marginHorizontal: 8,
    marginVertical: 15,
    shadowColor: 'black',
    flexDirection: 'column',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
});
