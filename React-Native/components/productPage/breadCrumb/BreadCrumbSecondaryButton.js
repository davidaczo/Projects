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
        width: '25%',
        backgroundColor: COLORS.white,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 2,
        borderWidth: 1,
        borderColor: COLORS.orange,

        elevation: 4,
    },
    buttonText: {
        flex: 2,
        color: COLORS.orange,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingHorizontal: 16
    }
});

export default BreadCrumbSecondaryButton;
