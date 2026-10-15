import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import moment from 'moment-timezone';
import GetLocation from 'react-native-get-location';
import LinearGradient from 'react-native-linear-gradient';
import AirQuality from '../components/AirQuality';
import UVIndex from '../components/UVIndex';
import Sunrise from '../components/Sunrise';
import {Store} from '../redux/store';
import {setData, setSelectedCity} from '../redux/reducers/mainReducer';
import {useSelector} from 'react-redux';
import {roundCelsius, momentHourOnly, getWeatherIcon} from '../utils/functions';
import {LogBox} from 'react-native';
import MyWrapper from '../components/MyWrapper';
import Search from '../components/Search';
import getWeatherImageSource from '../utils/getWeatherImageSource';
import {getTime} from 'date-fns';
import styles from '../utils/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setAutoLocation} from '../utils/weatherData';
import LottieView from 'lottie-react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

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

// const WeeklyData = [
//   {
//     id: 1,
//     name: 'Mon',
//     temp: 25,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud1.png'),
//     day: 'Monday - May 23',
//   },
//   {
//     id: 2,
//     name: 'Tue',
//     temp: 28,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud2.png'),
//     day: 'Tuesday - May 23',
//   },
//   {
//     id: 3,
//     name: 'Wed',
//     temp: 30,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud3.png'),
//     day: 'Wednesday - May 23',
//   },
//   {
//     id: 4,
//     name: 'Thu',
//     temp: 27,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud4.png'),
//     day: 'Thursday - May 23',
//   },
//   {
//     id: 5,
//     name: 'Fri',
//     temp: 30,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud1.png'),
//     day: 'Friday - May 23',
//   },
//   {
//     id: 6,
//     name: 'Sat',
//     temp: 31,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud5.png'),
//     day: 'Satuarday - May 23',
//   },
//   {
//     id: 7,
//     name: 'Sun',
//     temp: 28,
//     deg: 'o',
//     sunrise: '05:55 AM',
//     sunset: '07:09 PM',
//     Image: require('../assets/cloud1.png'),
//     day: 'Sunday - May 23',
//   },
// ];

const API_KEY = '5cc03c2fee95ac3c8531f262aefdeed7';
var Lat = '';
var Long = '';
var Name = '';
var Checklocation = '';
var City = '';

const cities = [
  {name: 'Lahore', latitude: 31.5204, longitude: 74.3587},
  {name: 'Islamabad', latitude: 33.6844, longitude: 73.0479},
  {name: 'Karachi', latitude: 24.8607, longitude: 67.0011},
  {name: 'Faisalabad', latitude: 31.4504, longitude: 73.135},
  {name: 'Gujranwala', latitude: 32.1877, longitude: 74.1945},
  {name: 'Sialkot', latitude: 32.4945, longitude: 74.5229},
  {name: 'Kasur', latitude: 31.1179, longitude: 74.4408},
  {name: 'Naran', latitude: 34.9093, longitude: 73.6507},
  {name: 'Kaghan', latitude: 34.7794, longitude: 73.527},
];

