import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { COLORS } from '../../constants/theme';
import { ColorSpace } from 'react-native-reanimated';
import SeparatorWithText from '../common/SeparatorWithText';
import PhoneNumberLink from '../common/PhoneNumberLink';

const DetailedOrderModal = ({ order, isVisible, onClose }) => {
    const { id, code, created, items, billing_address, shipping_address, status } = order;
    // console.log("-------------------")
    // console.log(order)
    // console.log("-------------------")

    const billingName = billing_address.first_name + " " + billing_address.last_name
    const shippingName = shipping_address.first_name + " " + shipping_address.last_name

    return (
        <Modal animationType="slide" transparent={false} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.modalTitle}>Order Details</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Display the detailed information about the order */}
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Created: </Text>
                        <Text style={styles.text}>{created}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Status: </Text>
                        <Text style={styles.text}>{status}</Text>
                    </View>

                    <SeparatorWithText text={"Shipping Address"} />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Name: </Text>
                        <Text style={styles.text}>
                            {shippingName}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Phone: </Text>
                        <PhoneNumberLink phoneNumber={shipping_address.phone_number} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>E-mail: </Text>
                        <Text style={styles.text}>{shipping_address.email}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Address: </Text>
                        <Text style={styles.text}>{shipping_address.address_name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>City: </Text>
                        <Text style={styles.text}>{shipping_address.city}</Text>
                    </View>


                    <SeparatorWithText text={"Billing address"} />
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Name: </Text>
                        <Text style={styles.text}>
                            {billingName}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Phone: </Text>
                        <PhoneNumberLink phoneNumber={billing_address.phone_number} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>E-mail: </Text>
                        <Text style={styles.text}>{billing_address.email}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Address: </Text>
                        <Text style={styles.text}>{billing_address.address_name}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>City: </Text>
                        <Text style={styles.text}>{billing_address.city}</Text>
                    </View>
                    <SeparatorWithText text={'Items'} />
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                <Text style={styles.itemPrice}>Price: ${item.current_price}</Text>
                            </View>
                        </View>
                    ))}

                    <SeparatorWithText text={'Total Price'} />
                    <Text style={styles.totalPrice}>$123.45</Text>
                </ScrollView>
                {/* Add more details as needed */}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: COLORS.white, // Primary color
        padding: 20,
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.lightPurple, // Secondary color
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
        flexDirection: 'row'
    },
    boldedText: {
        color: COLORS.lightPurple,
        fontWeight: 'bold'
    },
    text: {
        marginRight: 8,
        color: COLORS.lightPurple
    },
    itemContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    itemName: {
        color: COLORS.lightPurple,
        fontWeight: 'bold',
    },
    itemQuantity: {
        color: COLORS.lightPurple,
    },
    itemPrice: {
        color: COLORS.lightPurple,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    totalPrice: {
        color: COLORS.lightPurple,
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});


export default DetailedOrderModal;