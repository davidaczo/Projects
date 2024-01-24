import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';

const RenderAddressSection = ({ title, name, phoneNumber, email, addressName, city }) => (
    <View style={styles.detailSectionContainer}>
        <Text style={styles.detailSectionHeader}>{title}</Text>
        <DetailInfoSection boldedText='Name: ' infoText={name} />
        <View style={styles.textContainer}>
            <Text style={styles.boldedText}>Phone: </Text>
            <PhoneNumberLink phoneNumber={phoneNumber} />
        </View>
        <DetailInfoSection boldedText='E-mail: ' infoText={email} />
        <DetailInfoSection boldedText='Address: ' infoText={addressName} />
        <DetailInfoSection boldedText='City: ' infoText={city} />
    </View>
);
const styles = StyleSheet.create({

    detailSectionContainer: {
        width: '100%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: COLORS.border,
        paddingBottom: 8
    },
    detailSectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textBlack,
        textAlign: 'left',
        paddingHorizontal: 4,
        paddingVertical: 12
    },
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        flexWrap: 'wrap'
    },
    boldedText: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        lineHeight: 24
    },
});
export default RenderAddressSection;