import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { COLORS } from '../../constants';

const OptionsListItem = ({ text, value, onToggle, onPress, rightIcon }) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
            <Text style={styles.listText}>{text}</Text>
            {value && (
                <Switch
                    value={value}
                    trackColor={{ true: COLORS.green, false: COLORS.lightGray }}
                    thumbColor={value ? COLORS.orange : COLORS.orange}
                    onValueChange={onToggle}
                />
            )}
            {rightIcon && <Icon name={rightIcon.name} size={rightIcon.size} color={rightIcon.color} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 24,
        padding: 6,
        height: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGray
    },
    listText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.textBlack,
    },
});

export default OptionsListItem;
