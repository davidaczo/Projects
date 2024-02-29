import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import i18next from '../../../utils/i18next';
import { useTranslation } from 'react-i18next';
import StoreFrontHeader from '../../../components/storeFrontPage/StoreFrontHeader';
import OptionsList from '../../../components/storeFrontPage/OptionsList';


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
