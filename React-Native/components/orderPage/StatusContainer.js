import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import OrderStatus from '../../constants/values';
const StatusContainer = ({ status }) => {
    console.log("status", status == OrderStatus.REGISTERED || status == OrderStatus.PROCESSING || status == OrderStatus.IN_DELIVERY)
    const [isActive, setIsActive] = useState(status == OrderStatus.REGISTERED || status == OrderStatus.PROCESSING || status == OrderStatus.IN_DELIVERY);
    const [statusColor, setStatusColor] = useState(COLORS.orange);
    useEffect(() => {
        setIsActive(status == OrderStatus.REGISTERED || status == OrderStatus.PROCESSING || status == OrderStatus.IN_DELIVERY);
        if (status == 'refused' || status == 'rfCanceled') {
            setStatusColor(COLORS.textGray);
        } else if (isActive) {
            setStatusColor(COLORS.orange);
        } else {
            setStatusColor(COLORS.green);
        }
    }, [status]);
    return (
        <View style={styles.statusContainer}>
            <View style={[styles.statusTextWrapper, { backgroundColor: statusColor }]}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statusTextWrapper: {
        backgroundColor: COLORS.orange,
        paddingVertical: 4,
        paddingHorizontal: 16,
        opacity: 0.5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusText: {
        color: COLORS.textBlack,
        fontSize: 16,
    },
});

export default StatusContainer;
