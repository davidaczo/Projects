import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const circleContainerSize = 50;

const Circle = (props) => {
    circleContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX:  props.circleX.value - circleContainerSize / 2}],
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
        backgroundColor: '#9b9a4c',
        justifyContent: 'center',
        alignItems: 'center'
    },
});