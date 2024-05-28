import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native'
import OrderCardSkeleton from './OrderCardSkeleton';
import { COLORS } from '../../../constants/theme';
import DetailedOrderModal from '../detailedModal/DetailedOrderModal';
import OrderStatus from '../../../constants/values';
import ordersStore from '../../../mobx/ordersStore';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { authStore } from '../../../mobx/authStore';

import ProcessingActions from './ActionButtonGroups/ProcessingActions';
import RegisteredActions from './ActionButtonGroups/RegisteredActions';
import LoadingCard from './LoadingCard';
import InDeliveryActions from './ActionButtonGroups/InDeliveryActions';
import CustomAlert from '../../common/alert/CustomAlert';
import CameraModal from './CameraModal/CameraModal';
import authService from '../../../api/AuthApi';

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
    const [statusColor, setStatusColor] = useState(COLORS.orange);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [refuseAlertVisible, setRefusalAlertVisible] = useState(false);
    const [acceptanceAlertVisible, setAcceptanceAlertVisible] = useState(false);
    console.log("status", status)
    useEffect(() => {
        setIsActive(status == OrderStatus.REGISTERED || status == OrderStatus.PROCESSING || status == OrderStatus.IN_DELIVERY);
        if (status == 'refused' || status == 'canceled') {
            setStatusColor(COLORS.textGray);
        } else if (isActive) {
            setStatusColor(COLORS.orange);
        } else {
            setStatusColor(COLORS.green);
        }
    }, [status]);

    const totalPrice = items
        .map((item) => parseFloat(item.current_price))
        .reduce((a, b) => parseFloat(a) + parseFloat(b))
        .toFixed(2);

    const openDetailedPage = async () => {
        console.log("status", status, isActive)
        navigation.navigate("DetailedOrder", { order: order, title: code, statusColor: statusColor })
    };

    const handleRefusal = async () => {
        setIsLoading(true);
        await ordersStore.updateOrder(authStore.partnerId, id, OrderStatus.REFUSED)
        setTimeout(() => { setIsLoading(false); changeRefusalAlertVisibilty() }, 500)
    }

    const changeModalVisibilty = () => {
        setModalVisible(!modalVisible)
    }

    const changeRefusalAlertVisibilty = () => {
        setRefusalAlertVisible(!refuseAlertVisible)
    }

    const changeAcceptanceAlertVisibilty = () => {
        setAcceptanceAlertVisible(!acceptanceAlertVisible)
    }

    const changeOrderStatus = async (newOrderStatus) => {
        if (newOrderStatus == OrderStatus.IN_DELIVERY) {
            setIsLoading(true);
            await ordersStore.updateOrder(authStore.partnerId, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false); changeModalVisibilty() }, 500)
        } else if (newOrderStatus == OrderStatus.DELIVERED) {
            setIsLoading(true);
            await ordersStore.updateOrder(authStore.partnerId, id, newOrderStatus)
            setTimeout(() => { setIsLoading(false) }, 500)
            setIsActive(false)
        }
        else {
            setIsLoading(true);
            await ordersStore.updateOrder(authStore.partnerId, id, newOrderStatus)
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
                            <View style={[styles.statusTextWrapper, { backgroundColor: statusColor }]}>
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
                        <Icon name="chevron-right" size={25} color={statusColor} />
                    </View>
                </View>

            </TouchableOpacity>

            {status == OrderStatus.REGISTERED &&
                <RegisteredActions onAccept={changeAcceptanceAlertVisibilty} onDecline={changeRefusalAlertVisibilty} />
            }

            {status === OrderStatus.PROCESSING &&
                <ProcessingActions onAccept={() => changeModalVisibilty()} onDecline={() => { }} />
            }

            {status == OrderStatus.IN_DELIVERY &&
                <InDeliveryActions id={id} onAccept={() => changeOrderStatus(OrderStatus.DELIVERED)} onDecline={changeModalVisibilty} />
            }
        </View>

        <CustomAlert
            title={`Accept ${code}`}
            message={"You won't be able to change the status of the order after accepting it."}
            visible={acceptanceAlertVisible}
            onAccept={() => {
                changeAcceptanceAlertVisibilty();
                changeOrderStatus(OrderStatus.PROCESSING);
            }}
            onCancel={changeAcceptanceAlertVisibilty}
        />

        <CustomAlert
            title={`Refuse ${code}`}
            message="Please inform your customer before refusing the order to avoid any dissatisfaction."
            visible={refuseAlertVisible}
            onAccept={handleRefusal}
            onCancel={changeRefusalAlertVisibilty}
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
        alignItems: 'flex-start',
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
        height: '100%',
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