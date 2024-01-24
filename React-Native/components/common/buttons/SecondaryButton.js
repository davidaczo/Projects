import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const SecondaryButton = ({ onPress, text, leftContent, rightContent, isSelected = true }) => {
    return (
        <TouchableOpacity style={[styles.secondaryButton, { opacity: isSelected ? 1 : 0.4 }]} onPress={onPress}>
            <View style={styles.leftContent}>{leftContent}</View>
            <Text style={styles.buttonText}>{text}</Text>
            <View style={styles.rightContent}>{rightContent}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    secondaryButton: {
        width: '100%',
        height: 45,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.orange,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 2
    },
    buttonText: {
        width: '50%',
        color: COLORS.orange,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    leftContent: {
        width: '25%',
        paddingLeft: 18,
    },
    rightContent: {
        width: '25%',
        alignItems: 'flex-end',
        paddingRight: 18,
    }
});

export default SecondaryButton;
