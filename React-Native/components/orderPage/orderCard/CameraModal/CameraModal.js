import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CameraWithButtons from './CameraWithButtons';
import Icon from 'react-native-vector-icons/FontAwesome';

const CameraModal = ({
    isVisible,
    updateOrder,
    onClose
}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon style={styles.icon} name="times" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <CameraWithButtons updateOrder={updateOrder} />
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        paddingTop: Platform.OS === 'ios' ? 25 : 0,
        width: '100%',
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        padding: 10,
    },
    icon: {
        padding: 10,
    },
    contentContainer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default CameraModal;
