import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const LoadingSkeleton = ({ containerStyle, children }) => {
    const animatedValue = new Animated.Value(0);

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: false,
            })
        ).start();
    }, [animatedValue, 1200]);

    const pulse = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 1, 0.5],
    });

    return (
        <View style={[styles.container, containerStyle]}>
            <Animated.View
                style={[styles.skeleton, {
                    height: '100%'
                    , opacity: pulse
                }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    skeleton: {
        backgroundColor: COLORS.gray, // Customize the color
        // height: 20, // Customize the height
        borderRadius: 5, // Customize the border radius
    },
});

export default LoadingSkeleton;