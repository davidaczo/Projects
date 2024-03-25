import React from "react";
import i18next from "i18next";
import { COLORS } from '../../constants';
import { View } from "react-native";
import ModalLanguageItem from "./ModalLanguageItem";
import MainButton from "../common/buttons/MainButton";
import { languageResources } from "../../utils/i18next";
import BloomModal from "../common/modal/BloomModal";
import { useTranslation } from "react-i18next";
import languagesList from '../../constants/languagesList.json';


const SelectLanguageModal = ({ isVisible, setVisible, changeLng, initialLanguage }) => {
    const { t } = useTranslation();
    return (
        <BloomModal
            isVisible={isVisible}
            onClose={() => { setVisible(false); i18next.changeLanguage(initialLanguage) }}
            title={t("language")}
            animationIn={'slideInRight'}
            animationOut={'slideOutRight'}
            backgroundColor={COLORS.white}
            headerTextColor={COLORS.green}
        >
            <View>
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
    )
}

export default SelectLanguageModal;