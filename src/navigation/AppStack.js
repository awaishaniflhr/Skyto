import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screen/SplashScreen';
import Tabs from './Tabs';
import AutoComplete from '../screen/AutoComplete';
import DayForecast from '../screen/DayForecast';
import Forcast from '../Tabs/Forcast';
import Preciption from '../Tabs/Preciption';
import HourlyForecast from '../screen/HourlyForecast';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'black'} />
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AutoComplete"
          component={AutoComplete}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DayForecast"
          component={DayForecast}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forcast"
          component={Forcast}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Preciption"
          component={Preciption}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HourlyForecast"
          component={HourlyForecast}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
