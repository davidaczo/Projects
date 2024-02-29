import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import HeaderBreadCrumb from './breadCrumb/HeaderBreadCrumb';
import productStore from '../../mobx/productStore';
import { observer } from 'mobx-react';
import { COLORS, SCREEN_WIDTH } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetailsEdit = observer(({ route }) => {
    const { id } = route.params;
    const { selectedProduct } = productStore;

    const [productVariant, setProductVariant] = useState(selectedProduct);
    const { name, categories, product_variants } = selectedProduct || {};

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
    }

    useEffect(() => {
        setProductVariant(mappedProductVariants.filter((variant, index) => index == id)[0]);
    }, [mappedProductVariants.size, selectedProduct]);

    if (productVariant == null) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" color="#eb6e34" />
    }

    return (
        <View style={styles.container}>
            <HeaderBreadCrumb
                crumbs={mappedProductVariants}
                onPress={setProductVariantName}
                selectedVariantName={productVariant.name}
            />
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Image style={styles.imageContainer} source={{ uri: productVariant.image }} />
                    <View style={styles.detailsContainer}>
                        <View style={styles.prizeContainer}>
                            <Text style={styles.label}>Current Price:</Text>
                            <Text style={styles.value}>${productVariant.current_price}</Text>
                        </View>
                        {productVariant.attributes && Object.keys(productVariant.attributes).map(key => (
                            <View key={key} style={styles.attributeContainer}>
                                <Text style={[styles.label, styles.attributeLabel]}>{key}:</Text>
                                <Text style={[styles.value, styles.attributeValue]}>{productVariant.attributes[key][0]}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 140,
        paddingTop: 8
    },
    imageContainer: {
        width: SCREEN_WIDTH - 8,
        height: SCREEN_WIDTH - 8,
        borderRadius: 10,
        marginBottom: 16,
    },
    detailsContainer: {
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
    },
    attributeContainer: {
        marginHorizontal: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        elevation: 4
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
    },
});

export default ProductDetailsEdit;
