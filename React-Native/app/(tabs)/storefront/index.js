import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, FlatList } from 'react-native';
import { COLORS } from '../../../constants';
import Icon from 'react-native-vector-icons/Entypo';
import i18next, { languageResources } from '../../../utils/i18next';
import { useTranslation } from 'react-i18next';
import CountryFlag from "react-native-country-flag";
import languagesList from '../../../constants/languagesList.json';
import BloomModal from '../../../components/common/modal/BloomModal';
import Logo from '../../../assets/images/logo.svg'
import MainButton from '../../../components/common/buttons/MainButton';
import SecondaryButton from '../../../components/common/buttons/SecondaryButton';
import RadioButtonRN from 'radio-buttons-react-native';
import StoreFrontHeader from '../../../components/storeFront/StoreFrontHeader';
import OptionsList from '../../../components/storeFront/OptionsList';


const StoreFrontPage = () => {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [initialLanguage, setInitialLanguage] = useState(i18next.language)
    const [isStoreOpen, setIsStoreOpen] = useState(true);

    const changeLng = lng => {
        i18next.changeLanguage(lng);
    }

    const handleStoreToggle = () => {
        setIsStoreOpen((prev) => !prev);
    };

    return (
        <View style={styles.profileContainer}>
            <StoreFrontHeader />
            <OptionsList
                isStoreOpen={isStoreOpen}
                handleStoreToggle={handleStoreToggle}
                visible={visible}
                setVisible={setVisible}
                initialLanguage={initialLanguage}
                changeLng={changeLng}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        paddingTop: 8,
        flex: 1,
        alignItems: 'center',
    },
});

export default StoreFrontPage;
