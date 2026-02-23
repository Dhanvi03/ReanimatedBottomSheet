import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ImageSourcePropType } from "react-native"

export type RootStackParamList={
    CardScreen:undefined,
    LockScreen:undefined,
    MainScreen:undefined,
    BottomSheet:undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList>=NativeStackScreenProps<RootStackParamList,Screen>

export type SwipeCardProps={
    source:ImageSourcePropType,
    index:number
}