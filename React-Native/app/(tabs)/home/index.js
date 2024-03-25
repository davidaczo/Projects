import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import registerNNPushToken, { registerIndieID, getUnreadIndieNotificationInboxCount, getIndieNotificationInbox } from 'native-notify';
import * as Notifications from 'expo-notifications';
import { COLORS } from '../../../constants'
import { observer } from 'mobx-react';
import { productStore } from '../../../mobx/productStore';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/theme';
import HeaderBreadCrumb from '../../../components/productPage/breadCrumb/HeaderBreadCrumb';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductListHeader from '../../../components/productPage/productList/ProductListHeader';
import ProductList from '../../../components/productPage/productList/ProductList';

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
  const allCategory = { id: 0, name: 'All' }
  const [pageNr, setPageNr] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const [isLoadingByCategory, setIsLoadingByCategory] = useState(false);
  const { data, isLoading, error, isListEnd, loadProducts } = productStore
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
    productStore.loadCategories(1);
  }, []);

  useEffect(() => {
    setIsLoadingByCategory(true);
    if (searchQuery.length > 0) {
      if (selectedCategory.id == 0) {
        productStore.loadProductsBySearchQuery(1, searchQuery, 1);
      } else {
        productStore.loadProductsBySearchQuery(1, searchQuery, 1, selectedCategory.id);
      }
    } else {
      if (selectedCategory.id == 0) {
        loadProducts(1, 1);
      } else {
        productStore.loadProductsByCategory(1, selectedCategory.id, 1);
      }
    }


    setTimeout(() => {
      setIsLoadingByCategory(false);
    }, 1000);
  }, [selectedCategory])

  useEffect(() => {
    productStore.loadProductsBySearchQuery(1, searchQuery, 1, selectedCategory.id)

  }, [searchQuery])

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
    <SafeAreaView style={styles.container}>
      <ProductListHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allCategory={allCategory}
        categories={productStore.categories}
      />
      {data && !isLoadingByCategory &&
        <ProductList
          data={data}
          isLoading={isLoading}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
        />
      }
    </SafeAreaView >
  )
}
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

});
export default Home;