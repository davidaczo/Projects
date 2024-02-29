import React from 'react';
import { Alert } from 'react-native';
import { changeOrderStatus, OrderStatus } from './yourOrderStatusFile'; // Import your order status related functions

const ConfirmRefusalAlert = ({changeOrderStatus}) => {
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
                        changeOrderStatus(OrderStatus.REFUSED);
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <Button title="Refuse Order" onPress={handleRefuse} />
    );
};

export default ConfirmRefusalAlert;
