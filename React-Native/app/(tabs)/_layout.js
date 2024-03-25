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
import { Switch, View } from 'react-native';
import ProductDetailsEdit from '../../components/productPage/detailsEdit/ProductDetailsEdit';
import { productStore } from '../../mobx/productStore';
import { observer } from 'mobx-react';

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
                style={{ justifyContent: 'center', transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                value={productStore.isProductActive}
                trackColor={{ true: COLORS.orange, false: COLORS.borderGray }}
                thumbColor={COLORS.white}
                pressedColor={COLORS.orange}
                onValueChange={async () => {
                  if (productStore.isProductActive) {
                    productStore.setDisableAlertActive()

                  }
                  await handleStatusCHange();
                }
                }
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
        options={{ title: 'Orders', headerStyle: { borderWidth: 0 } }}
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

const BottomTabs = observer(() => {
  useEffect(() => {
    const colorChange = async () => {
      await NavigationBar.setBackgroundColorAsync('#f2f2f2')
      await NavigationBar.setButtonStyleAsync("dark")
    }
    colorChange()
  }, [])

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
