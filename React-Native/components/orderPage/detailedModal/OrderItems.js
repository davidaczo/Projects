import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const OrderItems = ({ items }) => {
    const navigation = useNavigation(); // Initialize navigation using useNavigation hook

    const [isLoading, setIsLoading] = useState(true)
    const openDetailedPage = async (order) => {
        navigation.navigate("DetailedOrder", { order: order })
    };
    return (<View>
        {items.map((item, index) => (
            // <TouchableOpacity key={index} style={styles.card} onPress={() => { openDetailedPage(item.id) }}>
            <View key={index} style={styles.card}>
                <View style={styles.infoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.boldedText}>Attributes: </Text>
                        <Text style={styles.text} numberOfLines={1}>{item.attributes.colour.join(', ')},</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.attributes.occasion.join(', ')},</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.attributes.size.join(', ')},</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.attributes.style.join(', ')},</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.attributes.type.join(', ')}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.boldedText}>Price: </Text>

                        <Text style={styles.itemPrice}>{item.current_price}</Text>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    {/* <Text style={styles.itemPrice}>{item.current_price}</Text> */}
                    <Image
                        key={index}
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                        onLoadStart={() => { setIsLoading(true) }}
                        onLoadEnd={() => { setIsLoading(false) }}
                    />
                    {isLoading && <ActivityIndicator style={styles.itemImage} size="large" color="#eb6e34" />}
                </View>
            </View>
            // </TouchableOpacity>
        ))}
    </View>)
};
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        elevation: 4,
        // overflow: 'hidden',
        paddingLeft: 8,
        flexDirection: 'row',
        height: 160,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    priceContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        height: '100%',
        width: '50%',
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'flex-end',
        // marginBottom: 10,
        marginHorizontal: 8,
        overflow: 'hidden',
        padding: 8,
        borderRadius: 24,
        overflow: 'hidden'
    },
    infoContainer: {
        height: '100%',
        width: '45%',
        paddingVertical: 8,
        justifyContent: "space-between"
    },
    itemImage: {
        width: 144, //
        height: 144,
        borderRadius: 8,
        // marginRight: 10,
    },
    itemName: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    itemPrice: {
        color: COLORS.textBlack,
    },
    totalPrice: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        fontSize: 18,
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
        // borderWidth: 2,
    },
    boldedText: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        // lineHeight: 40,
    },
});
export default OrderItems;