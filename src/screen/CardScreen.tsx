import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ImagePath from '../utils/ImagePath'
import SwipeCard from '../components/SwipeCard'

const CardScreen = () => {
  const images=[ImagePath.image1,ImagePath.image2,ImagePath.image3]
  return (
    <View style={{backgroundColor:'#8E9295',flex:1,justifyContent:'center',alignItems:'center'}} >
     {
      images.map((source,index)=>{
        return(
          <SwipeCard source={source} index={index} key={source}/>
        )
      })
     }
    </View>
  )
}

export default CardScreen