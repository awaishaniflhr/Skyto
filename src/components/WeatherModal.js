import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  LinearGradient,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import styles from '../utils/styles';
import UVIndex from './UVIndex';
import AirQuality from './AirQuality';
import Sunrise from './Sunrise';
import {getTime} from 'date-fns';
import {momentHourOnly} from '../utils/functions';
import moment from 'moment-timezone';

const WeatherModal = () => {
  const renderHourlyView = ({item, index, time}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible2(false);
          setSendData(item);
          setInd(index);
          // console.log(index);
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
        setModalVisible2(true);
        setSendData(item);
        setInd(index);
        // console.log(item.dt, 'weekly');
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
        style={{width: 30, height: 30, elevation: 30}}
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
          {Math.round(item.temp.max)}
        </Text>
        <Text style={{fontSize: 10, color: '#E0D9FF', fontWeight: '700'}}>
          o
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
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
            <Text
              style={[
                styles.simpleTxt,
                {fontSize: 30, marginTop: 10, color: 'white'},
              ]}>
              Lahore
            </Text>
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
              {/* <DailyWeatherData/> */}
              <AirQuality text={data.current.wind_gust} />
              <View style={styles.UVIndexnSunrise}>
                <UVIndex text={data.current.uvi} />
                <Sunrise
                  text={sunrise ? sunrise : null}
                  text2={sunset ? sunset : null}
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
                    {weather.current.wind_speed
                      ? weather.current.wind_speed
                      : 0}{' '}
                    Km
                  </Text>
                </View>
                <View style={styles.container}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      RAINFALL
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
                      {data.current.rain ? data.current.rain : 0}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 22,
                        fontWeight: '600',
                      }}>
                      mm
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 22,
                      fontWeight: '400',
                      marginBottom: 5,
                    }}>
                    in last hour
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: 16,
                      fontWeight: '400',
                      width: 150,
                    }}>
                    {data.current.rain ? data.current.rain : 0} mm expected in
                    next 24
                  </Text>
                </View>
              </View>
              <View style={styles.UVIndexnSunrise}>
                <View style={styles.container}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      {Math.round(data.current.feels_like)
                        ? Math.round(data.current.feels_like)
                        : 0}
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
                    Similar to the actual temperature.
                  </Text>
                </View>
                <View style={styles.container}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      {weather.current.humidity ? weather.current.humidity : 0}
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
                    The dew point{' '}
                    <Text>
                      {weather.current.dew_point
                        ? weather.current.dew_point
                        : 0}
                    </Text>{' '}
                    right now.
                  </Text>
                </View>
              </View>
              <View style={styles.UVIndexnSunrise}>
                <View style={styles.container}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      {weather.current.visibility
                        ? weather.current.visibility
                        : 0}
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
                    Similar to the actual temperature.
                  </Text>
                </View>
                <View style={styles.container}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                    {weather.current.pressure ? weather.current.pressure : 0}{' '}
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
  );
};

export default WeatherModal;
