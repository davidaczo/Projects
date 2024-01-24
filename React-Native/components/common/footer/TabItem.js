import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import { getPathXCenterByIndex } from '../../../utils/Path';
import usePath from '../../../utils/usePaths';
import { COLORS, SCREEN_WIDTH } from '../../../constants/theme';
import OrdersStore from '../../../mobx/ordersStore'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const ICON_SIZE = 25;
const DOT_SIZE = 8; // Size of the red dot
const LABEL_WIDTH = SCREEN_WIDTH / 3;
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);



const TabItem = ({
  label,
  icon,
  index,
  activeIndex,
  onTabPress,
}) => {
  const { isUnproccedOrder } = OrdersStore;

  const { curvedPaths } = usePath();
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -35 : 12;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 },
      ],
    };
  });

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 36;
    return {
      transform: [
        // { translateY: withTiming(translateY) },
        // { translateX: labelPosition - LABEL_WIDTH / 2 },
      ],
    };
  });

  const iconColor = useSharedValue(
    activeIndex === index + 1 ? 'white' : COLORS.textGray,
  );

  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming('white');
    } else {
      iconColor.value = withTiming(COLORS.textGray);
    }
  }, [activeIndex]);

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value,
  }))

  return (
    <>
      <Animated.View style={[tabStyle]}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}>
          <AnimatedIcon
            name={icon}
            size={25}
            animatedProps={animatedIconProps}
          />
        </Pressable>
        {icon == "list" && index + 1 != activeIndex && isUnproccedOrder ? <View style={styles.dotStyle}></View> : null}
      </Animated.View>
      <Animated.View style={[{ left: labelPosition - LABEL_WIDTH / 2 }, styles.labelContainer]}>
        <Text style={[styles.label, { color: activeIndex === index + 1 ? COLORS.orange : COLORS.textGray, fontWeight: activeIndex === index + 1 ? "600" : "400" }]}>{label}</Text>
      </Animated.View>
    </>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH,
    top: 36,
  },
  label: {
    color: COLORS.textGray,
    fontSize: 12,
  },
  dotStyle: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'red',
  }
});
