import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../constants/theme";
import { productStore } from "../../../mobx/productStore";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ item, index }) => {
    const navigation = useNavigation();
    const [isContainerPressed, setIsContainerPressed] = useState(false);
    const [cheapestProductVariantIndex, setCheapestProductVariantIndex] = useState(0);
    const { data, loadProduct } = productStore

    const onProductCardPress = (id, name) => {
        navigation.navigate("EditProduct", { id: 0, title: item.name });
        loadProduct(1, id);
    };

    useEffect(() => {
        setCheapestProductVariantIndex(item.product_variants.findIndex((variant) =>
            variant.current_price == Math.min(...item.product_variants.map((variant) => variant.current_price))
        ));
    }, [])

    return (
        <TouchableOpacity
            style={{
                marginBottom: item == data[data.length - 1] ? 100 : 0,
                marginLeft: index % 2 == 0 ? 16 : 8,
                marginRight: index % 2 == 1 ? 16 : 8,
            }}
            activeOpacity={1}
            onPress={() => {
                onProductCardPress(item.id, item.product_variants[cheapestProductVariantIndex])
            }}
            onPressIn={() => { setIsContainerPressed(true) }}
            onPressOut={() => { setIsContainerPressed(false) }}
        >
            <View style={styles.cardItem}>
                <Image style={[styles.imageContainer, { opacity: isContainerPressed ? 0.5 : 1 }]} src={item.product_variants[cheapestProductVariantIndex].img}

                />
                <View style={styles.cardInfoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{"from " + item.product_variants[cheapestProductVariantIndex].base_price + " lei"}</Text>

                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardItem: {
        borderRadius: 16,
    },
    imageContainer: {
        width: SCREEN_WIDTH / 2 - 24,
        height: SCREEN_WIDTH / 2,
        borderWidth: 1,
        borderRadius: 16
    },
    cardInfoContainer: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderColor: COLORS.borderGray,
        padding: 4
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
    itemPrice: {
        fontSize: 14,
        color: COLORS.textGray,
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