import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import OptionListItem from './OptionListItem';
import BloomModal from '../../components/common/modal/BloomModal';
import MainButton from '../../components/common/buttons/MainButton';
import ModalLanguageItem from './ModalLanguageItem';
import i18next, { languageResources } from '../../utils/i18next';
import { useTranslation } from 'react-i18next';
import languagesList from '../../constants/languagesList.json';
import { COLORS } from '../../constants';

const OptionsList = () => {
    const { t } = useTranslation();

    const [visible, setVisible] = useState(false);
    const [initialLanguage, setInitialLanguage] = useState(i18next.language);
    const [isStoreOpen, setIsStoreOpen] = useState(true);

    const changeLng = lng => {
        i18next.changeLanguage(lng);
    };

    const handleStoreToggle = () => {
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
                text={t("notifications")}
                rightIcon={{ name: 'chevron-right', size: 26, color: COLORS.secondaryLight }}
            />
            <OptionListItem
                text={t("language")} onPress={() => setVisible(true)}
                rightIcon={{ name: 'chevron-right', size: 26, color: COLORS.secondaryLight }}
            />


            <BloomModal
                isVisible={visible}
                onClose={() => { setVisible(false); i18next.changeLanguage(initialLanguage) }}
                title={t("language")}
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backgroundColor={COLORS.white}
                headerTextColor={COLORS.green}
                borderBottom={true}
            >
                <View style={styles.modalContainer}>
                    {Object.keys(languageResources).map(item => (
                        <ModalLanguageItem
                            key={item}
                            onPress={() => changeLng(item)}
                            text={languagesList[item].nativeName}
                            isSelected={item === i18next.language}
                            isoCode={languagesList[item].flagname}
                        />
                    ))}

                    <MainButton onPress={() => { setVisible(false) }} text={t("continueinlng")} />
                </View>
            </BloomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    optionsList: {
        flex: 6,
        width: "100%",
        backgroundColor: COLORS.white,
    },
    modalContainer: {
        // Add any styles for the modal container here
    },
});

export default OptionsList;
