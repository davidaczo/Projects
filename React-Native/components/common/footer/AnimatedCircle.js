import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { COLORS } from "../../../constants";

const circleContainerSize = 50;

const Circle = (props) => {
    circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: props.circleX.value - circleContainerSize / 2 }],
        }
    }, [])
    return <Animated.View style={[circleContainerStyle, styles.container]} />

};

export default Circle;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -circleContainerSize / 1.1,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center'
    },
});