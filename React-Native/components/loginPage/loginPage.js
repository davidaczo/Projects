import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import { authStore } from '../../mobx/authStore';
import MainButton from '../common/buttons/MainButton';
import BloomTextInput from '../common/textInput/BloomTextInput';
import { COLORS } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginPage = observer(() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {
        const resp = await authStore.login(email, password);
        console.log("resp", resp)
        if (resp == -1) {
            setError("Incorrect email or password. Please try again or contact us.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{"Welcome to,"}</Text>
                <Text style={styles.title2}>{"Bloom Express!"}</Text>
            </View>
            <View style={styles.input}>
                <BloomTextInput
                    label={"Email"}
                    keyboardType='email-address'
                    placeholder="example@email.com"
                    onChangeText={(text) => setEmail(text)}
                />
                <BloomTextInput
                    label={"Password"}
                    isPasswordField={true}
                    placeholder="*******"
                    onChangeText={(text) => setPassword(text)}
                />
            </View>
            {error && (
                <View style={styles.errorWrapper}>
                    <View style={styles.errorContainer}>
                        <Icon name="error-outline" style={{ opacity: 0.8 }} size={26} color={COLORS.textBlack} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                </View>
            )}
            <MainButton text="Login" onPress={handleLogin} isLoading={authStore.isLoading} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    title: {
        fontSize: 24,
        color: COLORS.green,
        marginTop: 20,
    },
    title2: {
        fontSize: 36,
        marginBottom: 20,
        fontWeight: 'bold',
        color: COLORS.green
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
    header: {
        marginBottom: 24,
        width: '100%',
    },
    errorWrapper: {
        width: '100%',
        marginBottom: 28,
    },
    errorContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.errorRedWithOpacity,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    errorText: {
        color: COLORS.textBlack,
        lineHeight: 16,
        fontWeight: '600',
        paddingHorizontal: 12,
        width: '90%',
        opacity: 0.8
    }
});

export default LoginPage;
