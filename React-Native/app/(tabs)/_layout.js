import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomBottomTab from '../../components/common/footer/CustomBottomTab';
import Home from '../(tabs)/home/index';
import OrdersPage from '../(tabs)/orders/_layout';
import HistoryPage from '../(tabs)/history/_layout';
import { COLORS } from '../../constants';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#FFF', // Set your desired header background color
          },
          headerTintColor: COLORS.green, // Set the text color in the header
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
          options={{ tabBarLabel: 'Store' }}
          name="Favourites"
          component={HistoryPage}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;