import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './AppStack';


const Routes = () => {
  return (
    <SafeAreaProvider>
      <AppStack />
    </SafeAreaProvider>
  );
};

export default Routes;
