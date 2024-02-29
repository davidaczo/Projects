import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const SecondaryButton = ({ onPress, text, leftContent, rightContent, isSelected = true, width = '100%', height = 45 }) => {
    return (
        <TouchableOpacity style={[styles.secondaryButton, { opacity: isSelected ? 1 : 0.4, width: width, height: height }]} onPress={onPress}>
            <View style={styles.leftContent}>{leftContent}</View>
            <Text style={styles.buttonText}>{text}</Text>
            <View style={styles.rightContent}>{rightContent}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    secondaryButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.orange,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 4
    },
    buttonText: {
        width: '50%',
        color: COLORS.orange,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
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
