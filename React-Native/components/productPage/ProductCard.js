import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/theme";
import productStore from "../../mobx/productStore";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item, index }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [productVariantIndex, setProductVariantIndex] = useState(0);
    const { data, loadProduct } = productStore

    const onProductCardPress = (id, name) => {
        console.log("opening product details", item.product_variants[productVariantIndex])
        navigation.navigate("EditProduct", { id: productVariantIndex });
        loadProduct(1, id);
    };
    return (
        <TouchableOpacity
            style={[styles.itemContainer, {
                marginBottom: item == data[data.length - 1] ? 100 : 0,
                marginLeft: index % 2 == 0 ? 8 : 4,
                marginRight: index % 2 == 1 ? 8 : 4,
            }]}
            onPress={() => {
                onProductCardPress(item.id, item.product_variants[productVariantIndex])
            }}
        >
            <View style={styles.cardItem}>
                <Image style={styles.imageContainer} src={item.product_variants[productVariantIndex].img}
                    onLoadStart={() => { setIsLoading(true) }}
                    onLoadEnd={() => { setIsLoading(false) }}
                />
                {/* {isLoading
                    &&
                    <ActivityIndicator style={styles.imageContainer} size="large" color="#eb6e34" />
                } */}
                <View style={styles.cardInfoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.product_variants}>
                        {item.product_variants && item.product_variants.map((variant, index) => {
                            const variantKey = `${variant.id}_${index}`;
                            return (
                                <TouchableOpacity
                                    key={variantKey}
                                    onPress={() => { setProductVariantIndex(index) }}
                                    style={{ borderWidth: 0, flex: 1, paddingVertical: 4, alignItems: 'center' }}>
                                    <Text style={[styles.product_variantsText, {
                                        color: index == productVariantIndex ? COLORS.orange : COLORS.textGray,

                                    }]}>
                                        {variant.attributes.size[0]}
                                    </Text>
                                    <Text style={[styles.product_variantPriceText, {
                                        color: index == productVariantIndex ? COLORS.orange : COLORS.textGray,
                                    }]}>
                                        {variant.base_price + " RON"}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: SCREEN_WIDTH / 2 - 12,
        height: SCREEN_HEIGHT / 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: 4,
        marginVertical: 8,
        elevation: 4,
        borderRadius: 16
    },
    cardItem: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    imageContainer: {
        height: "75%",
        width: "100%",
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    cardInfoContainer: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: COLORS.white,

        borderWidth: 1,
        borderColor: COLORS.borderGray,
    },
    product_variants: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textBlack,
    },
    product_variantsText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    product_variantPriceText: {
        fontSize: 9,
    }

});

export default ProductCard;