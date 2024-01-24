import React from 'react';
import { View, StyleSheet } from 'react-native';
import SecondaryButton from '../../components/common/buttons/SecondaryButton';
import CountryFlag from "react-native-country-flag";
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../constants';

const ModalLanguageItem = ({ onPress, text, isSelected, isoCode }) => {
    return (
        <View>
            <SecondaryButton
                onPress={onPress}
                text={text}
                isSelected={isSelected}
                rightContent={
                    <CountryFlag
                        style={{
                            opacity: isSelected ? 1 : 0.4,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: COLORS.white,
                        }}
                        isoCode={isoCode}
                        size={20}
                    />
                }
                leftContent={
                    <View style={{ height: 45, width: 30, justifyContent: 'center', alignItems: 'flex-start' }}>
                        {isSelected ?
                            <Icon name="check-circle-o" color={COLORS.orange} size={23} /> :
                            <Icon name="circle-o" color={COLORS.orange} size={20} />
                        }
                    </View>
                }
            />
        </View>
    );
};

export default ModalLanguageItem;
