import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../constants';
import { storeStore } from '../../mobx/storeStore';
import CustomAlert from '../common/alert/CustomAlert';
import { Switch } from 'react-native-switch';
import { authStore } from '../../mobx/authStore';
import { set } from 'mobx';

const OptionsListItem = ({ text, onPress, rightIcon, iconName, iconSet = "Entypo", isSwitch = false }) => {
    const [isExtended, setIsExtended] = useState(false);
    const [isStoreOpen, setIsStoreOpen] = useState(true)
    const [date, setDate] = useState(new Date())
    const [dateNow, setDateNow] = useState(new Date())
    const [showAlert, setShowAlert] = useState(false)
    const [dateString, setDateString] = useState('')

    const handlePress = () => {
        if (isSwitch) return;
        if (onPress) {
            onPress();
        } else {
            setIsExtended(!isExtended);
        }
    }

    const handleStoreToggle = () => {
        const todaysDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        setDateString(todaysDate)
        setShowAlert(true)
        // if (isStoreOpen) {
        //     storeStore.changeStoreStatus(authStore.partnerId, todaysDate, 'closed')
        // } else {
        //     storeStore.changeStoreStatus(authStore.partnerId, todaysDate, 'open')
        // }
        setIsStoreOpen((prev) => !prev);
    }

    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.borderGray }}>
            <TouchableOpacity
                disabled={isSwitch}
                style={[styles.listItem, {
                    alignItems: isExtended ? 'flex-start' : 'center',
                }]}
                onPress={handlePress}
            >
                <View style={styles.notExtended}>
                    <View style={styles.leftSide}>
                        {rightIcon && iconSet == "Entypo" ?
                            <Icon name={iconName} size={rightIcon.size} color={rightIcon.color} /> :
                            <Icon2 name={iconName} size={rightIcon.size} color={rightIcon.color} />
                        }

                        <Text style={styles.listText}>{text}</Text>
                    </View>

                    {isSwitch && <Switch
                        value={isStoreOpen}
                        onValueChange={(val) => handleStoreToggle()}
                        disabled={false}
                        activeText={''}
                        inActiveText={''}
                        circleSize={15}
                        barHeight={24}
                        circleBorderWidth={0}
                        backgroundActive={COLORS.green}
                        backgroundInactive={COLORS.secondaryTextGray}
                        circleActiveColor={COLORS.white}
                        circleInActiveColor={COLORS.white}
                        switchWidthMultiplier={3} // multipled by the `circleSize` prop to calculate total width of the Switch
                    />}
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
                        if (event.type === 'dismissed') {
                            return;
                        } else {
                            const selectedDateS = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
                            setDateString(selectedDateS)
                            setShowAlert(true)
                        }
                    }}
                />
            )}

            <CustomAlert
                visible={showAlert}
                title='Schedule Closure'
                message={isStoreOpen ? `Do you want to open the shop on ${dateString}?` : `Do you want to close the shop on ${dateString}?`}
                buttonText='Ok'
                onAccept={async () => {
                    setShowAlert(false)
                    const succes = await storeStore.changeStoreStatus(authStore.partnerId, dateString, 'closed')
                }}
                onCancel={() => {
                    console.log("CANCEL", isStoreOpen)
                    setIsStoreOpen(!isStoreOpen);
                    setShowAlert(false)
                    console.log("CANCEL", isStoreOpen)
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        minHeight: 64,
    },
    notExtended: {
        minHeight: 64,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    listText: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 12,
        color: COLORS.textBlack,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    extendedContent: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
});

export default OptionsListItem;
