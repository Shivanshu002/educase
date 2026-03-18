import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { resetPassword } from '../redux/thunks/authThunk';
import { RootState } from '../redux/store';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showCPass, setShowCPass] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const token = (route.params as any)?.token || '';
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = () => {
        if (!password || !cpassword) return;
        dispatch(resetPassword(token, password, cpassword, () => navigation.navigate('Login')));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your new password</Text>

            <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={20} color="#999" />
                <TextInput
                    placeholder="New Password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPass}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                    <Icon name={showPass ? 'eye-outline' : 'eye-off-outline'} size={20} color="#999" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChangeText={setCpassword}
                    style={styles.input}
                    secureTextEntry={!showCPass}
                />
                <TouchableOpacity onPress={() => setShowCPass(!showCPass)}>
                    <Icon name={showCPass ? 'eye-outline' : 'eye-off-outline'} size={20} color="#999" />
                </TouchableOpacity>
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Reset Password</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, justifyContent: 'center' },
    title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
    subtitle: { textAlign: 'center', color: '#888', marginBottom: 24 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center', borderWidth: 1,
        borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, height: 48, marginBottom: 16,
    },
    input: { flex: 1, marginLeft: 8 },
    button: {
        height: 48, backgroundColor: '#0A66FF', borderRadius: 10,
        justifyContent: 'center', alignItems: 'center', marginTop: 8,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    error: { color: 'red', textAlign: 'center', marginBottom: 8 },
});
