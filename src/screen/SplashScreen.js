import {View, Text, StyleSheet, Image, StatusBar,ImageBackground,Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';

//weather-icon-2
import Logo from '../assets/logo.png';
import CLogo from '../assets/Webevis-Logo(white).png';
export default function SplashScreen(props) {
  //
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      navigation.dispatch(StackActions.replace('MyTabs'));
    }, 3000);
  }, []);
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground  style={{ 
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        justifyContent:'space-between',alignItems:'center',
        backgroundColor:'#2E335A'}}>
      <View></View>

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>From</Text>
        <Image resizeMode='contain' source={CLogo} style={{height:80,width:160,marginBottom:80}} />
      </View>
      </ImageBackground>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent:'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
  text: {
    color: '#000',
  },
  bottomContainer: {},
  bottomText: {
    color: '#fff',
    alignSelf:'center'
  },
  bottomText1: {
    color: '#00FFC6',
    fontSize: 20,
    fontWeight:'bold',
    alignSelf:'center'
  },
});