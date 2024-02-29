import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import OrderItems from './OrderItems';

const ItemSection = ({ items }) => (
    <View style={{ marginBottom: 100 }}>
        <OrderItems items={items} />
        <DetailInfoSection boldedText='Total Price: ' infoText='$123.45' />
    </View>
);
const styles = StyleSheet.create({
});
export default ItemSection;