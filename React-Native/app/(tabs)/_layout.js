import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTab from '../../components/common/footer/CustomBottomTab';
import Home from '../(tabs)/home/index';
import OrdersPage from '../(tabs)/orders/_layout';
import { COLORS } from '../../constants';
import StoreFrontPage from './storefront';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import DetailedOrderPage from '../../components/orderPage/detailedModal/DetailedOrderPage';
import { Animated, Easing } from 'react-native';
import ProductDetailsEdit from '../../components/productPage/ProductDetailsEdit';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const transitionConfig = () => {
  return {
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              translateX: next
                ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
                : 0,
            },
          ],
        },
      };
    },
  };
};
const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...transitionConfig(),
      headerShown: true,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
      },
      headerTintColor: COLORS.green,
      headerShadowVisible: true,
    }}>
    <Stack.Screen
      name="Products"
      component={Home}
      options={{ title: 'Products' }}
    />
    <Stack.Screen
      name="EditProduct"
      component={ProductDetailsEdit}
      options={{ title: 'Name', headerStyle: { borderBottomWidth: 0 } }}
      initialParams={{ id: null }}
    />
  </Stack.Navigator>
);

const OrdersStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        ...transitionConfig(),
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: COLORS.white,
          borderBottomWidth: 1,
        },
        headerTintColor: COLORS.green,
      }}>
      <Stack.Screen
        name="Orders"
        component={OrdersPage}
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name="DetailedOrder"
        component={DetailedOrderPage}
        options={{ title: 'Orders', headerStyle: { borderBottomWidth: 0 } }}
        initialParams={{ order: null }}
      />
      <Stack.Screen
        name="EditProduct"
        component={ProductDetailsEdit}
        options={{ title: 'Name' }}
        initialParams={{ selectedPVIndex: null }}

      />
    </Stack.Navigator>
  )
};

const StoreStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // You can hide the header for the Store tab
    }}>
    <Stack.Screen
      name="StoreFront"
      component={StoreFrontPage}
      options={{ title: 'Store' }}
    />
    {/* Add more screens as needed */}
  </Stack.Navigator>
);

const BottomTabs = () => {
  console.log("renderBottomTabS---------------")
  useEffect(() => {
    const colorChange = async () => {
      await NavigationBar.setBackgroundColorAsync('#f2f2f2')
      await NavigationBar.setButtonStyleAsync("dark")
    }
    colorChange()
  }, [])

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} style={{ elevation: 5, }} tabBar={props => <CustomBottomTab style={{ elevation: 5 }}  {...props} />} backBehavior='history'>
      <Tab.Screen
        options={{ tabBarLabel: 'Products' }}
        name="ProductsStack"
        component={ProductsStack}
      />
      <Tab.Screen
        options={{ tabBarLabel: 'Orders' }}
        name="OrdersStack"
        component={OrdersStack}
      />
      <Tab.Screen
        options={{ tabBarLabel: 'Store', headerShown: false }}
        name="StoreStack"
        component={StoreStack}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
