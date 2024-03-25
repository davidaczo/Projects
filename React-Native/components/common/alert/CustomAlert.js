import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import MainButton from '../buttons/MainButton';
import SecondaryButton from '../buttons/SecondaryButton';

const CustomAlert = ({ visible, title, message, onCancel, onAccept, children, mainText = "Confirm", secondaryText = "Cancel" }) => {
    return (
        <Modal
            style={{ borderWidth: 5 }}
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}>
            <View style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.title}>{title}</Text>
                    {message && <Text style={styles.message}>{message}</Text>}
                    {children}
                    <View style={styles.processingContainer}>
                        <SecondaryButton onPress={onCancel} width='48%' text={secondaryText} />
                        <MainButton onPress={onAccept} width='48%' text={mainText} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: '75%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left'
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'left'
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
