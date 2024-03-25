// Header.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderBreadCrumb from '../breadCrumb/HeaderBreadCrumb';
import { SCREEN_WIDTH } from '../../../constants/theme';

const ProductListHeader = ({ setSearchQuery, searchQuery, allCategory, categories, selectedCategory, setSelectedCategory }) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <Icon style={styles.searchIcon} name="search" size={22} color={COLORS.green} />
                <TextInput
                    style={styles.searchInput}
                    placeholder={'Search'}
                    placeholderTextColor={COLORS.textGray}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
            {categories &&
                <HeaderBreadCrumb
                    crumbs={[allCategory, ...categories]}
                    selectedVariantName={selectedCategory}
                    onPress={(category) => { setSelectedCategory(category) }}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    searchInputContainer: {
        height: 45,
        width: SCREEN_WIDTH - 32,
        borderColor: COLORS.borderGray,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 17,
        paddingHorizontal: 12,
        marginTop: Platform.OS === 'android' ? 35 : 0,
        marginBottom: 4,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
    },
    searchIcon: {
        paddingRight: 8,
    },
    searchInput: {
        textAlign: 'left',
        fontSize: 18,
        width: SCREEN_WIDTH - 80,
    },
});

export default ProductListHeader;
