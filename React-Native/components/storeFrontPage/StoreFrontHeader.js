import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../../assets/images/logo.svg';
import { COLORS } from '../../constants';
import { authStore } from '../../mobx/authStore';

const StoreFrontHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
                {/* <Logo /> */}
            </View>
            <Text style={styles.storeName}>{authStore.name}</Text>
            <View />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 16,
        paddingLeft: 16,
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
    },
    imageContainer: {
        paddingTop: 24,
        flex: 1,
        height: '80%',
        justifyContent: 'center',
    },
    storeName: {
        flex: 1,
        paddingTop: 16,
        fontWeight: 'bold',
        fontSize: 24,
        color: COLORS.orange,
    },
});

export default StoreFrontHeader;
