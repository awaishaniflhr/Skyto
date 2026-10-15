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

const UVIndex = ({text}) => {

  const getUVIndexLevel = () => {
    // console.log(text,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    if (text <= 0 && text <= 2) {
      return 'Minimal';
    } else if (text >= 2.01 && text <= 4) {
      return 'Low';
    } else if (text >= 4.01 && text <= 6) {
      return 'Moderate';
    } else if (text >= 6.01 && text <= 8) {
      return 'High';
    } else if (text >= 8.01 && text >= 10) {
      return 'Very High';
    } else {
      return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.titlebar}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require('../assets/sun.png')}
        />
        <Text
          style={styles.title}>
          UV INDEX
        </Text>
      </View>
      <Text
        style={styles.valuesNumber}>
        {text }
      </Text>
      <Text
        style={styles.valuesTxt}>
        {getUVIndexLevel()}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={11}
        minimumTrackTintColor="#48319d"
        maximumTrackTintColor="#c427fb"
        thumbTintColor="white"
        value={text?text : 0}
        disabled={true}
      />
    </View>
  );
};

export default UVIndex;

const styles = StyleSheet.create({
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
  titlebar:{flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  icon:{width: 20, height: 20, tintColor: 'rgba(255, 255, 255, 0.5)'},
  title:{
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    marginLeft: 10,
  },
  valuesNumber:{
    color: 'white',
    fontSize: 25,
    marginTop: 5,

    fontWeight: '600',
  },
  valuesTxt:{
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  slider:{width: '120%', height: 20, position: 'absolute', bottom: 15},
});
