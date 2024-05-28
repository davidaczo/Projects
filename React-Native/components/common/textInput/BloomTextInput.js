import React, { useEffect, useRef } from 'react';
import { TextInput, StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS, SCREEN_WIDTH } from '../../../constants/theme';

const BloomTextInput = ({ label, placeholder, onChangeText, value, keyboardType = "default", isPasswordField = false }) => {
    const textInputRef = useRef(null);

    const handleTapOutside = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleTapOutside}>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    ref={textInputRef}
                    returnKeyType='done'
                    keyboardType={keyboardType}
                    autoCapitalize='none'
                    style={styles.searchInput}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textGray}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={isPasswordField}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        textAlign: 'left',
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginBottom: 8,
        marginTop: 4,
        borderColor: COLORS.borderGray,
    },
    container: {
        marginBottom: 8,
        width: '100%',
    },
    label: {
        color: COLORS.textBlack,
        fontWeight: '600',
        marginBottom: 4,
        fontSize: 13,
    }
});

export default BloomTextInput;
