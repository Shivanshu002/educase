import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { forgotPassword } from '../redux/thunks/authThunk';
import { RootState } from '../redux/store';

const ForgotPassword = () => {
    const [mobile, setMobile] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = () => {
        if (!mobile) return;
        dispatch(forgotPassword(mobile, () => navigation.navigate('VerifyOtp')));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your mobile number to receive an OTP</Text>

            <View style={styles.inputWrapper}>
                <Icon name="call-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Mobile Number"
                    value={mobile}
                    onChangeText={setMobile}
                    style={styles.input}
                    keyboardType="phone-pad"
                />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send OTP</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;

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
    back: { alignItems: 'center', marginTop: 20 },
    backText: { color: '#1e88e5', fontWeight: '500' },
    error: { color: 'red', textAlign: 'center', marginBottom: 8 },
});
