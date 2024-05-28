import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { COLORS } from "../../../constants";

const circleContainerSize = 50;

const Circle = (props) => {
    const circleContainerStyle = useAnimatedStyle(() => {
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
        top: -circleContainerSize / 2,
        width: circleContainerSize,
        borderRadius: circleContainerSize,
        height: circleContainerSize,
        backgroundColor: COLORS.orange,
        // borderWidth: 2,
        // borderColor: COLORS.lightWhite,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.lightWhite,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
    },
});