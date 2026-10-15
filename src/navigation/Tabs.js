import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Home from '../Tabs/Home';
import Forcast from '../Tabs/Forcast';
import Preciption from '../Tabs/Preciption';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({onPress}) => (
  <ImageBackground
    resizeMode="cover"
    source={require('../assets/tabbghome.png')}
    style={{
      width: 220,
      height: 105,
      alignItems: 'center',
      paddingTop: 6,
      position: 'absolute',
      left: 85,
      zIndex: 1,
      // bottom:0,
    }}>
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 35,
        // backgroundColor: '#48319D',
      }}
      onPress={onPress}>
      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 35,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/home2.png')}
          resizeMode="contain"
          style={{
            height: 35,
            width: 35,
            tintColor: '#48319D',
          }}
        />
      </View>
    </TouchableOpacity>
  </ImageBackground>
);
const CustomTabBarButton2 = ({onPress}) => (
  <ImageBackground
    resizeMode="cover"
    source={require('../assets/bottontabback1.png')}
    style={{
      width: 160,
      height: 100,
      justifyContent: 'center',
      tintColor: 'white',
    }}>
    <TouchableOpacity
      style={{width: 80, height: 50, marginLeft: 25}}
      onPress={onPress}>
      <Image
        source={require('../assets/location.png')}
        resizeMode="contain"
        style={{
          height: 25,
          width: 25,
          tintColor: '#fff',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
    </TouchableOpacity>
  </ImageBackground>
);
const CustomTabBarButton3 = ({onPress}) => (
  <ImageBackground
    resizeMode="cover"
    source={require('../assets/bottontabback2.png')}
    style={{
      width: 160,
      height: 100,
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
    }}>
    <TouchableOpacity
      style={{width: 80, height: 50, marginLeft: 60}}
      onPress={onPress}>
      <Image
        source={require('../assets/menu.png')}
        resizeMode="contain"
        style={{
          height: 25,
          width: 25,
          tintColor: '#fff',
          alignSelf: 'center',
          marginTop: 15,
        }}
      />
    </TouchableOpacity>
  </ImageBackground>
);
const Tabs = () => {
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        showLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          height: '11%',
          alignSelf: 'center',
          position: 'absolute',
          borderColor: 'transparent',
          bottom: keyboard ? -100 : 0,
        },
        tabBarComponent: props => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                top: 10,
              }}></View>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center'}}></View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Forecast"
        component={Forcast}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
          ),
          tabBarButton: props => <CustomTabBarButton2 {...props} />,
        }}
      />

      <Tab.Screen
        name="Precipition"
        component={Preciption}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}></View>
          ),
          tabBarButton: props => <CustomTabBarButton3 {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});

export default Tabs;
