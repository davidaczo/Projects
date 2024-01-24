import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { COLORS } from '../../../constants/theme';
import SeparatorWithText from '../../common/text/SeparatorWithText';
import PhoneNumberLink from '../../common/text/PhoneNumberLink';
import BloomModal from '../../common/modal/BloomModal';
import DetailInfoSection from './DetailInfoSection';
import RenderAddressSection from './AddressSection';
import ItemSection from './ItemSection';

const DetailedOrderModal = ({ order, isVisible, onClose }) => {
    const { id, created, items, billing_address, shipping_address, status } = order;
    const billingName = billing_address.first_name + " " + billing_address.last_name;
    const shippingName = shipping_address.first_name + " " + shipping_address.last_name;

    return (
        <BloomModal
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
            transparent={false}
            isVisible={isVisible}
            onClose={onClose}
            title={"Order #" + id}
            headerTextColor={COLORS.green}
            backgroundColor={COLORS.white}
            borderBottom={false}>
            <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>

                <RenderAddressSection
                    title={"Shipping Address"}
                    name={shippingName}
                    phoneNumber={shipping_address.phone_number}
                    email={shipping_address.email}
                    addressName={shipping_address.address_name}
                    city={shipping_address.city}
                />

                <RenderAddressSection
                    title={"Billing address"}
                    name={billingName}
                    phoneNumber={billing_address.phone_number}
                    email={billing_address.email}
                    addressName={billing_address.address_name}
                    city={billing_address.city}
                />

                <ItemSection
                    items={items}
                    status={status}
                    created={created} />

                <View style={{ padding: 8 }}></View>
            </ScrollView>
        </BloomModal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%'
    },
    headerContainer: {
        width: '100%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    orderInfoContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingBottom: 8,
        paddingTop: 8,
        width: '100%',
        margint: 8
    },
    statusHeader: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    statusText: {
        color: COLORS.textGray,
        fontSize: 16,
        paddingRight: 4,
        fontWeight: 'bold'
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.secondaryLight, // Secondary color
    },
    closeButton: {
        backgroundColor: COLORS.orange, // Secondary color
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // borderWidth: 2,
    },
    boldedText: {
        color: COLORS.secondaryLight,
        fontWeight: 'bold',
        // lineHeight: 40,
    },
    text: {
        marginRight: 8,
        color: COLORS.secondaryLight
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    itemHeader: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemName: {
        color: COLORS.secondaryLight,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemPrice: {
        color: COLORS.secondaryLight,
    },
    totalPrice: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    topDetailContainer: {
        marginBottom: 8,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.borderGray
    },
    detailSectionContainer: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.border
    },
    detailSectionHeader: {
        fontSize: 18,
        paddingVertical: 12,
        fontWeight: 'bold',
        color: COLORS.textBlack,
        textAlign: 'left'
    },
});


export default DetailedOrderModal;