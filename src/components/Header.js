import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import moment from 'moment-timezone';
import {roundCelsius, momentHourOnly, getWeatherIcon} from '../utils/functions';
import {getTime} from 'date-fns';

const Header = ({navigation, text, time}) => {

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backBtn}>
        
      <Image
        resizeMode="contain"
        style={styles.backIcon}
        source={require('../assets/back.png')}
      />
      </TouchableOpacity>
      <View style={{alignItems:'center',width:'65%', flexDirection:'row',justifyContent:'center'}}>
      {time?<Text style={[styles.headerTitle, {marginLeft:'20%'}]}>{time}{'  '}-{'  '}</Text>:null}
      {time?null:<View style={{marginLeft:'12%'}}></View>}
      <Text style={[styles.headerTitle,{}]}>{text}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width:Dimensions.get('window').width,
    height:80,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems:'center',
    paddingTop:30,
    // justifyContent:'center'
  },
  backBtn:{
    width:50,
    height:50,
    // backgroundColor:'gray',
    alignItems:'center',
    justifyContent:'center'
    
  },
  backIcon:{
    width:25,
    height:25,
    marginLeft:10,
    tintColor:'#fff'
  },
  headerTitle:{
    fontSize:22,
    color:'#fff',
    // marginLeft:'12%',
  }
});
