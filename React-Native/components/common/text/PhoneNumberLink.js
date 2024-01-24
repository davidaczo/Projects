import React from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';

const PhoneNumberLink = ({ phoneNumber }) => {
    const handlePhonePress = () => {
        const phoneUrl = `tel:${phoneNumber}`;
        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(phoneUrl);
                } else {
                    console.error("Can't handle phone call");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.text}>{phoneNumber}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'lightblue', // Customize the background color as needed
        borderRadius: 5,
    },
    text: {
        color: COLORS.orange,
        fontWeight: '400',
        lineHeight: 24,
        textAlign: 'center'
    },
});

export default PhoneNumberLink;
