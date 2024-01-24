import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import LoadingSkeleton from './LoadingSkeleton';

const LoadingCard = () => {
    return (
        <View style={styles.skeletonContainer}>
            <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonOrderId]}></LoadingSkeleton>
            <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonStatus]}></LoadingSkeleton>
            <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
            <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
            <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonTotalPrice]}></LoadingSkeleton>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        flexDirection: 'column',
        backgroundColor: COLORS.lightGray,
        marginTop: 8,
        marginHorizontal: 4,
    },
    skeletonItem: {
        height: 40,
        borderRadius: 25,
        marginVertical: 4
    },
    skeletonTotalPrice: {
        width: '33%',
        height: 10
    },
    skeletonStatus: {
        width: '66%',
        height: 10
    },
    skeletonOrderId: {
        width: '50%', // Adjust the width as needed
        height: 25
    },
    skeletonText: {
        width: '80%', // Adjust the width as needed
        height: 10
    },
    skeletonPlaceHolderContainer: {
        width: '100%',
        height: 50, // Adjust the height as needed
    },
    skeletonSeeDetailsButton: {
        width: '50%', // Adjust the width as needed
        height: 20,
    },
    skeletonBottomContainer: {
        marginTop: 10,
    },
    skeletonProcessingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    skeletonAcceptOrderButton: {
        width: '100%', // Adjust the width as needed
        height: 40,
    },
    skeletonDeclineOrderButton: {
        width: '80%', // Adjust the width as needed
        height: 40,
    },
});

export default LoadingCard;
