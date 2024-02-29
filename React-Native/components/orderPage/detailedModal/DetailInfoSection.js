import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../../constants';

const DetailInfoSection = ({ boldedText, infoText }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.boldedText}>{boldedText}</Text>
            <Text style={styles.text} numberOfLines={3}>{infoText}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        flexWrap: 'wrap',
    },
    boldedText: {
        color: COLORS.textBlack,
        fontWeight: 'bold',
        lineHeight: 24
    },
    text: {
        marginRight: 8,
        color: COLORS.textBlack,
        fontFamily: 'Roboto',
        lineHeight: 24
    },
});


export default DetailInfoSection;