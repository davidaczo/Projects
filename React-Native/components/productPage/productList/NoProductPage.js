import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const NoProductPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

            </View>
            <Text style={styles.title}>No products yet.</Text>
            <Text style={styles.title2}>Open the app in a browser and add products.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textGray
    },
    title2: {
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.textGray
    }
});

export default NoProductPage;