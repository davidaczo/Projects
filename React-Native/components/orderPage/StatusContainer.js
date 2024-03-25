import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
const StatusContainer = ({ status }) => {
    return (
        <View style={styles.statusContainer}>
            <View style={[styles.statusTextWrapper, { backgroundColor: COLORS.green }]}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statusTextWrapper: {
        backgroundColor: COLORS.orange,
        paddingVertical: 4,
        paddingHorizontal: 16,
        opacity: 0.5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusText: {
        color: COLORS.textBlack,
        fontSize: 16,
    },
});

export default StatusContainer;
