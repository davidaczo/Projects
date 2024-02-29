import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native'
import OrderCardSkeleton from './OrderCardSkeleton';
import { COLORS } from '../../../constants/theme';
import DetailedOrderModal from '../detailedModal/DetailedOrderModal';
import OrderStatus from '../../../constants/values';
import ordersStore from '../../../mobx/ordersStore';
import Icon from 'react-native-vector-icons/Entypo';
import ProcessingActions from './ActionButtonGroups/ProcessingActions';
import RegisteredActions from './ActionButtonGroups/RegisteredActions';
import LoadingCard from './LoadingCard';
import InDeliveryActions from './ActionButtonGroups/InDeliveryActions';
import CustomAlert from '../../common/alert/CustomAlert';
import CameraModal from './CameraModal/CameraModal';

const OrderCard = ({ order, isLast, navigation }) => {
    const {
        id,
        code,
        created,
        delivery_time,
        delivery_date,
        items,
        billing_address,
        shipping_address,
        status,
    } = order;

    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const openDetailedPage = async () => {
        navigation.navigate("DetailedOrder", { order: order })
    };

    const changeModalVisibilty = () => {
        setModalVisible(!modalVisible)
    }

    const changeOrderStatus = async (newOrderStatus) => {
        if (newOrderStatus == OrderStatus.IN_DELIVERY) {
            // changeModalVisibilty()
            // navigation.navigate("camera", {
            //     updateOrder: async () => {
            setIsLoading(true);
            await ordersStore.updateOrder(1, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false) }, 500)
            //     }
            // })
        } else {
            setIsLoading(true);
            await ordersStore.updateOrder(1, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false) }, 500)
        }

    };

    if (isLoading) {
        return <LoadingCard />
    }

    return <View>
        <View style={[styles.orderContainer, { marginBottom: isLast ? 100 : 0 }]}>
            <TouchableOpacity onPress={openDetailedPage} style={styles.detailContainer}>
                <View>
                    <Text style={styles.orderId}>Order #{code}</Text>
                    <Text style={styles.text}>Status: {status}</Text>
                    <Text style={styles.text}>Created: {created}</Text>
                    <Text style={styles.text}>Shipping address: {shipping_address.city}</Text>
                    <Text style={styles.text}>Delivery: {delivery_date} {delivery_time} </Text>
                    <Text style={styles.text}>Total Items: {items.length}</Text>
                </View>
                <View style={styles.arrowButton}>
                    <Icon name="chevron-right" size={25} color={COLORS.green} />
                </View>
            </TouchableOpacity>

            {status == OrderStatus.REGISTERED &&
                <RegisteredActions onAccept={() => changeOrderStatus(OrderStatus.PROCESSING)} onDecline={changeModalVisibilty} />
            }

            {status === OrderStatus.PROCESSING &&
                <ProcessingActions onAccept={() => changeModalVisibilty()} onDecline={() => { }} />
            }

            {status == OrderStatus.IN_DELIVERY &&
                <InDeliveryActions id={id} onAccept={() => changeOrderStatus(OrderStatus.DELIVERED)} onDecline={changeModalVisibilty} />
            }
        </View>

        {/* <CustomAlert title="Refuse order?" message="" visible={true} onClose={changeModalVisibilty} /> */}
        <CameraModal updateOrder={() => changeOrderStatus(OrderStatus.IN_DELIVERY)} isVisible={modalVisible} onClose={changeModalVisibilty} />
    </View>
}


const styles = StyleSheet.create({
    orderContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 8,
        paddingHorizontal: 20,
        flexDirection: 'column',
        margin: 4,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 3
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.secondary,
        paddingBottom: 4
    },
    text: {
        fontSize: 14,
    },
    arrowButton: {
        width: 36,
        height: 36,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.lightGray
    },
});


export default OrderCard;