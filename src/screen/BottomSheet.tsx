import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  Pressable,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ImagePath from '../utils/ImagePath';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const BottomSheet = () => {
  const y = useSharedValue(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Keyboard show/hide tracking
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Handle Android hardware back button
  useEffect(() => {
    const onBackPress = () => {
      if (isBottomSheetOpen) {
        closeBottomSheet();
        return true; // Prevent going back
      }
      return false; // Allow default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );
    return () => backHandler.remove();
  }, [isBottomSheetOpen]);

  const closeBottomSheet = () => {
    y.value = withSpring(0);
    Keyboard.dismiss();
    setIsBottomSheetOpen(false);
  };

  const clickOnBtn = () => {
    y.value = withSpring(-SCREEN_HEIGHT * 0.8);
    setIsBottomSheetOpen(true);
  };

  const animatedBottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
  }));

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      y.value = e.absoluteY - SCREEN_HEIGHT;
    })
    .onEnd(e => {
      if (Math.abs(y.value) < 200 || e.velocityY > 700) {
        runOnJS(closeBottomSheet)();
      } else {
        y.value = withSpring(-SCREEN_HEIGHT * 0.8);
      }
    });

  const inputRefs = useRef(
    Array.from({ length: 5 }, () => ({
      firstNameRef: React.createRef<TextInput>(),
      lastNameRef: React.createRef<TextInput>(),
    })),
  ).current;

  return (
    <>
      <Pressable
        // style={styles.fullScreenPressable}
        style={{ ...StyleSheet.absoluteFillObject }}
        onPress={() => {
          if (keyboardVisible) {
            Keyboard.dismiss();
          } else {
            closeBottomSheet();
          }
        }}
      />
      <View style={styles.container} pointerEvents="box-none">
        <TouchableOpacity style={styles.toBtn} onPress={clickOnBtn}>
          <Text style={styles.lblBtnName}>BottomSheet</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.bottomSheet, animatedBottomSheetStyle]}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={180}
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
          <GestureDetector gesture={panGesture}>
            <View>
              <View style={styles.vwBottomSheetHandler} />
            </View>
          </GestureDetector>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.heading}>Bottom Sheet</Text>

            {inputRefs.map((refSet, index) => (
              <React.Fragment key={index}>
                <TextInput
                  ref={refSet.firstNameRef}
                  placeholder="Enter First Name"
                  style={styles.input}
                  placeholderTextColor="#999"
                  returnKeyType="next"
                  onSubmitEditing={() => refSet.lastNameRef.current?.focus()}
                  blurOnSubmit={false}
                />
                <TextInput
                  ref={refSet.lastNameRef}
                  placeholder="Enter Last Name"
                  style={styles.input}
                  placeholderTextColor="#999"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    const next = inputRefs[index + 1];
                    if (next) next.firstNameRef.current?.focus();
                  }}
                  blurOnSubmit={false}
                />
              </React.Fragment>
            ))}

            <Image
              source={ImagePath.image1}
              style={{ height: 700, width: 300, alignSelf: 'center' }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  // fullScreenPressable: {
  //   flex: 1,
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  toBtn: {
    marginHorizontal: 20,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lblBtnName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000aa',
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    width: '100%',
    bottom: -SCREEN_HEIGHT,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
  },
  vwBottomSheetHandler: {
    height: 10,
    width: 100,
    backgroundColor: '#000000aa',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: SCREEN_HEIGHT * 0.2 + 20,
  },
});

export default BottomSheet;
