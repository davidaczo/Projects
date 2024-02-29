import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';

const BreadCrumbMainButton = ({ onPress, text }) => {
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
        backgroundColor: COLORS.orange,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 2,
        elevation: 4,
    },
    buttonText: {
        flex: 2,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        paddingHorizontal: 16
    }
});

export default BreadCrumbMainButton;
