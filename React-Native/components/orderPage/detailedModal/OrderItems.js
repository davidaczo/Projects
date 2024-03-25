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
    return (<View style={styles.card}>
        {items.map((item, index) => (
            // <TouchableOpacity key={index} style={styles.card} onPress={() => { openDetailedPage(item.id) }}>
            <View key={index} style={[styles.itemContainer, {
                borderTopWidth: 1,
                borderTopColor: COLORS.borderGray,
                // marginVertical: 8,
                paddingTop: 8
            }]}>
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
                            <Text style={styles.itemPrice}>{item.current_price}</Text>
                        </View>
                    </View>
                    <View style={{ height: 8, }}>

                    </View>
                </View>
            </View>
            // </TouchableOpacity>
        ))}
    </View>)
};
const styles = StyleSheet.create({
    card: {
        marginHorizontal: 8
    },
    itemContainer: {
        flexDirection: 'row',
        height: 168,
        justifyContent: 'space-between',
        // margin: 8,
    },
    priceContainer: {
        flexDirection: 'row'
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
        width: 154, //
        height: 154,
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
        width: '100%'
    },
    text: {
        color: COLORS.textGray
    },
});
export default OrderItems;