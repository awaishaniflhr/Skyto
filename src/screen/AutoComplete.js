import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setAutoLocation} from '../utils/weatherData';
import {fetchOpenMeteoWeather} from '../utils/openMeteo';
import LottieView from 'lottie-react-native';
var Lat = '';
var Long = '';
var Name = '';
var Checklocation = '';
var City = '';

const AutoComplete = ({navigation}) => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const selectLocation = async (lat, long) => {
    if (lat == null || long == null) {
      Alert.alert('Location unavailable', 'Choose a location and try again.');
      return;
    }
    try {
      const data = await fetchOpenMeteoWeather(lat, long);
      setAutoLocation(data);
      Alert.alert('Location updated', 'Weather loaded for your selected location.');
      navigation.navigate('Home');
    } catch (error) {
      console.warn('Weather lookup failed:', error);
      Alert.alert('Weather unavailable', 'Please try again in a moment.');
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <LottieView
        resizeMode="cover"
        style={{position: 'absolute', height: '100%', width: '100%'}}
        source={require('../assets/10201-background-full-screen-night.json')}
        autoPlay
        loop
      />
      <View style={{flex: 1, marginTop: 20, zIndex: 1, margin: 20}}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Enter Location"
          color={'black'}
          onTimeout={() =>
            console.warn('google places autocomplete: request timeout')
          }
          isRowScrollable={true}
          keyboardShouldPersistTaps="always"
          listUnderlayColor={'#c8c7cc'}
          listViewDisplayed="auto"
          keepResultsAfterBlur={false}
          minLength={0}
          onPress={(data, details = null) =>
            selectLocation(
              details?.geometry?.location?.lat,
              details?.geometry?.location?.lng,
            )
          }
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholderTextColor: '#fff',
            leftIcon: {type: 'font-awesome', name: 'search', color: 'white'},
          }}
          renderLeftButton={() => (
            <Image
              source={require('../assets/icons/search.png')}
              style={{
                marginRight: 10,
                alignSelf: 'center',
                height: 30,
                width: 30,
                tintColor: 'white',
              }}
            />
          )}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              flexDirection: 'row',
              borderBottomWidth: 0,
            },
            textInput: {
              height: 50,
              fontSize: 16,
              backgroundColor: '#00000033',
              borderColor: 'white',
              borderWidth: 1,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {},
            row: {
              backgroundColor: '#00000033',
              padding: 10,
              minHeight: 50,
            },
            loader: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 20,
            },
            description: {},
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            poweredContainer: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: '#c8c7cc',
              borderTopWidth: 0.5,
            },
            powered: {},
          }}
          query={{
            key: 'AIzaSyCRQbuzB7296abvanXJON4x7_PcoR_MKLo',
            language: 'en',
          }}
          disableScroll={true}
        />
      </View>
    </View>
  );
};

export default AutoComplete;

export function setCity() {
  // console.log(Currentlocation,'gl')
  return City;
}
export {Lat, Long, Name};
