import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MainButton from '../../common/buttons/MainButton';
import SecondaryButton from '../../common/buttons/SecondaryButton';
import BreadCrumbMainButton from './BreadCrumbMainButton';
import BreadCrumbSecondaryButton from './BreadCrumbSecondaryButton';

const HeaderBreadCrumb = ({ crumbs, onPress, selectedVariantName }) => {
    if (selectedVariantName == undefined) {
        return <ActivityIndicator style={{
            flex: 1
        }} size="large" color="#eb6e34" />
    }
    return (
        <View style={styles.navigationHeaderContainer}>
            {selectedVariantName && crumbs.map((crumb, index) => {
                if (crumb.name == selectedVariantName) {
                    return <BreadCrumbMainButton key={index} text={crumb.name} />
                } else {
                    return <BreadCrumbSecondaryButton key={index} text={crumb.name} onPress={() => { onPress(crumb) }} />
                }
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    navigationHeaderContainer: {
        // margin: 6,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});

export default HeaderBreadCrumb;
