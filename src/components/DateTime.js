import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet,Image, Dimensions} from 'react-native';
import moment from 'moment-timezone'
import Geocoder from 'react-native-geocoding';

import { CardOne } from 'react-native-card-ui';
import { Long } from '../screen/AutoComplete';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var latitude='';
var longitude=''
const WeatherItem = ({title, value, unit,img}) => {
    return(
        <View style={styles.weatherItem}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {/* <Image resizeMode='contain' source={img} style={{height:30,width:30,marginRight:10}}/> */}
            <Text style={styles.weatherItemTitle}>{title}</Text>
            </View>
            <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
        </View>
    )
}
Geocoder.init("AIzaSyCRQbuzB7296abvanXJON4x7_PcoR_MKLo");
const DateTime = ({current, lat, lon, timezone,img}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [name, setName] = useState('')

    const [loading, setLoading] = useState(false);
    useEffect (() => {
        setLoading(true);
latitude=lat;
longitude=lon;
        Geocoder.from(lat,lon)
		.then(json => {
		var addressComponent = json.results[0].address_components[2];
			console.log(addressComponent);
setName(addressComponent.short_name);
		})
		.catch(error => console.warn(error));
        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
            const minutes = time.getMinutes();
            const ampm = hour >=12 ? 'pm' : 'am'
        
            setTime((hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes) +ampm) 
        
            setDate(days[day] + ', ' + date+ ' ' + months[month]) 
            setLoading(false);
        }, 1000);
    }, [lat,Long])
    return (
        <>
        <View style={styles.container}>  
           <View>
               <View>
                   <Text style={styles.heading}>{time}</Text>
               </View>
               <View>
                   <Text style={styles.subheading}>{date}</Text>
               </View>

               
           </View>
           <View style={styles.rightAlign}>
           <Text style={styles.subheading}>{name}</Text>

               <Text style={styles.timezone}>{timezone}</Text>
               <Text style={styles.latlong}>{lat}N {lon}E</Text>
           </View>
        </View>
        {/* <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Humidity" value={current? current.humidity : ""} unit="%"/>
                    <WeatherItem title="Pressure" value={current? current.pressure : ""} unit="hPA"/>
                    <WeatherItem img={require('../assets/icons/sunrise.png')} title="Sunrise" value={current? moment.tz(current.sunrise * 1000, timezone ).format('HH:mm'): ""} unit="am"/>
                    <WeatherItem img={require('../assets/icons/sunset1.png')} title="Sunset" value={current? moment.tz(current.sunset * 1000, timezone ).format('HH:mm') : ""} unit="pm"/>
               </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"row",
        justifyContent:'space-around',
        padding: 15
    },
    heading: {
        fontSize: 45,
        color:'white',
        fontWeight: '100'
    },
    subheading: {
        fontSize: 20,
        color: '#eee',
        fontWeight: '300'
    },
    rightAlign: {
        textAlign:'right',
        marginTop: 20
    },
    timezone: {
        fontSize: 12,
        color:'white',
        fontWeight: '300'
    },
    latlong:{
        fontSize:12,
        color:'white',
        fontWeight: '300'
    },
    weatherItemContainer: {
        alignSelf:'center',
        width:Dimensions.get('screen').width-20,
        backgroundColor: '#00000033',
        borderWidth:1,
    borderColor:'#fff',
        padding:10,
        borderRadius:10,
        marginBottom:10
    }, 
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:5
    },
    weatherItemTitle: {
        color:'#eee',
        fontSize: 14,
        fontWeight: '100'
    }
})

export default DateTime


export function setLatitude(){
    // console.log(Currentlocation,'gl')
    return latitude;
  }
  export function setLongitude(){
    // console.log(Currentlocation,'gl')
    return longitude;
  }