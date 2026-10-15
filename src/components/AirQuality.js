import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

const AirQuality = ({navigation,text}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',  alignItems:'center'}}>
        <Image
          resizeMode="contain"
          style={{width: 20, height: 20, tintColor: 'rgba(255, 255, 255, 0.5)'}}
          source={require('../assets/airquality.png')}
        />
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16,
            marginLeft: 10,
          }}>
          Wind Gust
        </Text>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          marginTop: 20,
          marginLeft:20,
          fontWeight: '600',
        }}>
        {text?text:0} Km
      </Text>
      <Slider 
        style={{width: '100%', height: 20, marginVertical: 15}}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#48319d"
        maximumTrackTintColor="#c427fb"
        thumbTintColor="white"
        value={text?text:0}
        disabled={true}
        
      />
    </View>
  );
};

export default AirQuality;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'rgba(46, 51, 90, 0.8)',
    height: 150,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    padding: 15,
  },
});
