import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, ActivityIndicator, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import OrdersStore from '../../../mobx/ordersStore';
import { COLORS } from '../../../constants';
import OrderCard from '../../../components/orderPage/orderCard/OrderCard';


const OrdersPage = observer(() => {
  const [isFetching, setIsFetching] = useState(false)
  const { data, isLoading, error, loadOrders } = OrdersStore;

  useEffect(() => {
    loadOrders(1);
  }, []);

  onRefresh = () => {
    loadOrders(1);
  }

  if (isLoading) {
    return <ActivityIndicator style={{
      flex: 1
    }} size="large" color="#eb6e34" />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl
              colors={[COLORS.orange]}
              refreshing={isFetching}
              onRefresh={() => onRefresh()}
            />}
          renderItem={({ item }) => (
            <OrderCard order={item} isLast={item == data[data.length - 1]} />
          )}
        />
      )}
    </SafeAreaView>
  );
});

export default OrdersPage;
