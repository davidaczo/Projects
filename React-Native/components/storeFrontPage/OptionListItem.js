import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../constants';
import { storeStore } from '../../mobx/storeStore';

const OptionsListItem = ({ text, value, onPress, rightIcon, onToggle }) => {
    const [isExtended, setIsExtended] = useState(false);
    const [date, setDate] = useState(new Date())
    const [dateNow, setDateNow] = useState(new Date())

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            setIsExtended(!isExtended);
        }
    }

    return (
        <View>
            <TouchableOpacity
                style={[styles.listItem, {
                    alignItems: isExtended ? 'flex-start' : 'center',
                }]}
                onPress={handlePress}
            >
                <View style={styles.notExtended}>
                    <Text style={styles.listText}>{text}</Text>
                    {value !== undefined && (
                        <Switch
                            value={value}
                            trackColor={{ true: COLORS.green, false: COLORS.borderGray }}
                            thumbColor={value ? COLORS.orange : COLORS.orange}
                            onValueChange={onToggle}
                        />
                    )}
                    {rightIcon && <Icon name={isExtended ? 'chevron-down' : 'chevron-right'} size={rightIcon.size} color={rightIcon.color} />}
                </View>
            </TouchableOpacity>
            {isExtended && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display='spinner'
                    minimumDate={dateNow}
                    onChange={async (event, selectedDate) => {
                        setIsExtended(false);
                        const selectedDateS = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
                        const succes = await storeStore.changeStoreStatus(1, selectedDateS, 'closed')
                        console.log("succes", succes)
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 16,
        minHeight: 64,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderGray,
    },
    notExtended: {
        minHeight: 64,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.textBlack,
    },
    extendedContent: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
});

export default OptionsListItem;
