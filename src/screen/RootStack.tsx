import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { NavigationContainer } from '@react-navigation/native';
import CardScreen from './CardScreen';
import MainScreen from './MainScreen';
import LockScreen from './LockScreen';
import BottomSheet from './BottomSheet';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name='MainScreen' component={MainScreen}/>
        <Stack.Screen name='LockScreen' component={LockScreen}/>
        <Stack.Screen name='BottomSheet' component={BottomSheet}/>
        <Stack.Screen name='CardScreen' component={CardScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack