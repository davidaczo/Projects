import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform, Linking } from 'react-native'
import { useState, useEffect } from 'react';
import registerNNPushToken, { registerIndieID } from 'native-notify';
import * as Notifications from 'expo-notifications';
import { COLORS } from '../../../constants'
import { observer } from 'mobx-react';
import { productStore } from '../../../mobx/productStore';
import { SCREEN_HEIGHT } from '../../../constants/theme';
import { authStore } from '../../../mobx/authStore';
import { Camera } from 'expo-camera';
import NoProductPage from '../../../components/productPage/productList/NoProductPage';
import CustomAlert from '../../../components/common/alert/CustomAlert';
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
  const [hasPermission, setHasPermission] = useState(null);
  const [pageNr, setPageNr] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const [isLoadingByCategory, setIsLoadingByCategory] = useState(false);
  const [partnerId, setPartnerId] = useState(authStore.partnerId);
  const [isLoadingList, setIsLoadingList] = useState(productStore.isLoading);
  const { data, isLoading, error, isListEnd, loadProducts } = productStore;

  const requestPermissions = async () => {
    console.log(Platform.OS)
    try {
      const cameraPermissionResponse = await Camera.requestCameraPermissionsAsync();
      const { status: cameraStatus } = cameraPermissionResponse;

      const notificationPermissionResponse = await Notifications.getPermissionsAsync();
      const { status: notificationStatus } = notificationPermissionResponse;

      if (cameraStatus === 'granted' && notificationStatus === 'granted') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    requestPermissions();
    handleNotificationId();
  }, []);

  useEffect(() => {
    if (partnerId) {
      productStore.loadCategories(partnerId);
      productStore.loadProducts(partnerId, 1);
    }
  }, [partnerId]);

  useEffect(() => {
    if (partnerId) {
      setIsLoadingByCategory(true);
      setIsLoadingList(true);
      if (searchQuery.length > 0) {
        if (selectedCategory.id == 0) {
          productStore.loadProductsBySearchQuery(partnerId, searchQuery, 1);
        } else {
          productStore.loadProductsBySearchQuery(partnerId, searchQuery, 1, selectedCategory.id);
        }
      } else {
        if (selectedCategory.id == 0) {
          productStore.loadProducts(partnerId, 1);
        } else {
          productStore.loadProductsByCategory(partnerId, selectedCategory.id, 1);
        }
      }


      setTimeout(() => {
        console.log(productStore.data)
        setIsLoadingByCategory(false);
        setIsLoadingList(false);
      }, 1000);
    }
  }, [selectedCategory, searchQuery])



  const onRefresh = async () => {
    await loadProducts(partnerId, 1);
    setPageNr(2);
  };

  const onEndReached = async () => {
    setIsLoadingList(true);
    console.log("END REACHED")
    if (!isListEnd && !isLoading) {
      if (searchQuery.length > 0) {
        if (selectedCategory.id == 0) {
          productStore.loadProductsBySearchQuery(partnerId, searchQuery, pageNr);
        } else {
          productStore.loadProductsBySearchQuery(partnerId, searchQuery, pageNr, selectedCategory.id);
        }
      } else {
        if (selectedCategory.id == 0) {
          productStore.loadProducts(1, pageNr);
        } else {
          productStore.loadProductsByCategory(partnerId, selectedCategory.id, pageNr);
        }
      }
      setPageNr(pageNr + 1);
    }

  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!hasPermission) {
    return <CustomAlert
      visible={true}
      title="Allow Permissions"
      message="Please allow camera and notification permissions to use the app."
      mainText="OK"
      onAccept={() => Linking.openSettings()}
    />
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
      {/* {
        (isLoadingList || !data) &&
        <ActivityIndicator size="large" color={COLORS.orange} style={{ marginTop: SCREEN_HEIGHT / 3 }} />
      } */}
      {
        data && data.length > 0 && !isLoadingByCategory &&
        <>
          <ProductList
            data={data}
            isLoading={isLoadingList}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
          />
        </>
      }
      {(!data || data.length == 0) && !isLoadingList && <NoProductPage />}
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