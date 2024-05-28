import React from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { COLORS } from '../../../constants';
import ProductCard from './ProductCard';
import { ActivityIndicator, View } from 'react-native';

const ProductList = ({ data, isLoading, onEndReached, onRefresh }) => {
    console.log("ISLOADING", isLoading)
    // if (isLoading) {
    //     return <ActivityIndicator
    //         style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    //         size="large"
    //         color={COLORS.orange}
    //     />
    // }
    return (
        <FlatList
            style={{ flex: 1 }}
            data={data}
            key={(item) => item.id}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            initialNumToRender={20}
            contentContainerStyle={{
                marginBottom: 100,
                marginTop: 16,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            refreshControl={
                <RefreshControl
                    colors={[COLORS.orange]}
                    refreshing={isLoading}
                    onRefresh={() => onRefresh()}
                />
            }
            renderItem={({ item, index }) => (
                <View key={item.key}>
                    <ProductCard item={item} index={index} />
                </View>
            )}
        />
    );
};

export default ProductList;
