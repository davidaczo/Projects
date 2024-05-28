import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTab from '../../components/common/footer/CustomBottomTab';
import Home from '../(tabs)/home/index';
import OrdersPage from '../(tabs)/orders/_layout';
import { COLORS } from '../../constants';
import StoreFrontPage from './storefront';
import { useEffect, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import DetailedOrderPage from '../../components/orderPage/detailedModal/DetailedOrderPage';
import { ActivityIndicator, View } from 'react-native';
import ProductDetailsEdit from '../../components/productPage/detailsEdit/ProductDetailsEdit';
import { productStore } from '../../mobx/productStore';
import { observer } from 'mobx-react';
import { authStore } from '../../mobx/authStore';
import LoginPage from '../../components/loginPage/loginPage';
import { Switch } from 'react-native-switch';

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

const ProductsStack = observer(() => {
  let { status } = productStore.selectedProduct || {};
  const [isProductActive, setIsProductAvtive] = useState(status == 'active');

  const handleStatusCHange = async () => {
    await productStore.changeProductStatus(productStore.selectedProduct.id, 1, "active")
  }

  useEffect(() => {
    status = productStore.selectedProduct?.status;
    setIsProductAvtive(status === 'active');

  }, [status, productStore.selectedProduct]);



  return (
    <Stack.Navigator
      screenOptions={{
        ...transitionConfig(),
        headerShown: false,
      }}>
      <Stack.Screen
        name="Products"
        component={Home}
        options={{ title: 'Products' }}
      />
      <Stack.Screen
        name="EditProduct"
        component={ProductDetailsEdit}
        options={({ route }) => ({
          title: route.params?.title ?? 'Edit Product',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTintColor: COLORS.green,
          headerShadowVisible: true,
          headerStyle: { borderBottomWidth: 0 },
          headerRight: () => (
            <View style={{ padding: 8, paddingTop: 12 }}>
              <Switch
                value={productStore.isProductActive}
                onValueChange={async () => {
                  if (productStore.isProductActive) {
                    productStore.setDisableAlertActive()

                  }
                  await handleStatusCHange();
                }
                }
                disabled={false}
                activeText={''}
                inActiveText={''}
                circleSize={15}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={COLORS.green}
                backgroundInactive={COLORS.secondaryTextGray}
                circleActiveColor={COLORS.white}
                circleInActiveColor={COLORS.white}
                switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
              />
            </View>
          )
        })}
        initialParams={{ id: null, title: 'Name' }}
      />
    </Stack.Navigator>
  )
});


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
        options={({ route }) => ({
          title: route.params?.title ?? 'Edit Product', headerStyle: { borderWidth: 0 },
          headerTintColor: route.params?.statusColor ?? COLORS.green,
        })}
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
      headerShown: false,
    }}>
    <Stack.Screen
      name="StoreFront"
      component={StoreFrontPage}
      options={{ title: 'Store' }}
    />
  </Stack.Navigator>
);

const colorChange = async () => {
  await NavigationBar.setBackgroundColorAsync('#f2f2f2')
  await NavigationBar.setButtonStyleAsync("dark")
}

const fetchCredentials = async () => {
  await authStore.fetchCredentials()
}

const BottomTabs = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    colorChange();
    async function fetchData() {
      await authStore.fetchCredentials()
    }
    fetchData();
    // fetchCredentials();
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [])
  if (isLoading) {
    return <ActivityIndicator style={{
      flex: 1
    }} size="large" color="#eb6e34" />;

  }

  if (authStore.isLoggedIn === false) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginPage}
        />
      </Stack.Navigator>)
  };
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} style={{ elevation: 5, }} tabBar={props =>
      <CustomBottomTab style={{ elevation: 5 }}  {...props} />
    } backBehavior='history'>
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
});

export default BottomTabs;
