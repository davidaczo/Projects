import { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'

const OrderCardSkeleton = () => {
    return (
        <View style={styles.container}>

            <View style={styles.mainInfoContainer}>
            </View>
        </View>)

}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainInfoContainer: {
        flex: 1,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    seeDetailsButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default OrderCardSkeleton;