import React, { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  ColorSpace,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';
import { COLORS, SCREEN_WIDTH } from '../../../constants/theme';
import usePath from '../../../utils/usePaths';
import { getPathXCenter } from '../../../utils/Path';
import TabItem from './TabItem';
import AnimatedCircle from './AnimatedCircle';
import { CommonActions } from '@react-navigation/native';
import OrdersStore from '../../../mobx/ordersStore'
import { Shadow } from 'react-native-shadow-2';
const AnimatedPath = Animated.createAnimatedComponent(Path);
export const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}) => {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  console.log("state", state)
  const { containerPath, curvedPaths, tHeight } = usePath();
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };
  const selectIcon = (routeName) => {
    switch (routeName) {
      case 'ProductsStack':
        return 'flower-tulip-outline';
      case 'OrdersStack':
        return 'text-box-multiple-outline';
      case 'StoreStack':
        return 'storefront-outline';
    }
  };
  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths,
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`,
    };
  });
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardActive(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardActive(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    progress.value = withTiming(navigation.getState().index + 1);
  }, [navigation.getState().index])

  const handleTabPress = (index, tab) => {
    console.log("index", index, tab)
    navigation.navigate(tab);

    progress.value = withTiming(index);
  };

  return (
    <View style={[styles.tabBarContainer, { bottom: isKeyboardActive ? -100 : 0 }]}>
      <Shadow
        startColor={'rgba(128, 128, 128, 0.2)'}
        offset={[0, 5]}
        paintInside={true}
      >
        <Svg width={SCREEN_WIDTH} height={tHeight}>
          <AnimatedPath fill={'white'} animatedProps={animatedProps} />
        </Svg>
      </Shadow>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: tHeight,
          },
        ]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;
          return (
            <TabItem
              key={index.toString()}
              label={label}
              icon={selectIcon(route.name)}
              activeIndex={state.index + 1}
              index={index}
              onTabPress={() => handleTabPress(index + 1, route.name)}
            />
          );
        })}
      </View>
    </View >
  );
};
export default CustomBottomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 22,
      backgroundColor: 'red',
    },
    shadowColor: 'black',
    shadowOpacity: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  shadowContainer: {
    overflow: 'hidden'
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
  },
  shadowMd: {
    // shadowOffset: {
    //   width: 0,
    //   height: 50,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.0,
    // elevation: 24,
    // borderTopLeftRadius: 21,
    // borderTopRightRadius: 21,
    // backgroundColor: 'transparent',
  },
});
