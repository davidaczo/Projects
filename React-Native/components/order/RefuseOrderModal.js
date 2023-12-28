import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RefuseOrderModal = ({ isVisible, onClose }) => {
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

    if (!isVisible) {
        return null;
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text>Popup Content</Text>
                <TouchableOpacity onPress={handleRefuse}>
                    <Text>Refuse Order</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default RefuseOrderModal;
