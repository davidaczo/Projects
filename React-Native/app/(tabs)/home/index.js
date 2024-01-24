import { View, Text, SafeAreaView, Image, Button, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import registerNNPushToken, { registerIndieID, getUnreadIndieNotificationInboxCount, getIndieNotificationInbox } from 'native-notify';
import * as Notifications from 'expo-notifications';
import { COLORS } from '../../../constants'
import { observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlowerImage from '../../../constants/flowerImage'
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (e) {
    // saving error
  }


};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
    }
  } catch (e) {
    // error reading value
  }
};
const handleNotificationId = async () => {
  registerIndieID('test1', 9850, 'YcP3wRuqi1RbGXiH5yt5kC');
  storeData("Hello121")
  getData()
  // axios.post(`https://app.nativenotify.com/api/indie/notification`, {
  //   subID: 'test1',
  //   appId: 9850,
  //   appToken: 'YcP3wRuqi1RbGXiH5yt5kC',
  //   title: 'Hello user',
  //   message: 'You opened the app :)'
  // });
}

const Home = observer(() => {
  registerNNPushToken(9850, 'YcP3wRuqi1RbGXiH5yt5kC');
  const [unreadNotCount, setUnreadNotCount] = useState(0);
  const [data, setData] = useState([]);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
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
      console.log("unreadCount: ", unreadNotCount)
      let notifications = await getIndieNotificationInbox('test1', 9850, 'YcP3wRuqi1RbGXiH5yt5kC');
      setData(notifications);
      setUnreadNotCount(unreadNotCount)
    }
    fetchData()
  }, []);

  useEffect(() => {
    requestNotificationPermission();
    handleNotificationId();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhrite }}>
      <ScrollView>
        <Text>{"adssad"}</Text>
        {/* {products.map((product, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row', // To display text and image side by side
                alignItems: 'center',  // Vertically align items in the row
                borderColor: 'black',
                borderBottomWidth: 1, // Add a border to separate items
                paddingHorizontal: 50,         // Add padding for spacing
              }}
            >
              <View style={{ flex: 2 }}>
                <Text>{product.name}</Text>
              </View>
              <View style={{ flex: 1, paddingTop: 25 }}>
                <FlowerImage />
              </View>
            </View>
          );
        })} */}
      </ScrollView>
    </SafeAreaView>
  )
}
)

export default Home;