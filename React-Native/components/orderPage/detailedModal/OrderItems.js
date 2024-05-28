import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; // Import the hook
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/theme';

const OrderItems = ({ items }) => {
    const navigation = useNavigation(); // Initialize navigation using useNavigation hook

    const [isLoading, setIsLoading] = useState(true)
    const openDetailedPage = async (order) => {
        navigation.navigate("DetailedOrder", { order: order })
    };

    console.log("ORDERITEMS", items)
    return (<View style={styles.card}>
        {items.map((item, index) => (
            <View key={index} style={[styles.itemContainer, {
                borderBottomWidth: 1,
                borderBottomColor: COLORS.borderGray,
                paddingTop: 8,
                paddingBottom: 4
            }]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: COLORS.textGray }}>{"Quantity: " + item.quantity}</Text>
                    {/* <Text>{item.attributes.size.toString()}</Text> */}
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            key={index}
                            source={{ uri: item.image }}
                            style={styles.itemImage}
                            onLoadStart={() => { setIsLoading(true) }}
                            onLoadEnd={() => { setIsLoading(false) }}
                        />
                        {isLoading && <ActivityIndicator style={styles.itemImage} size="large" color="#eb6e34" />}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.bottomContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text} numberOfLines={1}>{item.attributes.colour.join(' ,')} | </Text>
                                <Text style={styles.text} numberOfLines={1}>{item.attributes.occasion.join(' , ')} |</Text>
                                <Text style={styles.text} numberOfLines={1}>{item.attributes.size.join(' , ')} | </Text>
                                <Text style={styles.text} numberOfLines={1}>{item.attributes.style.join(' , ')} | </Text>
                                <Text style={styles.text} numberOfLines={1}>{item.attributes.type.join(' , ')}</Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.itemPrice}>{item.base_price}</Text>
                            </View>
                        </View>
                        <View style={{ height: 8, }}>
                        </View>
                    </View>
                </View>
            </View>
        ))}
    </View>)
};
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8
    },
    itemContainer: {
        height: 170,
        justifyContent: 'space-between',
        // margin: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        paddingRight: 8,
        height: '100%',
    },
    imageContainer: {
        flexDirection: 'row',
    },
    infoContainer: {
        width: SCREEN_WIDTH - 206,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    itemImage: {
        width: 134, //
        height: 134,
        borderRadius: 16,
        // marginRight: 10,
    },
    itemName: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemPrice: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        fontSize: 18,

    },
    totalPrice: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        fontSize: 18,
    },
    textContainer: {
        flexDirection: 'row',
        width: '70%',
        flexWrap: 'wrap',
    },
    boldedText: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        // lineHeight: 40,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: COLORS.textGray
    },
});
export default OrderItems;