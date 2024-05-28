import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import OrderItems from './OrderItems';

const ItemSection = ({ items }) => (
    <View STYLE={{ margin: 4 }}>
        <View style={{ margin: 4, backgroundColor: COLORS.white, elevation: 4, borderRadius: 20 }}>
            <View style={styles.textContainer}>
                <Text style={styles.boldedText}>{"Items"}</Text>
            </View>
            <OrderItems items={items} />
        </View>
        <View style={{ margin: 4, height: 90 }}>

        </View>
    </View>
);
const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',

    },
    boldedText: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        lineHeight: 24,
        fontSize: 22
    },
    text: {
        marginRight: 8,
        color: COLORS.textBlack,
        fontWeight: 'bold',
        lineHeight: 24,
        fontSize: 18
    },
});
export default ItemSection;