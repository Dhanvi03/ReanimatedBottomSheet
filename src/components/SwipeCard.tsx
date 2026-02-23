import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { SwipeCardProps } from '../../types'
import Animated, {  useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const SwipeCard:FC<SwipeCardProps> = (props) => {
    const translateX = useSharedValue(0);
    const rotate = useSharedValue(0);
    const cardOpacity = useSharedValue(1);
  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: `${rotate.value}deg` },
    ],
    opacity: cardOpacity.value,
  }));
//   const panGesture = useAnimatedGestureHandler({
//     onActive: (event) => {
//       translateX.value = event.translationX;
//       rotate.value = event.translationX / 20;
//     },
//     onEnd: () => {
//       if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
//         translateX.value = withSpring(Math.sign(translateX.value) * SCREEN_WIDTH);
//         cardOpacity.value = withSpring(0);
//       } else {
//         translateX.value = withSpring(0);
//         rotate.value = withSpring(0);
//       }
//     },
//   });
  const panGesture=Gesture.Pan().onUpdate((e)=>{
    translateX.value=e.translationX
    rotate.value=e.translationX/20
  })
  .onEnd(()=>{
    if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        console.log('onEnd',Math.sign(translateX.value));
        
        translateX.value = withSpring(Math.sign(translateX.value) * SCREEN_WIDTH);
        cardOpacity.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
        rotate.value = withSpring(0);
      }
  })
  return (
    <GestureDetector gesture={panGesture}>

        <Animated.View style={[styles.card, cardStyle, { zIndex: 100 - props.index }]}>

      <Image source={props.source} style={styles.image} />
        </Animated.View>
    </GestureDetector>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      position: 'absolute',
      width: 300,
      height: 400,
      borderRadius: 20,
      backgroundColor: '#fff',
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 8,
    },
    image: {
      width: 300,
      height: 300,
    },
  })

export default SwipeCard