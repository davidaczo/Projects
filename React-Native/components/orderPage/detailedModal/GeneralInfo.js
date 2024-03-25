import { View, Text, StyleSheet } from 'react-native'
import DetailInfoSection from "./DetailInfoSection";
import PhoneNumberLink from "../../common/text/PhoneNumberLink";
import { COLORS } from '../../../constants';
import { SCREEN_WIDTH } from '../../../constants/theme';
import StatusContainer from '../StatusContainer';

const GeneralInfo = ({ created, delivery, status, message, card_message }) => {
    return (
        <View style={styles.detailSectionContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 8 }}>
                <Text style={styles.detailSectionHeader}>{"General info"}</Text>
                <StatusContainer created={created} delivery={delivery} status={status} />
            </View>
            <DetailInfoSection boldedText='Created: ' infoText={created} />
            <DetailInfoSection boldedText='Delivery: ' infoText={delivery} />
            <DetailInfoSection boldedText='Price: ' infoText={"123.4"} />
            {card_message && <DetailInfoSection boldedText='Card message: ' infoText={card_message} />}
            {message && <DetailInfoSection boldedText='Message: ' infoText={message} />}
        </View>
    )
};
const styles = StyleSheet.create({

    detailSectionContainer: {
        justifyContent: 'center',
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
        paddingVertical: 12,
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
        fontSize: 18,
    },
});
export default GeneralInfo;