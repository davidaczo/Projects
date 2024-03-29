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
import LottieView from 'lottie-react-native';

const SlidableButton = ({ id, handleSlideEnd }) => {
    const animationRef = useRef(null);
    const animationSpeed = useSharedValue(0);

    const containerWidth = Dimensions.get('window').width - 32;
    const dotSize = 45;
    const threshold = 0.70 * containerWidth;
    const [isAnimated, seIsAnimated] = useState(false);
    const translateX = useSharedValue(0);
    const isCompleted = useSharedValue(false);
    const hideText = useSharedValue(false);
    const checkMarkOpacity = useSharedValue(0);
    const arrowOpacity = useSharedValue(1);
    const textOpacity = useSharedValue(1);
    const playAnim = () => {
        if (!isAnimated) {
            animationRef.current.play();
            seIsAnimated(true)
        } else {
            animationRef.current.play(60, 0);
            seIsAnimated(false)
        }
    };
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
                if (!isAnimated) {
                    runOnJS(playAnim)();
                }
            } else {
                checkMarkOpacity.value = 0
                if (isAnimated) {
                    runOnJS(playAnim)()
                }
            }

            if (hideText.value) {
                textOpacity.value = 0;
            }
            try {

                // runOnJS(playAnim)(newSpeed, newSpeed + 1);
            } catch (error) {
                console.error("Error in gesture handler:", error);

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
                            }, 200)
                        }
                    }}>
                        <Animated.View style={[styles.rectangle, animatedStyle]}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <LottieView
                                    ref={animationRef}
                                    // progress={animationProgress.value}
                                    source={require('../../../assets/animation4.json')}
                                    autoPlay={false}
                                    loop={false}
                                    speed={2}
                                    style={{ height: 30, width: 40 }}
                                />
                                {/* <Animated.View
                                    style={[{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute'
                                    }, checkMarkAnimatedStyle]}
                                >
                                    <Icon name="check" size={30} color={COLORS.orange} />
                                </Animated.View> */}

                                {/* <Animated.View
                                    style={{
                                        opacity: arrowOpacity,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'absolute'
                                    }}
                                >
                                    <RadioButtonRN
                                        data={[""]}
                                        deactiveColor={COLORS.red}
                                        textColor={COLORS.textBlack}
                                        animationTypes={["rotate"]}
                                        box={false}
                                        icon={
                                            <Icon
                                                name="check"
                                                size={25}
                                                color={COLORS.orange}
                                            />}
                                    />
                                </Animated.View> */}
                            </TouchableOpacity>
                        </Animated.View>
                    </PanGestureHandler>
                    <Animated.View style={acceptTextAnimatedStyle}>
                        <Text style={styles.buttonText}>
                            Ready to deliver!
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
        marginBottom: 6
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
    },
    acceptTextContainer: {
        padding: 4,
        justifyContent: 'space-between'
    }
});

export default SlidableButton;  
