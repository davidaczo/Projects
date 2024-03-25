import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import LoadingSkeleton from './LoadingSkeleton';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';

const LoadingCard = () => {
    return (
        <View style={styles.skeletonContainer}>
            <View style={styles.detailContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.flowerIconContainer}>
                        <Icon2 name="flower-tulip-outline" size={25} color={COLORS.lightGray} />
                    </View>
                    <View >
                        <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
                        <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
                        <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
                        <View style={styles.statusContainer}>
                            <View style={[styles.statusTextWrapper]}>
                                <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonStatus]}></LoadingSkeleton>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.priceArrowWrapper}>
                    <LoadingSkeleton containerStyle={[styles.skeletonItem, styles.skeletonText]}></LoadingSkeleton>
                    <View style={styles.arrowButton}>
                        <Icon name="chevron-right" size={25} color={COLORS.lightGray} />
                    </View>
                </View>

            </View>
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
        padding: 16,
        flexDirection: 'column',
        margin: 8,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 3
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
        height: 10,
        backgroundColor: COLORS.lightGray
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
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items to the start of the container

        alignItems: 'center',
    },
    priceArrowWrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: COLORS.lightGray
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        color: COLORS.secondary,
        paddingBottom: 4
    },
    text: {
        fontSize: 12,
        paddingBottom: 4,
        color: COLORS.textGray
    },
    arrowButton: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    flowerIconContainer: {
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    statusTextWrapper: {
        backgroundColor: COLORS.orange,
        paddingVertical: 4,
        paddingHorizontal: 8,
        opacity: 0.3,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default LoadingCard;
