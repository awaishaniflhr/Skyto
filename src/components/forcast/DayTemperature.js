import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icons from '../../utils/icons'
import moment from 'moment-timezone'
const DayTemperature = ({data}) => {
    return (
        <View style={{flexDirection: 'row',marginRight:20}}>

            {
                data && data.length >= 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
          
            

        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+".png"}
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Icons weatherType={forecastItem.weather[0].main}/>
            <View style={{flexDirection:'row',padding:10}}>
          <FontAwesome5 name='temperature-high' color={'yellow'} size={20}/>
          <Text style={styles.temp}>{Math.round(forecastItem.temp.max)}°</Text>
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <View style={styles.infoBar}>
                        <View
                          style={{
                            height: forecastItem.temp.max,
                            width:5,
                            borderRadius:2,
                            backgroundColor: 'red',
                            alignItems:'flex-end'
                          }}
                        />
                      </View>
                      </View>
          <View style={{flexDirection:'row',padding:10}}>
          <FontAwesome5 name='temperature-low' color={'yellow'} size={20}/>
          <Text style={styles.temp}>{Math.round(forecastItem.temp.min)}°</Text>
          </View>
        </View>
    )
}

export default DayTemperature


const styles = StyleSheet.create({
    image: {
        width: 50,
        height:50,
        alignSelf:'center'
    }, 
    futureForecastItemContainer: {
        justifyContent: 'center',
        backgroundColor: '#00000033',
        borderRadius:10,
        borderColor:"#eee",
        alignItems:'center',
        borderWidth:1,
        marginHorizontal:10
    }, 
    day: {
        fontSize: 20,
        color: 'white',
        padding: 5,
        borderRadius:5,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        textAlign: 'center',
        margin:5
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontWeight:"100",
        textAlign:"center",
        marginLeft:10,
    },
    infoBar: {
        width: 5,
        borderRadius:2,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent:'flex-end'
      },
})