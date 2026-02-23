import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component, FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeCard from '../components/SwipeCard';
import { RootStackParamList, RootStackScreenProps } from '../../types';

const MainScreen:FC<RootStackScreenProps<'MainScreen'>> = (props) => {
    const ScreenOptions: (keyof RootStackParamList)[]=[
           'CardScreen',
           'LockScreen',
           'BottomSheet'
    ]
    const clickOnOption=(name:keyof RootStackParamList)=>{
        props.navigation.navigate(name)
    }
  return (
    <View>
      {
        ScreenOptions.map((item,index)=>{
            return(
                <TouchableOpacity onPress={()=>clickOnOption(item)} style={styles.toOption} key={index+1}>
                    <Text style={styles.txtOption}>{item}</Text>
                </TouchableOpacity>
            )
        })
      }
    </View>
  )
}
const styles=StyleSheet.create({
    toOption:{
        height:60,
        marginHorizontal:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        backgroundColor:'orange'
    },
    txtOption:{
        color:'white',
        fontSize:20,
        fontWeight:'bold'
    }
})

export default MainScreen