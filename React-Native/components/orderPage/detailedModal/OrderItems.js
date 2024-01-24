import { View, Text, StyleSheet, Image } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';

const OrderItems = ({ items }) => (
    <View>
        {items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.boldedText}>Attributes: </Text>
                            <Text style={styles.text} numberOfLines={1}>{item.attributes.colour.join(', ')},</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.attributes.occasion.join(', ')},</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.attributes.size.join(', ')},</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.attributes.style.join(', ')},</Text>
                            <Text style={styles.text} numberOfLines={1}>{item.attributes.type.join(', ')}</Text>
                        </View>
                    </View>
                    <View style={styles.itemFooter}>
                        <Text style={styles.itemPrice}>Price: ${item.current_price}</Text>
                    </View>
                </View>
            </View>
        ))}
    </View>
);;
const styles = StyleSheet.create({
    detailSectionHeader: {
        fontSize: 18,
        paddingVertical: 12,
        fontWeight: 'bold',
        color: COLORS.textBlack,
        textAlign: 'left'
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
});
export default OrderItems;