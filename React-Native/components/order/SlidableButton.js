import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
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
import { COLORS } from '../../constants';
import OrdersStore from '../../mobx/ordersStore';

const SlidableButton = () => {
    // const { updateOrder } = OrdersStore;
    // console.log(OrdersStore.updateOrder)
    const containerWidth = Dimensions.get('window').width - 32; // Adjust as needed
    const containerHeight = 50;
    const dotSize = 45;
    const threshold = 0.40 * containerWidth;

    const translateX = useSharedValue(0);
    const isCompleted = useSharedValue(false);
    const hideText = useSharedValue(false);
    const checkMarkOpacity = useSharedValue(0); // Default opacity for the icon
    const arrowOpacity = useSharedValue(1);
    const textOpacity = useSharedValue(1);
    const [trigger, setTrigger] = useState(false);
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value;
        },
        onActive: (event, context) => {
            const newX = context.startX + event.translationX;

            // Check boundaries to prevent the dot from moving outside the container
            translateX.value = newX < 0 ? 0 : newX > containerWidth - 2 * dotSize - 12 ? containerWidth - 2 * dotSize - 12 : newX;

            // Update completion flag
            isCompleted.value = translateX.value >= threshold;

            hideText.value = translateX.value >= threshold + 50;

            checkMarkOpacity.value = Math.min(1, (translateX.value - (containerWidth - 2 * dotSize - 12) / 2) / ((containerWidth - 2 * dotSize - 12) / 2) * 0.5);
            arrowOpacity.value = Math.max(0, 1 - (translateX.value - (containerWidth - 2 * dotSize - 12) / 2) / ((containerWidth - 2 * dotSize - 12) / 2));
            textOpacity.value = Math.max(0, 1 - (translateX.value - (containerWidth - 2 * dotSize - 12) / 2) / ((containerWidth - 2 * dotSize - 12) / 2));
            if (hideText.value) {
                textOpacity.value = 0;
            }
        },
        onEnd: (_, context) => {
            console.log(isCompleted.value)
            if (isCompleted.value) {
                translateX.value = withTiming(containerWidth - 2 * dotSize - 12, { duration: 200 });
                checkMarkOpacity.value = withTiming(1, { duration: 200 });
                arrowOpacity.value = withTiming(0, { duration: 200 });
                textOpacity.value = withTiming(0, { duration: 200 });
                console.log("Hello")
                // setTrigger(!trigger)
                // setTimeout(updateOrderOnMainThread, 0);
                runOnJS(() => {
                    console.log("HELLOOO")
                    setTrigger(!trigger)
                })()
                // runOnUIThread(() => {
                //     console.log("HASAS")
                //     setTrigger(!trigger)
                // })()

                // console.log
            } else {
                // If not completed, animate back to the start position
                translateX.value = withTiming(0, { duration: 200 });
                checkMarkOpacity.value = withTiming(0, { duration: 200 });
                arrowOpacity.value = withTiming(1, { duration: 200 });
                textOpacity.value = withTiming(1, { duration: 200 });
            }
        },
    });

    useEffect(() => {
        console.log("trigger changed")
    }, [trigger, isCompleted, hideText.value])

    const animatedStyle = useAnimatedStyle(() => {

        const bgColor = interpolateColor(
            translateX.value,
            [0, containerWidth - 2 * dotSize],
            [COLORS.white, COLORS.white]
        );
        return {
            transform: [{ translateX: translateX.value }],
            backgroundColor: bgColor,
        };
    });
    const acceptTextAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <View style={[styles.button]}>
                    <PanGestureHandler onGestureEvent={gestureHandler}>
                        <Animated.View style={[styles.rectangle, animatedStyle]}>
                            <Animated.View
                                style={{
                                    opacity: checkMarkOpacity,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute'
                                }}
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
                        </Animated.View>
                    </PanGestureHandler>
                    {/* <View style={styles.acceptTextContainer}> */}
                    <Animated.View style={acceptTextAnimatedStyle}>
                        <Text style={styles.buttonText}>
                            Swipe to accept!
                        </Text>
                    </Animated.View>
                    {/* </View> */}
                    <View style={{ width: dotSize }}></View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    buttonContainer: {
        width: 300,
        height: 50,
        overflow: 'hidden',
    },
    button: {
        width: '100%',
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
    },
    acceptTextContainer: {
        padding: 4,
        justifyContent: 'space-between'
    }
});

export default SlidableButton;  
