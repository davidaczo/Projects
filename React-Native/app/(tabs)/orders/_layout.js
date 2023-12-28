import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';


import OrdersStore from '../../../mobx/ordersStore';
import OrderCard from '../../../components/order/OrderCard';

const OrdersPage = observer(() => {
  const { data, isLoading, error, loadOrders } = OrdersStore;

  useEffect(() => {
    loadOrders(1);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#eb6e34" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <OrderCard order={item} isLast={item == data[data.length - 1]} />
          )}
        />
      )}
    </SafeAreaView>
  );
});

export default OrdersPage;
