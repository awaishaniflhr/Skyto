import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Tabs/Home';
import Forcast from '../Tabs/Forcast';
import Preciption from '../Tabs/Preciption';

const Tab = createBottomTabNavigator();

const TabBarBackground = () => {
  const { width: screenWidth } = useWindowDimensions();
  const homeArtworkWidth = Math.min(screenWidth, 280);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/bottontabback1.png')}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: screenWidth / 2,
          height: 100,
        }}
      />
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/bottontabback2.png')}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: screenWidth / 2,
          height: 100,
        }}
      />
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/tabbghome.png')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: (screenWidth - homeArtworkWidth) / 2,
          width: homeArtworkWidth,
          height: 105,
        }}
      />
    </View>
  );
};

const CustomTabBarButton = ({
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityState,
  testID,
  style,
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel || 'Home'}
    accessibilityState={accessibilityState}
    testID={testID}
    onLongPress={onLongPress}
    onPress={onPress}
    activeOpacity={0.85}
    style={[
      style,
      {
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: -10 }],
      },
    ]}>
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
        style={{ height: 35, width: 35, tintColor: '#48319D' }}
      />
    </View>
  </TouchableOpacity>
);

const CustomTabBarButton2 = ({
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityState,
  testID,
  style,
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel || 'Forecast'}
    accessibilityState={accessibilityState}
    testID={testID}
    onLongPress={onLongPress}
    onPress={onPress}
    style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
    <Image
      source={require('../assets/location.png')}
      resizeMode="contain"
      style={{ height: 25, width: 25, tintColor: '#fff' }}
    />
  </TouchableOpacity>
);

const CustomTabBarButton3 = ({
  onPress,
  onLongPress,
  accessibilityLabel,
  accessibilityState,
  testID,
  style,
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel || 'Precipitation'}
    accessibilityState={accessibilityState}
    testID={testID}
    onLongPress={onLongPress}
    onPress={onPress}
    style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
    <Image
      source={require('../assets/menu.png')}
      resizeMode="contain"
      style={{ height: 25, width: 25, tintColor: '#fff' }}
    />
  </TouchableOpacity>
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
        tabBarBackground: () => <TabBarBackground />,
      }}>
      <Tab.Screen
        name="Forecast"
        component={Forcast}
        options={{
          tabBarIcon: ({ focused }) => (
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
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: 'center', justifyContent: 'center' }}></View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Precipition"
        component={Preciption}
        options={{
          tabBarIcon: ({ focused }) => (
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

export default Tabs;
