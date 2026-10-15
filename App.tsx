import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/navigation/Routes';
import {Store, persistor} from './src/redux/store';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
  'ColorPropType will be removed from React Native',
  "exported from 'deprecated-react-native-prop-types'.",
  'ColorPropType will be removed from React Native. Migrate to ColorPropType exported from deprecated-react-native-prop-types',
]);

function App() {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
