import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native'
import OrderCardSkeleton from './OrderCardSkeleton';
import { COLORS } from '../../../constants/theme';
import DetailedOrderModal from '../detailedModal/DetailedOrderModal';
import OrderStatus from '../../../constants/values';
import ordersStore from '../../../mobx/ordersStore';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import ProcessingActions from './ActionButtonGroups/ProcessingActions';
import RegisteredActions from './ActionButtonGroups/RegisteredActions';
import LoadingCard from './LoadingCard';
import InDeliveryActions from './ActionButtonGroups/InDeliveryActions';
import CustomAlert from '../../common/alert/CustomAlert';
import CameraModal from './CameraModal/CameraModal';

const OrderCard = React.memo(({ order, isLast, navigation }) => {
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
    const [isActive, setIsActive] = useState(status == OrderStatus.REGISTERED || status == OrderStatus.PROCESSING || status == OrderStatus.IN_DELIVERY);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const totalPrice = items
        .map((item) => parseFloat(item.current_price))
        .reduce((a, b) => parseFloat(a) + parseFloat(b))
        .toFixed(2);

    const openDetailedPage = async () => {
        navigation.navigate("DetailedOrder", { order: order })
    };

    const changeModalVisibilty = () => {
        setModalVisible(!modalVisible)
    }

    const changeAlertVisibilty = () => {
        setAlertVisible(!alertVisible)
    }

    const changeOrderStatus = async (newOrderStatus) => {
        if (newOrderStatus == OrderStatus.IN_DELIVERY) {
            setIsLoading(true);
            await ordersStore.updateOrder(1, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false); changeModalVisibilty() }, 500)
        } else if (newOrderStatus == OrderStatus.DELIVERED) {
            setIsLoading(true);
            await ordersStore.updateOrder(1, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false) }, 500)
            setIsActive(false)
        }
        else {
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.flowerIconContainer}>
                        <Icon2 name="flower-tulip-outline" size={25} color={COLORS.textGray} />
                    </View>
                    <View >
                        <Text style={styles.orderId}>{code}</Text>
                        <Text style={styles.text}>Created: {created}</Text>
                        <Text style={styles.text}>Delivery: {delivery_date} {delivery_time} </Text>
                        <View style={styles.statusContainer}>
                            <View style={[styles.statusTextWrapper, { backgroundColor: isActive ? COLORS.orange : COLORS.green }]}>
                                <Text style={styles.statusText}>{status}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.priceArrowWrapper}>
                    <View style={styles.priceContainer}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.priceText}>{totalPrice + " lei"}</Text>
                    </View>
                    <View style={styles.arrowButton}>
                        <Icon name="chevron-right" size={25} color={isActive ? COLORS.orange : COLORS.green} />
                    </View>
                </View>

            </TouchableOpacity>

            {status == OrderStatus.REGISTERED &&
                <RegisteredActions onAccept={() => changeOrderStatus(OrderStatus.PROCESSING)} onDecline={changeAlertVisibilty} />
            }

            {status === OrderStatus.PROCESSING &&
                <ProcessingActions onAccept={() => changeModalVisibilty()} onDecline={() => { }} />
            }

            {status == OrderStatus.IN_DELIVERY &&
                <InDeliveryActions id={id} onAccept={() => changeOrderStatus(OrderStatus.DELIVERED)} onDecline={changeModalVisibilty} />
            }
        </View>

        <CustomAlert
            title={`Refuse ${code}`}
            message="Please inform your customer before refusing the order to avoid any dissatisfaction."
            visible={alertVisible}
            onAccept={changeAlertVisibilty}
            onCancel={changeAlertVisibilty}
        />
        <CameraModal updateOrder={() => changeOrderStatus(OrderStatus.IN_DELIVERY)} isVisible={modalVisible} onClose={changeModalVisibilty} />
    </View>
});

const styles = StyleSheet.create({
    orderContainer: {
        padding: 16,
        flexDirection: 'column',
        margin: 8,
        // marginVertical: 8,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 3
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the start of the container

        alignItems: 'center',
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.secondary,
        paddingBottom: 4
    },
    text: {
        fontSize: 12,
        paddingBottom: 4,
        color: COLORS.textGray
    },
    arrowButton: {
        marginLeft: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    flowerIconContainer: {
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statusTextWrapper: {
        backgroundColor: COLORS.orange,
        paddingVertical: 4,
        paddingHorizontal: 8,
        opacity: 0.5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusText: {
        color: COLORS.textBlack,
        fontSize: 12,
    },
    priceArrowWrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end'
    },
    priceContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    priceText: {
        color: COLORS.secondary,
        fontSize: 16,
        fontWeight: '600',

    }
});


export default OrderCard;