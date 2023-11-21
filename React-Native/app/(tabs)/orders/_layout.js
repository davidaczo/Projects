import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/slices/thunk/ordersThunk'
import { getOrders } from '../../../redux/api/axiosAuth';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
function Example() {
    const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('http://172.23.220.228:8000/api/partner/1/orders/1').then(res =>
        res.json()
      )
    )
  
    if (isLoading) return <Text>
        {'Loading...'}
    </Text>
  
    if (error) return <Text>
{'An error has occurred: ' + error.toString()}
    </Text>
  
    return (
      <Text>
        {data.name}
      </Text>
    )
  }
  

const OrdersPage = () => {
    const dispatch = useDispatch();
    const {loading, orders} = useSelector((state) => state.productReducer);


    useEffect( () => {
        console.log("fetch orders")
        const fn = async () => {
            try {
                let res = await fetch("http://127.0.0.1:8000/api/partner/1/orders")
                console.log("orders page after fetch: ", res)
            } catch (error) {
                console.log("localhost error after fetch: ", error)
                try {
                  let res = await fetch("http://172.23.208.1:8000/api/partner/1/orders")
                  console.log("orders page after fetch: ", res)
              } catch (error) {
                  console.log(" 172.23.208.1 error after fetch: ", error)
                  try {
                    let res = await fetch("http://0.0.0.0:8000/api/partner/1/orders")
                    console.log("orders page after fetch: ", res)
                } catch (error) {
                    console.log("00.0.0 error after fetch: ", error)
                }
                }

              }
            

        }
        fn();
        // getOrders().then((result) => {
        //     console.log(result)
        // }).catch(error => console.log(error))rr
        // dispatch(fetchOrders());
      }, []);
    
    return (
        // <Stack.Screen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
                <QueryClientProvider client={queryClient}>
                <Example />
    </QueryClientProvider>
                <Link href="/orders/1"> Order One </Link>
                <Link href="/orders/2"> Order Two </Link>
                <Link href="/orders/3"> Order Three </Link>
            </View>
    );
};

export default OrdersPage;