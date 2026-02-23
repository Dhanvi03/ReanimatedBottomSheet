import { View, Text } from 'react-native'
import React from 'react'
import RootStack from './src/screen/RootStack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView >
      <RootStack/>
    </GestureHandlerRootView>
  )
}

export default App