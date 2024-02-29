import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import MainButton from '../../../common/buttons/MainButton';
import SecondaryButton from '../../../common/buttons/SecondaryButton';
import SlidableButton from '../SlidableButton';

const ProcessingActions = ({ id, onAccept, onDecline }) => {
    return (
        <View style={styles.processingContainer}>
        <MainButton onPress={onAccept} text="Ready" />
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

export default ProcessingActions;
