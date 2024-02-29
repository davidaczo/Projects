import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native'
import { COLORS } from '../../../constants/theme';
import SeparatorWithText from '../../common/text/SeparatorWithText';
import PhoneNumberLink from '../../common/text/PhoneNumberLink';
import BloomModal from '../../common/modal/BloomModal';
import DetailInfoSection from './DetailInfoSection';
import RenderAddressSection from './AddressSection';
import ItemSection from './ItemSection';

const DetailedOrderPage = ({ route }) => {
    const { order } = route.params

    const { id, created, items, billing_address, shipping_address, status, message } = order;
    return (
        <View >
            <View style={styles.statusHeader}>
                <Text style={styles.createdText}>{created}</Text>
                <Text style={styles.statusText}>{status}</Text>
            </View>
            <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>
                <RenderAddressSection
                    title={"Shipping Address"}
                    address={shipping_address}
                    message={message}
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
    statusText: {
        color: COLORS.textGray,
        fontSize: 16,
        fontWeight: 'bold',
    },
    createdText: {
        color: COLORS.textBlack,
        fontSize: 16,
        textAlign: 'center',
        paddingLeft: 4,
        fontWeight: 'bold',
        paddingRight: 4,
    },
});


export default DetailedOrderPage;