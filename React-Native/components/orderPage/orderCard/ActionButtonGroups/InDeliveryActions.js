import React from 'react';
import { View } from 'react-native';
import SlidableButton from '../SlidableButton';

const InDeliveryActions = ({ id, onAccept, onDecline }) => {
    return (
        <View style={styles.processingContainer}>
            <SlidableButton id={id} handleSlideEnd={onAccept} />

            {/* <SecondaryButton onPress={onDecline} text="Decline Order" /> */}

        </View>
    );
};

const styles = {
    processingContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
};

export default InDeliveryActions;
