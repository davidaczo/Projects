import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/theme';

const MainButton = ({ onPress, text, children, rightContent, width = '100%', height = 45, isLoading = false }) => {
    return (
        <TouchableOpacity style={[styles.mainButton, { width: width, height: height }]} onPress={onPress}>
            <View style={styles.content}>{children}</View>
            {isLoading ? <ActivityIndicator size="small" color={COLORS.white} />
                :
                <Text style={styles.buttonText}>{text}</Text>
            }
            <View style={styles.content}>{rightContent}</View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainButton: {
        backgroundColor: COLORS.orange,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginVertical: 4,
        elevation: 4
    },
    buttonText: {
        flex: 2,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    content: {
        flex: 1,
        // paddingHorizontal: 16
    }
});

export default MainButton;
