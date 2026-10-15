import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import LottieView from 'lottie-react-native';
const OnBoarding = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        padding: 10,
      }}>
      <LottieView
        source={require('../assets/89268-cloudy-weather.json')}
        autoPlay
        loop></LottieView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        {/* <LottieView source={require('../assets/4801-weather-partly-shower.json')} autoPlay loop style={{height:200,width:200}}/> */}

        <TouchableOpacity onPress={() => navigation.navigate('MyTabs')}>
          <Text
            style={{
              fontSize: 40,
              color: '#fff',
              fontWeight: 'bold',
              alignSelf: 'center',
              marginBottom: 50,
            }}>
            Let's Start
          </Text>
          {/* <Octicons name="arrow-right" size={40} color="#fff" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;
