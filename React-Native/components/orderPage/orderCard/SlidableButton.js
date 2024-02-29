import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
    interpolateColor,
    useDerivedValue,
    useAnimatedReaction,
    runOnUIThread,
    runOnJS
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../constants';

const SlidableButton = ({ id, handleSlideEnd }) => {
    const containerWidth = Dimensions.get('window').width - 51;
    const dotSize = 45;
    const threshold = 0.63 * containerWidth;

    const translateX = useSharedValue(0);
    const isCompleted = useSharedValue(false);
    const hideText = useSharedValue(false);
    const checkMarkOpacity = useSharedValue(0);
    const arrowOpacity = useSharedValue(1);
    const textOpacity = useSharedValue(1);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            const newX = context.startX + event.translationX;
            translateX.value = newX < 0 ? 0 : newX > containerWidth - 35 ? containerWidth - 35 : newX;

            isCompleted.value = translateX.value >= threshold;

            hideText.value = translateX.value >= threshold - 10;

            arrowOpacity.value = Math.max(0, 1 - (translateX.value - (containerWidth - 70) / 2) / ((containerWidth - 70) / 2));
            textOpacity.value = Math.max(0, 1 - (translateX.value - (containerWidth - 70) / 2) / ((containerWidth - 70) / 2));

            if (isCompleted.value) {
                checkMarkOpacity.value = Math.min(1, (translateX.value - (containerWidth - 35) / 2) / ((containerWidth - 35) / 2));
            } else {
                checkMarkOpacity.value = 0
            }

            if (hideText.value) {
                textOpacity.value = 0;
            }

        },
        onEnd: () => {
            if (isCompleted.value) {
                translateX.value = withTiming(containerWidth - 35, { duration: 200 });
                checkMarkOpacity.value = withTiming(1, { duration: 200 });
                arrowOpacity.value = withTiming(0, { duration: 200 });
                textOpacity.value = withTiming(0, { duration: 200 });
            } else {
                translateX.value = withTiming(0, { duration: 200 });
                checkMarkOpacity.value = withTiming(0, { duration: 200 });
                arrowOpacity.value = withTiming(1, { duration: 200 });
                textOpacity.value = withTiming(1, { duration: 200 });
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        const bgColor = interpolateColor(
            translateX.value,
            [0, containerWidth],
            [COLORS.white, COLORS.white]
        );
        return {
            transform: [{ translateX: translateX.value },
            ],
            backgroundColor: bgColor,

        };
    });
    const acceptTextAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
        };
    });

    const checkMarkAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: checkMarkOpacity.value,
        };
    });

    useEffect(() => {
        translateX.value = 0;
        isCompleted.value = false;
        hideText.value = false;
        checkMarkOpacity.value = 0;
        arrowOpacity.value = 1;
        textOpacity.value = 1;

        return () => {
            translateX.value = 0;
            isCompleted.value = false;
            hideText.value = false;
            checkMarkOpacity.value = 0;
            arrowOpacity.value = 1;
            textOpacity.value = 1;
        };
    }, []);
    if (!isCompleted.value) {
        checkMarkOpacity.value = 0;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={[styles.button]}>
                    <PanGestureHandler onGestureEvent={gestureHandler} onEnded={() => {
                        if (isCompleted.value) {
                            setTimeout(() => {
                                handleSlideEnd(id.id)
                                translateX.value = 0;
                                isCompleted.value = false;
                                hideText.value = false;
                                checkMarkOpacity.value = 0;
                                arrowOpacity.value = 1;
                                textOpacity.value = 1;
                            }, 200)
                        }
                    }}>
                        <Animated.View style={[styles.rectangle, animatedStyle]}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Animated.View
                                    style={[{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute'
                                    }, checkMarkAnimatedStyle]}
                                >
                                    <Icon name="check" size={30} color={COLORS.orange} />
                                </Animated.View>

                                <Animated.View
                                    style={{
                                        opacity: arrowOpacity,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute'
                                    }}
                                >
                                    <Icon name="arrowright" size={30} color={COLORS.orange} />
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    </PanGestureHandler>
                    <Animated.View style={acceptTextAnimatedStyle}>
                        <Text style={styles.buttonText}>
                            Delivered!
                        </Text>
                    </Animated.View>
                    <View style={{ width: dotSize }}></View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 4
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        overflow: 'hidden',
    },
    button: {
        height: 50,
        backgroundColor: COLORS.orange,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rectangle: {
        marginLeft: 3,
        width: 45,
        height: 45,
        backgroundColor: 'green',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    acceptTextContainer: {
        padding: 4,
        justifyContent: 'space-between'
    }
});

export default SlidableButton;  
