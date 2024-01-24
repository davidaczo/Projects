import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import OrderItems from './OrderItems';

const ItemSection = ({ status, created, items }) => (
    <View style={styles.detailSectionContainer}>
        <View style={styles.statusHeader}>
            <Text style={styles.statusText}>{status}</Text>
            <Text style={styles.createdText}>{created}</Text>
        </View>
        <OrderItems items={items} />
        <DetailInfoSection boldedText='Total Price: ' infoText='$123.45' />
    </View>
);
const styles = StyleSheet.create({
    detailSectionHeader: {
        fontSize: 18,
        paddingVertical: 12,
        fontWeight: 'bold',
        color: COLORS.textBlack,
        textAlign: 'left'
    },
    statusHeader: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    statusText: {
        color: COLORS.textGray,
        fontSize: 16,
        paddingRight: 4,
        fontWeight: 'bold'
    },
    createdText: {
        color: COLORS.textBlack,
        fontSize: 16,
        textAlign: 'center',
        paddingLeft: 4,
        fontWeight: 'bold'
    },
});
export default ItemSection;