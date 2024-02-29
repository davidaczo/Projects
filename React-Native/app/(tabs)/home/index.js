import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react';
import registerNNPushToken, { registerIndieID, getUnreadIndieNotificationInboxCount, getIndieNotificationInbox } from 'native-notify';
import * as Notifications from 'expo-notifications';
import { COLORS } from '../../../constants'
import { observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlowerImage from '../../../constants/flowerImage'
import productStore from '../../../mobx/productStore';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT } from '../../../constants/theme';
import BloomModal from '../../../components/common/modal/BloomModal';
import MainButton from '../../../components/common/buttons/MainButton';
import ProductDetailsEdit from '../../../components/productPage/ProductDetailsEdit';
import { set } from 'mobx';
import ProductCard from '../../../components/productPage/ProductCard';

const handleNotificationId = async () => {
  registerIndieID('test1', 9850, 'YcP3wRuqi1RbGXiH5yt5kC');
  // axios.post(`https://app.nativenotify.com/api/indie/notification`, {
  //   subID: 'test1',
  //   appId: 9850,
  //   appToken: 'YcP3wRuqi1RbGXiH5yt5kC',
  //   title: 'Hello user',
  //   message: 'You opened the app :)'
  // });
}

const Home = observer(({ navigation }) => {
  registerNNPushToken(9850, 'YcP3wRuqi1RbGXiH5yt5kC');
  const [pageNr, setPageNr] = useState(2);
  const [productVariantIndex, setProductVariantIndex] = useState(0);
  const { data, isLoading, error, isListEnd, setIsListEnd, loadProducts, loadProduct } = productStore
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          // Handle the case where the user does not grant permission
        }
      }
    }


    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        // Handle the case where the user does not grant permission
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      let unreadNotCount = await getUnreadIndieNotificationInboxCount('test1', 9850, 'YcP3wRuqi1RbGXiH5yt5kC');
      console.log("unreadCount: ", unreadNotCount);
      let notifications = await getIndieNotificationInbox('test1', 9850, 'YcP3wRuqi1RbGXiH5yt5kC');
    }
    fetchData();
    requestNotificationPermission();
    handleNotificationId();
    loadProducts(1, 1);
  }, []);

  const onRefresh = async () => {
    await loadProducts(1, 1);
    setPageNr(2);
  };

  const onEndReached = async () => {
    if (!isListEnd && !isLoading) {
      await loadProducts(1, pageNr);
      setPageNr(pageNr + 1);
    }
  };


  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data && <FlatList
        style={{ flex: 1 }}
        data={data}
        key={(item) => item.id}
        keyExtractor={(item, index) => item.id + index}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        initialNumToRender={20}
        contentContainerStyle={{
          marginBottom: 100,
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            colors={[COLORS.orange]}
            refreshing={isLoading} // Use isRefreshing state
            onRefresh={() => onRefresh()}
          />}
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )
        }
      />
      }
    </SafeAreaView >
  )
}
)
const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    height: SCREEN_HEIGHT / 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 4
  },
  cardItem: {
    height: '100%',
    width: '100%',
    borderRadius: 16
  },
  imageContainer: {
    height: "75%",
    width: "100%",
    borderWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  cardInfoContainer: {
    height: '25%',
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: COLORS.borderGray,

    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
  product_variants: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textBlack,
  },
  product_variantsText: {
    fontSize: 12,
  }
});
export default Home;