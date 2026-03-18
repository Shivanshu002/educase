import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { verifyOtp } from '../redux/thunks/authThunk';
import { RootState } from '../redux/store';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, otpToken } = useSelector((state: RootState) => state.auth);

    const handleSubmit = () => {
        if (!otp) return;
        dispatch(verifyOtp(otp, (token) => navigation.navigate('ResetPassword', { token })));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Enter the OTP sent to your mobile</Text>

            <View style={styles.inputWrapper}>
                <Icon name="key-outline" size={20} color="#999" />
                <TextInput
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    style={styles.input}
                    keyboardType="number-pad"
                    maxLength={6}
                />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Verify OTP</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerifyOtp;

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
