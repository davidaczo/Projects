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
import CustomAlert from '../common/alert/CustomAlert';
import { authStore } from '../../mobx/authStore';

const OptionsList = () => {
    const { t } = useTranslation();

    const [lngModalVisible, setLngModalVisible] = useState(false);
    const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
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
                text={t("Available")}
                iconSet='MaterialCommunityIcons'
                iconName={"storefront-outline"}
                // onPress={() => { setLogoutAlertVisible(true) }}
                isSwitch={authStore.status}
                rightIcon={{ size: 22, color: COLORS.secondaryLight }}
            />

            <OptionListItem
                iconName={"clock"}
                text={t("store_scheduler")}
                rightIcon={{ size: 22, color: COLORS.secondaryLight }}
            />
            <OptionListItem
                text={t("language")}

                iconName={"globe"}
                onPress={() => setLngModalVisible(true)}
                rightIcon={{ size: 22, color: COLORS.secondaryLight }}
            />

            <OptionListItem
                text={t("logout")}
                iconName={"log-out"}
                onPress={() => { setLogoutAlertVisible(true) }}
                rightIcon={{ size: 22, color: COLORS.secondaryLight }}
            />



            <SelectLanguageModal
                isVisible={lngModalVisible}
                setVisible={(newValue) => { setLngModalVisible(newValue) }}
                changeLng={changeLng}
                languagesList={languagesList}
                initialLanguage={initialLanguage}
            />
            <CustomAlert
                visible={logoutAlertVisible}
                setVisible={(newValue) => { setVisible(newValue) }}
                title={t("logout")}
                message={t("Are you sure you want to log out?")}
                mainText={t("Yes")}
                secondaryText={t("No")}
                onAccept={() => { authStore.logout() }}
                onCancel={() => { setLogoutAlertVisible(false) }}
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
