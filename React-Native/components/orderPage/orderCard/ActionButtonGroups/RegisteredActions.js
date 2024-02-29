import React from 'react';
import { View } from 'react-native';
import MainButton from '../../../common/buttons/MainButton';
import SecondaryButton from '../../../common/buttons/SecondaryButton';

const RegisteredActions = ({ onAccept, onDecline }) => {
    return (
        <View style={styles.processingContainer}>
            <MainButton onPress={onAccept} text="Accept" />
            <SecondaryButton onPress={onDecline} text="Decline" />
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

export default RegisteredActions;
