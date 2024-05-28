import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { productStore } from '../../../mobx/productStore';
import { authStore } from '../../../mobx/authStore';

const ProductAttributes = ({ productId, price, productVariant }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [partnerId, setPartnerId] = useState(authStore.partnerId); // authStore.partnerId
    const [editablePrice, setEditablePrice] = useState("0");
    const priceInputRef = useRef(null);

    useEffect(() => {
        setEditablePrice(price ? price.toString() : "0");
    }, [price]);

    useEffect(() => {
        if (isEditing) {
            if (priceInputRef.current) {
                priceInputRef.current.focus();
            }
        }
    }, [isEditing])

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = async () => {
        setIsEditing(false);
        console.log(productVariant)
        await productStore.changeProductPrice(partnerId, productId, productVariant.id, editablePrice)
    };

    const handlePriceChange = (text) => {
        console.log(text);
        setEditablePrice(text);
    };
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.attributeContainer}>
                <Text style={[styles.label, styles.attributeLabel]}>{"Price: "}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        editable={isEditing}
                        ref={priceInputRef}
                        style={[styles.value, styles.attributeValue]}
                        value={editablePrice}
                        onChangeText={handlePriceChange}
                    />
                    {isEditing ? (
                        <TouchableOpacity style={styles.saveTextInputButton} onPress={handleSavePress}>
                            <Text style={styles.saveEditText}>{"Save"}</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.saveTextInputButton} onPress={handleEditPress}>
                            <Text style={styles.saveEditText}>{"Edit"}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {productVariant.attributes && Object.keys(productVariant.attributes).map(key => (
                <View key={key} style={styles.attributeContainer}>
                    <Text style={[styles.label, styles.attributeLabel]}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.value, styles.attributeValue]}>{productVariant.attributes[key][0].charAt(0).toUpperCase() + productVariant.attributes[key][0].slice(1)}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        alignItems: 'center',
        width: '100%'
    },
    attributeContainer: {
        width: '100%',
        marginHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 8,
        borderRadius: 10,
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
    attributeLabel: {
        width: 100,
    },
    attributeValue: {
        flex: 1,
        paddingLeft: 4,
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

export default ProductAttributes;
