import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OptionListItem from './OptionListItem';
import i18next, { languageResources } from '../../utils/i18next';
import { useTranslation } from 'react-i18next';
import languagesList from '../../constants/languagesList.json';
import { COLORS } from '../../constants';
import SelectLanguageModal from './SelectLanguageModal';
import storeService from '../../api/StoreApi';
import { storeStore } from '../../mobx/storeStore';

const OptionsList = () => {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [initialLanguage, setInitialLanguage] = useState(i18next.language);
    const [isStoreOpen, setIsStoreOpen] = useState(true);

    const changeLng = lng => {
        i18next.changeLanguage(lng);
    };

    const handleStoreToggle = () => {
        const todaysDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
        if (isStoreOpen) {
            // storeStore.changeStoreStatus(1, todaysDate, 'closed')
        } else {
            // storeStore.changeStoreStatus(1, todaysDate, 'open')
        }
        setIsStoreOpen((prev) => !prev);

    };

    return (
        <View style={styles.optionsList}>
            <OptionListItem
                text={t("closed/open")}
                value={isStoreOpen}
                onToggle={handleStoreToggle}
            />
            <OptionListItem
                text={t("store_scheduler")}
                rightIcon={{ size: 26, color: COLORS.secondaryLight }}
            />
            <OptionListItem
                text={t("language")}
                onPress={() => setVisible(true)}
                rightIcon={{ size: 26, color: COLORS.secondaryLight }}
            />

            <SelectLanguageModal
                isVisible={visible}
                setVisible={(newValue) => { setVisible(newValue) }}
                changeLng={changeLng}
                languagesList={languagesList}
                initialLanguage={initialLanguage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    optionsList: {
        flex: 6,
        width: "100%",
        backgroundColor: COLORS.white,
    },
});

export default OptionsList;
