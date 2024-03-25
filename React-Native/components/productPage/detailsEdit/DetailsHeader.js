import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderBreadCrumb from '../breadCrumb/HeaderBreadCrumb';

const DetailsHeader = ({ mappedProductVariants, setProductVariantName, productVariant }) => {
    return (
        <View style={styles.headerContainer}>
            <HeaderBreadCrumb
                crumbs={mappedProductVariants}
                onPress={setProductVariantName}
                selectedVariantName={productVariant}
                fullSpace={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default DetailsHeader;
