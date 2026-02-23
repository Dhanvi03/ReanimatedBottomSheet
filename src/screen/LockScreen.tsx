import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ImagePath from '../utils/ImagePath';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const LockScreen = () => {
  const y = useSharedValue(SCREEN_HEIGHT);
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      console.log('onUpdate', e.absoluteY);

      y.value = e.absoluteY;
    })
    .onEnd(e => {
     
    //   if (e.velocityY > 500) {
    //     y.value = withTiming(SCREEN_HEIGHT, { easing: Easing.linear });
    //   }else 
      if (y.value < SCREEN_HEIGHT / 2 || e.velocityY < -500) {
        y.value = withTiming(0, { easing: Easing.linear });
      } else {
        y.value = withTiming(SCREEN_HEIGHT, { easing: Easing.linear });
      }
    });
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(y.value - SCREEN_HEIGHT, {
          duration: 100,
          easing: Easing.linear,
        }),
      },
    ],
  }));
  const lockPanGesture = Gesture.Pan()
    .onUpdate(e => {
      y.value = e.translationY;
    })
    .onEnd(e => {
      console.log('onEnd', e.velocityY);

      if (Math.abs(y.value) > SCREEN_HEIGHT / 2 || e.velocityY < -500) {
        y.value = withTiming(0, { easing: Easing.linear });
      } else {
        y.value = withTiming(-SCREEN_HEIGHT, { easing: Easing.linear });
      }
    });
  return (
    <>
      <ImageBackground
        source={ImagePath.image2}
        style={{ height: '100%', width: '100%', flex: 1, position: 'absolute' }}
      ></ImageBackground>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Image
          source={ImagePath.image1}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            flex: 1,
          }}
        />
        <GestureDetector gesture={panGesture}>
          <Animated.View style={styles.bottomGesture}></Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  bottomGesture: {
    position: 'absolute',
    bottom: 0,
    height: 300,
    // backgroundColor: 'red',
    width: '100%',
    transform: [
      {
        translateY: 200,
      },
    ],
  },
});
export default LockScreen;
