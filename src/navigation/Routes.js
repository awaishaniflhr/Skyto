import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';


const Routes = () => {
  return (
    <SafeAreaProvider>
      <AppStack />
    </SafeAreaProvider>
  );
};

export default Routes;