const Home = ({navigation}) => {
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [forecastType, setForecastType] = useState('weekly');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [sendData, setSendData] = useState();
  const [ind, setInd] = useState(0);
  const openWeatherKey = `5cc03c2fee95ac3c8531f262aefdeed7`;
  const Height = Dimensions.get('window').height;
  const {data, selectedCity} = useSelector(state => state.root.main);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const currentTime1 = getTime(new Date());
  const [location, setLocation] = useState('');
  const [value, setValue] = useState(false);
  const [showFlatList, setShowFlatList] = useState(true);

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const [filteredCities, setFilteredCities] = useState(cities);
  // const [selectedCity, setSelectedCity] = useState(null);

  const handleInputChange = text => {
    const filtered = cities.filter(city =>
      city.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredCities(filtered);
    if (text.length > 0) {
      setShowFlatList(true);
    }
  };

  const modalOpen = () =>{
    setModalVisible(true)
  }
  const handleCitySelection = city => {
    setSelectedCity(city);
    fetchDataFromApiSelectedCity();
    Store.dispatch(setSelectedCity(city));
    // console.log(selectedCity.latitude, 'selected Cityyyyyyyyyyyyyyyy');
    const displayText = `${city.name}`;
    // ${city.latitude}, ${city.longitude}
    setInputText(displayText);
    setShowFlatList(true);
    // Optionally, you can clear the input after selection
    // setInputText('');
  };

  const [inputText, setInputText] = useState('');

  // const selectLocation = async (lat, long) => {
  //   await fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`,
  //   )
  //     .then(res => res.json())
  //     .then(data => {
  //       // console.log(data);
  //       // console.log(Checklocation);
  //       setAutoLocation(data);
  //       Alert.alert('Your search set successully...');
  //       navigation.navigate('Home');
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //       Alert.alert('Something went worng ...!');
  //     });
  // };

  useEffect(() => {
    if (lat === null && long === null) {
      (async () => {
        try {
          const location = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 25000,
          });

          setLat(location.latitude);
          setLong(location.longitude);
          SunriseTime();
          SunsetTime();
          // console.log(location.latitude, 'Current Location latitude');
          // console.log(location.longitude, 'Current Location longitude');
        } catch (error) {
          const {code, message} = error;
          console.warn(code, message);
          fetchDataFromApi('30.3753', '69.3451');
        }
      })();
    } else {
      fetchDataFromApi();
    }
  }, [lat, long]);

  const fetchDataFromApi = async () => {
    // console.log(lat, 'lat');
    // console.log(long, 'long');
    if (30.3753 && 69.3451) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${30.3753}&lon=${69.3451}&units=metric&appid=${openWeatherKey}`,
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data.current.feels_like, 'Home Screen');
          setIsLoading(true);
          setWeather(data);
          Store.dispatch(setData(data)), setIsLoading(false);
        });
    }
  };

  const visibilityLevel = () => {
    // console.log(Data.visibility,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjs')
    if (
      data.current.visibility / 1000 >= 10 &&
      data.current.visibility / 1000 >= 9
    ) {
      return 'Good';
    } else if (
      data.current.visibility / 1000 <= 8.09 &&
      data.current.visibility / 1000 >= 6
    ) {
      return 'Moderate';
    } else if (
      data.current.visibility / 1000 <= 5.09 &&
      data.current.visibility / 1000 >= 3
    ) {
      return 'Unhealthy for Sensitive';
    } else if (
      data.current.visibility / 1000 >= 2.09 &&
      data.current.visibility / 1000 >= 1.5
    ) {
      return 'Unhealthy';
    } else if (
      data.current.visibility / 1000 >= 1.4 &&
      data.current.visibility / 1000 >= 1.1
    ) {
      return 'Very Unhealthy';
    } else if (
      data.current.visibility / 1000 >= 1 &&
      data.current.visibility / 1000 >= 0
    ) {
      return 'Hazardous';
    } else {
      return 'Unknown';
    }
  };

  const SunriseTime = () => {
    const time = new Date(data.current.sunrise * 1000);
    checkSunrise({date: time});
  };
  const SunsetTime = () => {
    const time = new Date(data.current.sunset * 1000);
    checkSunset({date: time});
  };
  // const currentTime = () => {
  //   const time = new Date(currentTime1);
  //   check({date: time});
  // };

  const fetchDataFromApiSelectedCity = async () => {
    if (selectedCity.latitude && selectedCity.longitude) {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&units=metric&appid=${openWeatherKey}`,
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data, 'Home Screen');
          setIsLoading(true);
          setWeather(data);
          Store.dispatch(setData(data)), setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? ' PM' : ' AM';

      setTime(
        (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes) +
          ampm,
      );
      setDate(days[day] + ', ' + date + ' ' + months[month]);
    }, 1000);
  }, []);

  const checkSunrise = ({date}) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'timesssss')
    setSunrise(hours + ':' + minutes);
  };
  const checkSunset = ({date}) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // console.log(hours,":",minutes,'times')
    setSunset(hours + ':' + minutes);
  };
  const renderHourlyView = ({item, index, time}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible2(false);
          setSendData(item);
          setInd(index);
          setValue(true);
          modalOpen();
          // console.log(sendData.wind_gust,'iteeeeeeeeeemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
        }}
        style={[
          styles.cards,
          {
            backgroundColor:
              index == ind ? 'rgba(72, 49, 157, 0.7)' : 'rgba(46, 51, 90, 0.8)',
          },
        ]}>
        <Text style={{fontSize: 14, color: '#E0D9FF'}}>
          {momentHourOnly(item.dt)}
        </Text>
        <Image
          resizeMode="contain"
          style={{width: 30, height: 30}}
          source={getWeatherImageSource(item)}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 14, color: '#E0D9FF'}}>
            {Math.round(item.temp)}
          </Text>
          <Text style={{fontSize: 10, color: '#E0D9FF', fontWeight: '700'}}>
            o
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWeeklyView = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible2(false);
        setSendData(item);
        setInd(index);
        setValue(true);
        modalOpen();
        // console.log(item.feels_like.day, 'weeklyyyyyyyyyyyyyyyyyyyyyy');
      }}
      style={[
        styles.cards,
        {
          backgroundColor:
            index == ind ? 'rgba(72, 49, 157, 0.7)' : 'rgba(46, 51, 90, 0.8)',
        },
      ]}>
      <Text style={{fontSize: 14, color: '#E0D9FF', textAlign: 'center'}}>
        {moment(item.dt * 1000).format('ddd')}
      </Text>
      <Image
        resizeMode="contain"
        style={{width: 30, height: 30}}
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
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 14, color: '#E0D9FF'}}>
          {Math.round(item.temp.max-4)}
        </Text>
        <Text style={{fontSize: 10, color: '#E0D9FF', fontWeight: '700'}}>
          o
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHourlyView2 = ({item, index}) => (
    <View style={styles.cardsModal}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <View style={{flexDirection: 'row', width: 110}}>
          <Image
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: 'rgba(255,255,255,0.7)',
            }}
            source={require('../assets/location.png')}
          />
          <Text style={[styles.modalText, {marginLeft: 5}]}>Lahore</Text>
        </View>
      </View>
      <Text style={[styles.normalTxt, {fontSize: 24, fontWeight: '400'}]}>
        {item.day}
      </Text>
      <Image
        resizeMode="contain"
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
          marginBottom: 10,
          alignSelf: 'center',
        }}
        source={item.Image}
      />
      <Text style={[styles.normalTxt, {fontSize: 40, fontWeight: '600'}]}>
        {item.time}
        <Text style={[styles.normalTxt, {fontSize: 20, fontWeight: '400'}]}>
          AM
        </Text>
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.normalTxt}>Feel Like :</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.normalTxt, {fontWeight: '500', marginLeft: 5}]}>
            {item.temp}
          </Text>
          <Text style={[styles.normalTxt, {fontSize: 14, fontWeight: '600'}]}>
            {item.deg}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            alignItems: 'baseline',
          }}>
          <Text style={[styles.normalTxt, {fontSize: 18}]}>Sunrise:</Text>
          <Text style={styles.normalTxt}>{item.sunrise}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={[styles.normalTxt, {fontSize: 18}]}>Sunset:</Text>
          <Text style={styles.normalTxt}>{item.sunset}</Text>
        </View>
      </View>
    </View>
  );

  const renderWeeklyView2 = ({item}) => (
    <View style={styles.cardsModal}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <View style={{flexDirection: 'row', width: 110}}>
          <Image
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: 'rgba(255,255,255,0.7)',
            }}
            source={require('../assets/location.png')}
          />
          <Text style={[styles.modalText, {marginLeft: 5}]}>Lahore</Text>
        </View>
      </View>
      <Text style={[styles.normalTxt, {fontSize: 24, fontWeight: '400'}]}>
        {moment(item.dt * 1000).format('dddd')}
      </Text>
      <Image
        resizeMode="contain"
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
          marginBottom: 10,
          alignSelf: 'center',
        }}
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
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.normalTxt}>Clouds :</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.normalTxt, {fontWeight: '500', marginLeft: 5}]}>
            {item.clouds}%
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.normalTxt}>Feel Like :</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.normalTxt, {fontWeight: '500', marginLeft: 5}]}>
            {Math.round(item.temp.max)}
          </Text>
          <Text style={[styles.normalTxt, {fontSize: 14, fontWeight: '600'}]}>
            o
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 15,
            alignItems: 'baseline',
          }}>
          <Text style={[styles.normalTxt, {fontSize: 18}]}>Sunrise : </Text>
          <Text style={[styles.normalTxt, {fontWeight: '600'}]}>{sunrise}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={[styles.normalTxt, {fontSize: 18}]}>Sunset : </Text>
          <Text style={[styles.normalTxt, {fontWeight: '600'}]}>{sunset}</Text>
        </View>
      </View>
    </View>
  );
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#2E335A'
        }}>
        <LottieView
          resizeMode="contain"
          style={{position: 'absolute', height: '80%', width: '80%'}}
          source={require('../assets/loading2.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <MyWrapper>
      <ImageBackground
        resizeMode="cover"
        source={require('../assets/backgroundImg.png')}
        style={styles.mainContainer}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />

        {/*///////////////////////////// Search bar start /////////////////////////////*/}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            position: 'absolute',
            marginTop: '20%',
          }}>
          <View
            style={{
              backgroundColor: '#2e335a',
              width: '90%',
              height: 45,
              borderRadius: 15,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 1,
              elevation: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../assets/search.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <TextInput
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={text => {
                setInputText(text);
                handleInputChange(text);
              }}
              value={inputText}
              style={{
                width: '80%',
                height: 45,
                paddingHorizontal: 10,
                alignItems: 'center',
                color: 'white',
              }}
            />
            <TouchableOpacity onPress={() => setInputText('')}>
              <Image
                resizeMode="contain"
                source={require('../assets/cross.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: '#ebebf5',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#00000088',
              borderRadius: 15,
              width: '90%',
            }}>
            {inputText.length > 0 && showFlatList && (
              <FlatList
                data={filteredCities}
                renderItem={({item}) => (
                  <View
                    style={{
                      height: 45,
                      paddingHorizontal: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: '#00000066',
                      width: 290,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: 18, paddingVertical: 5, color: '#fff'}}
                      onPress={() => {
                        handleCitySelection(item);
                        setShowFlatList(false);
                      }}>
                      {item.name}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.name}
              />
            )}
          </View>
        </View>

        {/*///////////////////////////// Search bar ends //////////////////////////////*/}
        <View style={styles.backgroundContent}>
          {selectedCity.name ? (
            <View>
              <Text style={[styles.simpleTxt, {fontSize: 46, marginTop: '8%'}]}>
                {selectedCity.name}
              </Text>
            </View>
          ) : (
            <Text style={[styles.simpleTxt, {fontSize: 46, marginTop: '8%'}]}>
              Lahore
            </Text>
          )}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 75,
                color: 'white',
                height: 100,
                marginTop: -15,
              }}>
              {Math.round(data.current.temp)
                ? Math.round(data.current.temp)
                : null}
            </Text>
            <Text style={{fontSize: 30, fontWeight: '500', color: 'white'}}>
              o
            </Text>
          </View>
          <Text style={styles.txt}>
            {weather.current.weather[0].description
              ? weather.current.weather[0].description
              : null}
          </Text>
          <Text style={[styles.txt, {color: 'white', fontSize: 24}]}>
            {time ? time : null}
          </Text>
          <Image
            resizeMode="contain"
            style={styles.houseImg}
            source={require('../assets/house.png')}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.HourlynDailyForcastButton}>
            <View style={styles.hourlySection}>
              <TouchableOpacity
                style={{padding: 5}}
                onPress={() => setForecastType('hourly')}>
                <Text style={styles.btnTxt}>Hourly Forecast</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 35,
                }}
                onPress={() => modalOpen()}>
                <View
                  style={{
                    width: 80,
                    height: 7,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: 10,
                    position: 'absolute',
                    top: 0,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 5}}
                onPress={() => setForecastType('weekly')}>
                <Text style={styles.btnTxt}>Weekly Forecast</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {forecastType === 'hourly' ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data.hourly.slice(0, 23)}
                renderItem={(index, item) => renderHourlyView(index, item)}
                horizontal
              />
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data.daily.slice(0, 7)}
                renderItem={(index, item) => renderWeeklyView(index, item)}
                horizontal
              />
            )}
          </View>
          {/* Modal Start Here */}
          <View style={{flex: 1}}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              statusBarTranslucent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalView}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={styles.closeBtn}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/close.png')}
                      style={{width: 20, height: 20, tintColor: 'white'}}
                    />
                  </TouchableOpacity>
                  {selectedCity.name ? (
                    <View>
                      <Text style={[styles.simpleTxt, {fontSize: 30}]}>
                        {selectedCity.name}
                      </Text>
                    </View>
                  ) : (
                    <Text style={[styles.simpleTxt, {fontSize: 30}]}>
                      Lahore
                    </Text>
                  )}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: 24,
                          color: 'white',
                          color: 'rgba(255, 255, 255, 0.4)',
                        }}>
                        {Math.round(data.current.temp)
                          ? Math.round(data.current.temp)
                          : null}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'rgba(255, 255, 255, 0.4)',
                        }}>
                        o
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 30,
                        marginHorizontal: 5,
                        color: 'rgba(255, 255, 255, 0.4)',
                      }}>
                      |
                    </Text>
                    <Text
                      style={[
                        styles.txt,
                        {color: 'rgba(255, 255, 255, 0.4)', fontSize: 20},
                      ]}>
                      {weather.current.weather[0].description
                        ? weather.current.weather[0].description
                        : null}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  style={[styles.forecastContainer, {height: '84%'}]}
                  colors={['rgba(46, 51, 90, 0.9)', 'rgba(28, 27, 51, 1)']}
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 2}}>
                  <View style={[styles.HourlynDailyForcastButton2, {}]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 25,
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => setForecastType('hourly')}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'lightgray',
                            fontWeight: '600',
                          }}>
                          Hourly Forcast
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 120,
                          height: 35,
                        }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <View
                          style={{
                            width: 80,
                            height: 7,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: 10,
                            position: 'absolute',
                            top: 0,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{padding: 5}}
                        onPress={() => setForecastType('weekly')}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'lightgray',
                            fontWeight: '600',
                          }}>
                          Weekly Forcast
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    {forecastType === 'hourly' ? (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data.hourly.slice(0, 23)}
                        renderItem={renderHourlyView}
                        horizontal
                      />
                    ) : (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data.daily.slice(0, 7)}
                        renderItem={renderWeeklyView}
                        horizontal
                      />
                    )}
                  </View>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <AirQuality
                      text={value ? sendData.wind_gust : data.current.wind_gust}
                    />
                    <View style={styles.UVIndexnSunrise}>
                      <UVIndex text={value ? sendData.uvi : data.current.uvi} />
                      <Sunrise
                        text={sunrise ? sunrise : '00:00'}
                        text2={sunset ? sunset : '00:00'}
                      />
                    </View>
                    <View style={styles.UVIndexnSunrise}>
                      <View style={styles.container}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 10,
                          }}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/airquality.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            WIND
                          </Text>
                        </View>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: 70,
                            height: 70,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            tintColor: 'rgba(255,255,255,0.4)',
                          }}
                          source={require('../assets/compass.png')}
                        />
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 22,
                            fontWeight: '400',
                            marginTop: 5,
                            marginRight: 5,
                            alignSelf: 'center',
                          }}>
                          {value
                            ? sendData.wind_speed
                            : data.current.wind_speed}{' '}
                          Km
                        </Text>
                      </View>
                      <View style={styles.container}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/rainfall.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            CLOUDS
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'baseline',
                            height: 40,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 35,
                              fontWeight: '400',
                              marginRight: 5,
                            }}>
                            {value ? sendData.clouds : data.current.clouds}%
                          </Text>
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
                          {value
                            ? sendData.weather[0].description
                            : data.current.weather[0].description}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.UVIndexnSunrise}>
                      <View style={styles.container}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/thermometer.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            FEELS LIKE
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 40,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 35,
                              fontWeight: '400',
                              marginRight: 5,
                            }}>
                            {value
                              ? Math.round(sendData.feels_like) ||
                                Math.round(sendData.feels_like.day)
                              : Math.round(data.current.feels_like)}
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 22,
                              fontWeight: '600',
                            }}>
                            o
                          </Text>
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
                          Actual temperature is{': '}
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'white',
                              fontWeight: '700',
                            }}>
                            {value
                              ? Math.round(sendData.temp) ||
                                Math.round(sendData.temp.day)
                              : Math.round(data.current.temp)}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 11,
                            fontWeight: '600',
                            position: 'absolute',
                            bottom: 17,
                            left: 54,
                          }}>
                          o
                        </Text>
                      </View>
                      <View style={styles.container}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/humidity.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            HUMIDITY
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 40,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 35,
                              fontWeight: '400',
                              marginRight: 5,
                            }}>
                            {value
                              ? sendData.humidity
                              : weather.current.humidity}
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 22,
                              fontWeight: '600',
                            }}>
                            o
                          </Text>
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
                          The humidity should be in 40-70%
                        </Text>
                      </View>
                    </View>
                    <View style={styles.UVIndexnSunrise}>
                      <View style={styles.container}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/eye.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            VISIBILITY
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 40,
                            alignItems: 'baseline',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 35,
                              fontWeight: '400',
                              marginRight: 5,
                            }}>
                            {value
                              ? sendData.visibility / 1000 ||
                                weather.current.visibility / 1000
                              : weather.current.visibility / 1000}
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
                          style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 16,
                            fontWeight: '400',
                            width: 150,
                            position: 'absolute',
                            bottom: 10,
                            left: 15,
                          }}>
                          {visibilityLevel()}
                        </Text>
                      </View>
                      <View style={styles.container}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            resizeMode="contain"
                            style={{
                              width: 20,
                              height: 20,
                              tintColor: 'rgba(255, 255, 255, 0.5)',
                            }}
                            source={require('../assets/pressure.png')}
                          />
                          <Text
                            style={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: 16,
                              marginLeft: 10,
                            }}>
                            PRESSURE
                          </Text>
                        </View>
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            tintColor: 'rgba(255, 255, 255, 0.5)',
                            alignSelf: 'center',
                            marginTop: 15,
                          }}
                          source={require('../assets/gauge.png')}
                        />
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 28,
                            fontWeight: '400',
                            marginTop: 5,
                            marginRight: 5,
                            alignSelf: 'center',
                          }}>
                          {value ? sendData.pressure : weather.current.pressure}{' '}
                          psi
                        </Text>
                      </View>
                    </View>
                    <View style={{height: 30}}></View>
                  </ScrollView>
                </LinearGradient>
              </View>
            </Modal>
          </View>
          {/* Modal Ends Here */}
          {/* </LinearGradient> */}
        </View>

        {/* Cards Modal Start */}
        <View style={{flex: 1}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            statusBarTranslucent={true}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}>
            {sendData && (
              <View style={styles.outerCardsModalContainer}>
                <TouchableOpacity
                  style={styles.closeIconStyle}
                  onPress={() => setModalVisible2(!modalVisible2)}>
                  <Image
                    resizeMode="contain"
                    style={styles.closeIcon}
                    source={require('../assets/close.png')}
                  />
                </TouchableOpacity>
                <View style={styles.cardsModalContainer}>
                  <View>
                    {forecastType === 'hourly' ? (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data.hourly.slice(0, 23)}
                        renderItem={renderHourlyView2}
                        horizontal
                        initialScrollIndex={ind}
                      />
                    ) : (
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={data.daily.slice(0, 7)}
                        renderItem={renderWeeklyView2}
                        horizontal
                        initialScrollIndex={ind}
                      />
                    )}
                  </View>
                </View>
              </View>
            )}
          </Modal>
        </View>
        {/* Cards Modal Ends */}
      </ImageBackground>
    </MyWrapper>
  );
};

export default Home;
