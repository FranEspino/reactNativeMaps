import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import MapScreen from './src/core/presentation/screens/MapScreen';
import {NavigationContainer} from '@react-navigation/native';
import NativeStack from './src/core/presentation/navigation/NativeStack';
import {colorSecondary} from './src/core/presentation/assets/colors';
import {Provider} from 'react-redux'
import { Store,persistor } from './src/core/presentation/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor} loading={<Text>Loanding ...</Text>}>


      <View style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} backgroundColor={colorSecondary} />
        <NavigationContainer>
          <NativeStack />
        </NavigationContainer>
      </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
