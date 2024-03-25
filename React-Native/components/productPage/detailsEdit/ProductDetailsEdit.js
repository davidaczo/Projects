import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import HeaderBreadCrumb from '../breadCrumb/HeaderBreadCrumb';
import { productStore } from '../../../mobx/productStore';
import { observer } from 'mobx-react';
import { COLORS, SCREEN_WIDTH } from '../../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import CustomAlert from '../../common/alert/CustomAlert';
import DetailsHeader from './DetailsHeader';
import ProductAttributes from './ProductAttributes';
import ProductDeactivationItem from './ProductDeactivationItem';

const ProductDetailsEdit = observer(({ route }) => {
    const { id } = route.params;
    const { name, product_variants } = productStore.selectedProduct || {};
    const { selectedProduct, disableAlertActive, setDisableAlertActive } = productStore;
    const [productVariant, setProductVariant] = useState(productStore.selectedProduct);
    const [selectedDeactivation, setSelectedDeactivation] = useState(0);
    const [price, setPrice] = useState(0);
    const mappedProductVariants = product_variants ? product_variants.map((variant) => {
        const { attributes, current_price, img } = variant;
        const { size } = attributes;
        return {
            name: size[0],
            current_price: current_price,
            image: img,
            attributes: attributes,
        };
    }) : [];


    const setProductVariantName = (newPV) => {
        setProductVariant(newPV)
        setDisableAlertActive(!disableAlertActive)
    }

    useEffect(() => {
        console.log(productVariant)
        setProductVariant(mappedProductVariants.filter((variant, index) => index == id)[0]);
        if (productVariant) {
            setPrice(productVariant.current_price);
        }
    }, [mappedProductVariants.size, selectedProduct]);

    useEffect(() => {
        if (productVariant) {
            setPrice(productVariant.current_price);
        }
    }, [productVariant]);
    if (productVariant == null) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" color="#eb6e34" />
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <DetailsHeader
                        mappedProductVariants={mappedProductVariants}
                        setProductVariantName={setProductVariantName}
                        productVariant={productVariant}
                    />

                    <Image style={styles.imageContainer} source={{ uri: productVariant.image }} />

                    <ProductAttributes
                        price={price}
                        productVariant={productVariant}
                    />
                    <CustomAlert visible={disableAlertActive}
                        title={`${name}`}
                        onCancel={() => { productStore.setDisableAlertActive() }}
                        onAccept={() => {
                            if (selectedDeactivation != 0) {
                                productStore.setDisableAlertActive();
                                productStore.changeProductStatus(selectedProduct.id, 1, selectedDeactivation == 1 ? 'inactiveForToday' : 'inactive')
                            }
                        }}
                    >
                        <ProductDeactivationItem
                            text={"Deactivate for 1 day"}
                            isSelected={1 == selectedDeactivation}
                            onPress={() => { setSelectedDeactivation(1) }} />
                        <ProductDeactivationItem
                            text={"Deactivate until I change it back"}
                            isSelected={2 == selectedDeactivation}
                            onPress={() => { setSelectedDeactivation(2) }} />
                    </CustomAlert>
                </View>
            </ScrollView >
        </View >
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 140,
        // borderW
        borderColor: COLORS.lightWhite
    },
    imageContainer: {
        width: SCREEN_WIDTH - 24,
        height: SCREEN_WIDTH - 24,
        borderRadius: 10,
        marginBottom: 16
    },
    headerContainer: {
        paddingVertical: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailsContainer: {
        alignItems: 'center',
        width: '100%'
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    value: {
        fontSize: 16,
        color: COLORS.textBlack,
        lineHeight: 30
    },
    attributeContainer: {
        width: '100%',
        marginHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 8,
        borderRadius: 10,
    },
    prizeContainer: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 4
    },
    attributeLabel: {
        width: 100,
    },
    attributeValue: {
        flex: 1,
        paddingLeft: 4,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textBlack,
    },
    selectText: {
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textBlack,
    },
    inputContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    saveTextInputButton: {
        paddingLeft: 16
    },
    saveEditText: {
        fontSize: 14,
        color: COLORS.textGray
    }
});

export default ProductDetailsEdit;
