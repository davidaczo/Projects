import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Text, ActivityIndicator, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import OrdersStore from '../../../mobx/ordersStore';
import { COLORS } from '../../../constants';
import OrderCard from '../../../components/orderPage/orderCard/OrderCard';
import { authStore } from '../../../mobx/authStore';


const OrdersPage = observer(({ navigation }) => {
  const [pageNr, setPageNr] = useState(2);
  const [partnerId, setPartnerId] = useState(authStore.partnerId);
  const { data, isLoading, error, isListEnd, loadOrders } = OrdersStore;

  useEffect(() => {
    loadOrders(partnerId, 1);
  }, []);

  const onRefresh = async () => {
    await loadOrders(partnerId, 1);
    setPageNr(2);
  };

  const onEndReached = async () => {
    if (!isListEnd && !isLoading) {
      await loadOrders(partnerId, pageNr);
      setPageNr(pageNr + 1);
    }
  };

  // if (isLoading) {
  //   return <ActivityIndicator style={{
  //     flex: 1
  //   }} size="large" color="#eb6e34" />;
  // }

  if (error) {
    return <Text>ErrorRR: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          windowSize={10}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl
              colors={[COLORS.orange]}
              refreshing={isLoading}
              onRefresh={onRefresh}
            />}
          renderItem={({ item }) => (
            <OrderCard order={item} isLast={item == data[data.length - 1]} navigation={navigation} />
          )}
        />
      )}
    </SafeAreaView>
  );
});

export default OrdersPage;
