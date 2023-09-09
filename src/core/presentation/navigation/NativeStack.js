import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import SavelocationsScreen from '../screens/SavelocationsScreen';
const Stack = createNativeStackNavigator();

const NativeStack = () => {
  return (
    <Stack.Navigator
     screenOptions={{
        headerShown: false,
      }}
    >
    <Stack.Screen name="MapScreen" component={MapScreen} />
    <Stack.Screen name="SavelocationsScreen" component={SavelocationsScreen} />
    
  </Stack.Navigator>
  )
}

export default NativeStack