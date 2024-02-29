import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MainButton from '../buttons/MainButton';
import SecondaryButton from '../buttons/SecondaryButton';

const CustomAlert = ({ visible, title, message, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}
                    <View style={styles.processingContainer}>
                        <SecondaryButton onPress={onClose} width='48%' text="Cancel" />
                        <MainButton onPress={onClose} width='48%' text="Refuse" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: '65%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        fontSize: 18,
        color: 'blue',
        textAlign: 'center',
    },
    processingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',

    },
});

export default CustomAlert;
