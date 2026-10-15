import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const Header2 = ({navigation, text}) => {

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.backBtn}> 
      <Image
        resizeMode="contain"
        style={styles.backIcon}
        source={require('../assets/back.png')}
      />
      </TouchableOpacity >
      <Text style={styles.headerTitle}>{text}</Text>
    </View>
  );
};

export default Header2;

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
    marginLeft:'26%',
  }
});
