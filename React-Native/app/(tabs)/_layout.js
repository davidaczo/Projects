import CustomBottomTab from '../../components/common/CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../(tabs)/home/index';
import OrdersPage from '../(tabs)/orders/_layout';
import HistoryPage from '../(tabs)/history/_layout';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: true,
        }}>
        <Tab.Screen
          options={{tabBarLabel: 'Products'}}
          name="Products"
          component={Home}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Orders'}}
          name="Cart"
          component={OrdersPage}
        />

        <Tab.Screen
          options={{tabBarLabel: 'Store'}}
          name="Favourites"
          component={HistoryPage}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;