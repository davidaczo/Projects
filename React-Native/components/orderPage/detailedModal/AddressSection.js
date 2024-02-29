import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import { SCREEN_WIDTH } from '../../../constants/theme';

const RenderAddressSection = ({ title, address, message }) => {
    const {
        first_name,
        last_name,
        phone_number,
        email,
        street,
        street_number,
        flat,
        staircase,
        apartment,
        floor,
        city,
    } = address;
    const addressStr = `str. ${street}, nr. ${street_number}` +
        `${flat == "-" ? `, bl. ${flat}` : ''}` +
        `${staircase == "-" ? `, sc. ${staircase}` : ''}` +
        `${apartment == "-" ? `, ap. ${apartment}` : ''}` +
        `${floor == "-" ? `, et. ${floor}` : ''}`;
    return (
        <View style={styles.detailSectionContainer}>
            <Text style={styles.detailSectionHeader}>{title}</Text>
            <DetailInfoSection boldedText='Name: ' infoText={first_name + " " + last_name} />
            <View style={styles.textContainer}>
                <Text style={styles.boldedText}>Phone: </Text>
                <PhoneNumberLink phoneNumber={phone_number} />
            </View>
            {email != "" && <DetailInfoSection boldedText='E-mail: ' infoText={email} />}
            <DetailInfoSection boldedText='City: ' infoText={city} />
            <DetailInfoSection boldedText='Address: ' infoText={addressStr} />
            {message && <DetailInfoSection boldedText='Message: ' infoText={message} />}
        </View>
    )
};
const styles = StyleSheet.create({

    detailSectionContainer: {
        width: SCREEN_WIDTH - 8,
        justifyContent: 'center',
        // borderBottomWidth: 1,
        borderColor: COLORS.textBlack,
        paddingBottom: 8,
        margin: 4,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        elevation: 4,
        paddingHorizontal: 8
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