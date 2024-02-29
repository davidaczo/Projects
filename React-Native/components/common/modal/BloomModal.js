import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';

const BloomModal = ({ isVisible, onClose, title, children, animationIn, animationOut, backgroundColor = COLORS.white, headerTextColor, marginTop = 0 }) => {
    return (
        <Modal
            style={{
                marginTop: marginTop,
                margin: 0,
                flex: 1,
                borderRadius: marginTop > 0 ? 16 : 10,
                backgroundColor: backgroundColor,
            }}
            onBackdropPress={marginTop ? onClose : null}
            swipeDirection={marginTop ? 'down' : null}
            onSwipeComplete={onClose}
            isVisible={isVisible}
            animationIn={animationIn}
            animationOut={animationOut}
            statusBarTranslucent
            hideModalContentWhileAnimating={true}
            supportedOrientations={['portrait', 'landscape']}
            onBackButtonPress={onClose}>
            <View style={[styles.modalContainer]}>
                <View style={[styles.header, { marginTop: marginTop > 0 ? 0 : 28 }]}>
                    <TouchableOpacity onPress={onClose} style={{ flex: 1 }}>
                        <Icon name="chevron-left" size={35} color={headerTextColor} />
                    </TouchableOpacity>
                    <Text style={[styles.headerText, { color: headerTextColor }]}>{title}</Text>
                    <View style={{ flex: 1 }} />
                </View>

                <View style={styles.content}>{children}</View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGray,
    },
    headerText: {
        flex: 2,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    content: {
        flex: 1,
        width: '100%',
        padding: 4
    },

});

export default BloomModal;
