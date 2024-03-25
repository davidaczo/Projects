import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import BreadCrumbMainButton from './BreadCrumbMainButton';
import BreadCrumbSecondaryButton from './BreadCrumbSecondaryButton';

const HeaderBreadCrumb = ({ crumbs, onPress, selectedVariantName, fullSpace = false }) => {
    if (selectedVariantName == undefined) {
        return <ActivityIndicator style={{
            flex: 1
        }} size="large" color="#eb6e34" />
    }

    return (
        <View style={[styles.navigationHeaderContainer, { justifyContent: fullSpace ? 'space-between' : 'flex-start' }]}>
            {selectedVariantName && crumbs.map((crumb, index) => {
                const capitalizedName = crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1);
                if (crumb.name == selectedVariantName.name) {
                    return <BreadCrumbMainButton key={index} text={capitalizedName} />
                } else {
                    return <BreadCrumbSecondaryButton key={index} text={capitalizedName} onPress={() => { onPress(crumb) }} />
                }
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    navigationHeaderContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: '100%',
    }
});

export default HeaderBreadCrumb;
