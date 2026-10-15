import { View, Text,Image } from 'react-native'
import React from 'react'



const WeatherIcon = ({weatherType}) => {
    if (weatherType == 'Thunderstorm') {
      return <Image
      source={require('../assets/icons/thunderstrom.png')}
      resizeMode={'contain'}
      style={{height: 50, width: 50}}
    />
    }
    if (weatherType == 'Drizzle') {
      return <Image
      source={require('../assets/icons/drizzle.png')}
      resizeMode={'contain'}
      style={{height: 50, width: 50}}
    />
    }
    if (weatherType == 'Rain') {
      return <Image
      source={require('../assets/icons/rain.png')}
      resizeMode={'contain'}
      style={{height: 50, width: 50}}
    />
    }
    if (weatherType == 'Snow') {
      return <Image
      source={require('../assets/icons/snow.png')}
      resizeMode={'contain'}
      style={{height: 50, width: 50}}
    />
    }
    if (weatherType == 'Clear') {
        return <Image
        source={require('../assets/icons/clear.png')}
        resizeMode={'contain'}
        style={{height: 50, width: 50}}
      />;
      }
      if (weatherType == 'Clouds') {
        return <Image
        source={require('../assets/icons/clouds.png')}
        resizeMode={'contain'}
        style={{height: 50, width: 50}}
      />
      }
    if (weatherType == 'Mist'||'Smoke'||'Haze'||'Dust'||'Fog'||'Sand'||'Dust'||'Ash'||'Squall'||'Tornado') {
        return <Image
        source={require('../assets/icons/fog.png')}
        resizeMode={'contain'}
        style={{height: 50, width: 50}}
      />
      }
    
  };

const Icons = ({weatherType}) => {
  return (
        <WeatherIcon weatherType={weatherType}/> 
  )
}

export default Icons