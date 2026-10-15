import React from 'react'
import {View, Text, Image, StyleSheet,Dimensions} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icons from '../../utils/icons';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment-timezone'
const HourNext = ({data}) => {
    return (
        <View style={{alignItems:'center',justifyContent:'center'}}>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
          
            

        </View>
    )
}
export const momentHourOnly = (dt) => {
    return moment.unix(dt).format('hA')
  }
  export const getWeatherIcon = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}.png`
}
const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+".png"}
    return (
      <View 
      style={{
        width:Dimensions.get('screen').width-20,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.2)',
        margin: 10,
        borderColor:'#fff',
        borderWidth:1,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <View style={{width:'20%',alignItems: 'center',justifyContent:'center',height:40,width:40,borderRadius:20,borderColor:'white',borderWidth:1}}>
          <Text style={{color: '#fff',fontSize:10}}>{momentHourOnly(forecastItem.dt)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <Icons weatherType={forecastItem.weather[0].main}/>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
          <Fontisto name="blood-drop" size={15} color={'#024B86'} />
          <Text style={{color: 'white',marginLeft:5}}>{Math.round(forecastItem.humidity)}%</Text>
        </View>
        {/* <Text style={{color: 'white'}}>{data.dew_point}%</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <FontAwesome5 name='temperature-high' color={'red'} size={15}/>
        <Text style={{color: 'white',marginLeft:5}}>{Math.round(forecastItem.temp)}°</Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',width:'20%'
          }}>
        <Text style={styles.temp}>{forecastItem && forecastItem.weather[0].main}</Text>
</View> */}
              </View>
    )
}

export default HourNext


const styles = StyleSheet.create({
    image: {
        width: 50,
        height:50,
        alignSelf:'center'
    }, 
    futureForecastItemContainer: {
      backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        borderWidth:1,
        marginLeft: 10,
        height:300,
        padding:10
    }, 
    day: {
        fontSize: 20,
        color:"white",
      borderColor:'#fff',
      borderWidth:1,
        textAlign:"center",
      borderRadius:10,
      padding:10
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center",
        marginLeft:10,
        padding:10,
        color:'white',
        textTransform:'capitalize'
    },
})