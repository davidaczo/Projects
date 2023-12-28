import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import OrderCardSkeleton from './OrderCardSkeleton';
import { COLORS } from '../../constants/theme';
import DetailedOrderModal from './DetailedOrderModal';
import SlidableButton from './SlidableButton';
import RefuseOrderModal from './RefuseOrderModal';

const OrderCard = ({ order, isLast }) => {
    const {
        id,
        code,
        created,
        items,
        billing_address,
        shipping_address,
        status,
    } = order;

    const [modalVisible, setModalVisible] = useState(false);
    const [isRefuseModalVisible, setIsRefuseModalVisible] = useState(false);

    const showModal = () => setIsRefuseModalVisible(true);
    const hideModal = () => setIsRefuseModalVisible(false);


    const onSeeDetails = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleRefuse = () => {
        // You can perform any additional actions before refusing the order
        Alert.alert(
            'Confirm Refusal',
            'Are you sure you want to refuse this order?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Refuse',
                    onPress: () => {
                        // Perform actions to refuse the order
                        console.log('Order refused');
                        onClose(); // Close the modal
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <View style={styles.orderContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.mainInfoContainer}>
                        <Text style={styles.orderId}>Order #{id}</Text>
                        <Text style={styles.text}>Status: {status}</Text>
                        <Text style={styles.text}>Created: {created}</Text>
                        <Text style={styles.text}>Shipping address: {shipping_address.city}</Text>
                        <Text style={styles.text}>Total Items: {items.length}</Text>
                    </View>
                    <View>
                        <View style={styles.placeHolderContainer}></View>
                        <TouchableOpacity onPress={() => onSeeDetails(order)} style={styles.seeDetailsButton}>
                            <Text style={styles.buttonText}>See Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {id == 1 &&
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <SlidableButton />
                            <TouchableOpacity onPress={handleRefuse}>
                                <Text style={styles.refuseOrderButton}>Refuse Order</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>

            {isLast && <OrderCardSkeleton />}

            <RefuseOrderModal isVisible={isRefuseModalVisible} onClose={hideModal} />
            
            <DetailedOrderModal order={order} isVisible={modalVisible} onClose={closeModal} />
        </>
    )
}

const styles = StyleSheet.create({
    orderContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        flexDirection: 'column',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainInfoContainer: {
        flex: 1,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.darkPurple
    },
    seeDetailsButton: {
        backgroundColor: COLORS.darkPurple,
        padding: 6,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.white,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    placeHolderContainer: {
        flex: 1
    },
    text: {
        color: COLORS.lightPurple
    },
    refuseOrderButton: {
        color: 'red',
        textDecorationLine: 'underline',
    },
});


export default OrderCard;