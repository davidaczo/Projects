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

    const addressComponents = [
        { label: 'Street:', value: street },
        { label: 'Street number:', value: street_number },
        { label: 'Flat:', value: flat },
        { label: 'Staircase:', value: staircase },
        { label: 'Apartment:', value: apartment },
        { label: 'Floor:', value: floor },
    ];
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
            {addressComponents.map(({ label, value }) => (
                value && <DetailInfoSection key={label} boldedText={`${label} `} infoText={value} />
            ))}
        </View>
    )
};
const styles = StyleSheet.create({

    detailSectionContainer: {
        justifyContent: 'center',
        // borderBottomWidth: 1,
        borderColor: COLORS.textBlack,
        paddingBottom: 8,
        margin: 4,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        elevation: 4,
        padding: 8
    },
    detailSectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textBlack,
        textAlign: 'left',
        paddingHorizontal: 4,
        paddingVertical: 12
    },
    textContainer: {
        flexDirection: 'row',
        padding: 4,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    boldedText: {
        color: COLORS.textGray,
        fontWeight: '400',
        lineHeight: 24,
        fontSize: 16,
    },
});
export default RenderAddressSection;