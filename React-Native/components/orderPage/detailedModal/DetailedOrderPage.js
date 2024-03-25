import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { COLORS } from '../../../constants/theme';
import SeparatorWithText from '../../common/text/SeparatorWithText';
import PhoneNumberLink from '../../common/text/PhoneNumberLink';
import BloomModal from '../../common/modal/BloomModal';
import DetailInfoSection from './DetailInfoSection';
import RenderAddressSection from './AddressSection';
import ItemSection from './ItemSection';
import GeneralInfo from './GeneralInfo';

const DetailedOrderPage = ({ route }) => {
    const { order } = route.params

    const { created, items, billing_address, shipping_address, status, message, card_message, delivery_date, delivery_time } = order;

    return (
        <View >
            <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>
                <GeneralInfo
                    created={created}
                    delivery={delivery_date + " " + delivery_time}
                    status={status}
                    message={message}
                    card_message={card_message}
                />
                <RenderAddressSection
                    title={"Shipping Address"}
                    address={shipping_address}
                />

                <RenderAddressSection
                    title={"Billing address"}
                    address={billing_address}
                    city={billing_address.city}
                />

                <ItemSection
                    items={items} />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    statusHeader: {
        flexDirection: "row",
        // width: '100%',
        justifyContent: 'center',
        paddingBottom: 8,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 4
    },
    modalContainer: {
        width: '100%',
        padding: 8,
    },
});


export default DetailedOrderPage;