import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';

const BreadCrumbSecondaryButton = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        height: 40,
        backgroundColor: COLORS.green,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 2,
        opacity: 0.3
    },
    buttonText: {
        color: COLORS.textBlack,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    content: {
        flex: 1,
        paddingHorizontal: 16
    }
});

export default BreadCrumbSecondaryButton;
