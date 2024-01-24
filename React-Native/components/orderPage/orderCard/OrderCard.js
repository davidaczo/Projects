import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native'
import OrderCardSkeleton from './OrderCardSkeleton';
import { COLORS } from '../../../constants/theme';
import DetailedOrderModal from '../detailedModal/DetailedOrderModal';
import OrderStatus from '../../../constants/values';
import ordersStore from '../../../mobx/ordersStore';
import Icon from 'react-native-vector-icons/Entypo';
import ProcessingActions from './ProcessingActions';
import RegisteredActions from './RegisteredActions';
import LoadingCard from './LoadingCard';

const OrderCard = ({ order, isLast }) => {
    const {
        id,
        created,
        items,
        shipping_address,
        status,
    } = order;

    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const changeModalState = async () => {
        setModalVisible(!modalVisible);
    };

    const changeOrderStatus = async (newOrderStatus) => {
        setIsLoading(true);
        await ordersStore.updateOrder(1, id, newOrderStatus)
        setTimeout(() => { setIsLoading(false) }, 500)

    };


    const handleRefuse = () => {
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
                        console.log('Order refused');
                        onClose(); // Close the modal
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };
    if (isLoading) {
        return <LoadingCard />
    }
    return <View>
        <View style={styles.orderContainer}>
            <TouchableOpacity onPress={changeModalState} style={styles.detailContainer}>
                <View>
                    <Text style={styles.orderId}>Order #{id}</Text>
                    <Text style={styles.text}>Status: {status}</Text>
                    <Text style={styles.text}>Created: {created}</Text>
                    <Text style={styles.text}>Shipping address: {shipping_address.city}</Text>
                    <Text style={styles.text}>Total Items: {items.length}</Text>
                </View>
                <View style={styles.arrowButton}>
                    <Icon name="chevron-right" size={25} color={COLORS.green} />
                </View>
            </TouchableOpacity>

            {status === OrderStatus.PROCESSING && (
                <ProcessingActions id={id} onAccept={() => changeOrderStatus(OrderStatus.IN_DELIVERY)} onDecline={handleRefuse} />
            )}


            {status == OrderStatus.REGISTERED &&
                <RegisteredActions onAccept={() => changeOrderStatus(OrderStatus.PROCESSING)} onDecline={handleRefuse} />
            }
        </View>

        {isLast && <OrderCardSkeleton />}

        <DetailedOrderModal order={order} isVisible={modalVisible} onClose={changeModalState} />
    </View>
}


const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: COLORS.lightGray,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 8,
        flexDirection: 'column',
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.secondary
    },
    arrowButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default OrderCard;