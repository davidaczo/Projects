import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../../components/common/footer/CustomBottomTab';
import Home from '../(tabs)/home/index';
import OrdersPage from '../(tabs)/orders/_layout';
import { COLORS } from '../../constants';
import StoreFrontPage from './storefront';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

const Tab = createBottomTabNavigator();

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
    <Tab.Navigator style={{ elevation: 5, }} tabBar={props => <CustomBottomTab style={{ elevation: 5 }}  {...props} />} backBehavior='history'>
      <Tab.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: COLORS.white,
            borderBottomWidth: 1,
          },
          headerTintColor: COLORS.green,
        }}>
        <Tab.Screen
          options={{ tabBarLabel: 'Products' }}
          name="Products"
          component={Home}
        />
        
        <Tab.Screen
          options={{ tabBarLabel: 'Orders' }}
          name="Orders"
          component={OrdersPage}
        />

        <Tab.Screen
          options={{ tabBarLabel: 'Store', headerShown: false }}
          name="Store"
          component={StoreFrontPage}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;