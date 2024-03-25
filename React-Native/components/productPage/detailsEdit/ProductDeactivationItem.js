import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../constants';
import { useState } from 'react';


const ProductDeactivationItem = ({ text, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={onPress}
        >
            {isSelected ?
                <Icon style={{ marginRight: 8 }} name="check-circle-o" color={COLORS.green} size={15} />
                :
                <Icon style={{ marginRight: 8 }} name="circle-o" color={COLORS.orange} size={15} />
            }
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 4,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        flex: 1,
        padding: 4,
        flexWrap: 'wrap'
    }
});


export default ProductDeactivationItem;