import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../../constants';

const DetailInfoSection = ({ boldedText, infoText }) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.boldedText}>{boldedText}</Text>
            <Text style={styles.text} ellipsizeMode='tail' numberOfLines={5}>{infoText}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'space-between',
    },
    boldedText: {
        color: COLORS.textGray,
        fontWeight: '400',
        lineHeight: 24,
        fontSize: 16
    },
    text: {
        marginRight: 8,
        color: COLORS.textGray,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'right',
        fontSize: 14
    },
});


export default DetailInfoSection;