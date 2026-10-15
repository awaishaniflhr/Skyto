import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import Icons from '../utils/icons';
const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

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

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Icons weatherType={forecastItem.weather[0].main}/>
            <Text  style={styles.temp}>Night - {forecastItem.temp.night}&#176;C</Text>
            <Text  style={styles.temp}>Day - {forecastItem.temp.day}&#176;C</Text>

        </View>
    )
}

export default FutureForecast


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
        paddingHorizontal:10,
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
        paddingVertical:5
    },
    infoBar: {
        width: 5,
        borderRadius:2,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent:'flex-end'
      },
})