import React from 'react';
import {View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter Location"
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        container: {
          flex: 1,
        },
        textInputContainer: {
          flexDirection: 'row',
        },
        textInput: {
          backgroundColor: '#FFFFFF',
          height: 44,
          borderRadius: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          fontSize: 15,
          flex: 1,
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
        listView: {},
        row: {
          backgroundColor: '#fff',
          padding: 13,
          height: 44,
          flexDirection: 'row',
        },
        separator: {
          height: 0.5,
          backgroundColor: '#c8c7cc',
        },
        description: {},
        loader: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
        },
      }}
      query={{
        key: 'AIzaSyCRQbuzB7296abvanXJON4x7_PcoR_MKLo',
        language: 'en',
        types: 'geocode',
      }}
    />
  );
};

export default GooglePlacesInput;
