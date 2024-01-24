import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants/theme';

const MainButton = ({ onPress, text, children, rightContent }) => {
    return (
        <TouchableOpacity style={styles.mainButton} onPress={onPress}>
            <View style={styles.content}>{children}</View>
            <Text style={styles.buttonText}>{text}</Text>
            <View style={styles.content}>{rightContent}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        width: '100%',
        height: 45,
        backgroundColor: COLORS.orange,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 2

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

export default MainButton;
