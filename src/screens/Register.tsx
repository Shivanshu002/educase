import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Input } from '../components/Input';
import { DEFAULT_BUSINESS_HOURS, TIME_SLOTS } from '../utils/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RegistUser } from '../redux/thunks/authThunk';
import { RegistFailure } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';

type BusinessHours = {
    mon: string[];
    tue: string[];
    wed: string[];
    thu: string[];
    fri: string[];
    sat: string[];
    sun: string[];
};

export interface RegisterForm {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    business_name: string;
    informal_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    registration_proof: string;
    business_hours: BusinessHours;
    device_token: string;
    type: string;
    social_id: string;
}

const Register = () => {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState<RegisterForm>({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'farmer',
        business_name: '',
        informal_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        registration_proof: '',
        business_hours: DEFAULT_BUSINESS_HOURS,
        device_token: '',
        type: 'frame',
        social_id: 'xyz',
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, error, isLoggedIn } = useSelector(
        (state: RootState) => state.auth
    );

    const handleSubmit = () => {
        const payload = {
            ...formData,
            zip_code: Number(formData.zip_code),
        };
        console.log(payload);

        if (!formData.email || !formData.password) {
            dispatch(RegistFailure('Please enter email and password'));
            return;
        }

        dispatch(RegistUser(payload));
    };


    const updateField = (key: keyof RegisterForm, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleSlot = (day: keyof BusinessHours, slot: string) => {
        const currentSlots = formData.business_hours[day];
        const updatedSlots = currentSlots.includes(slot)
            ? currentSlots.filter(s => s !== slot)
            : [...currentSlots, slot];

        setFormData(prev => ({
            ...prev,
            business_hours: {
                ...prev.business_hours,
                [day]: updatedSlots,
            },
        }));
    };


    const renderHeader = (title: string) => (
        <>
            <Text style={styles.brand}>FarmerEats</Text>
            <Text style={styles.stepText}>Signup {step} of 4</Text>
            <Text style={styles.title}>{title}</Text>
        </>
    );

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigation.replace('Main');
    //     }
    // }, [isLoggedIn]);

    return (
        <View style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        {renderHeader('Welcome!')}
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialBtn}>
                                <FontAwesome name="google" size={20} color="#DB4437" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialBtn}>
                                <Ionicons name="logo-apple" size={20} color="#000" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialBtn}>
                                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.or}>or signup with</Text>

                        <Input label="Full Name" value={formData.full_name} onChange={t => updateField('full_name', t)} />
                        <Input label="Email Address" value={formData.email} onChange={t => updateField('email', t)} />
                        <Input label="Phone Number" value={formData.phone} onChange={t => updateField('phone', t)} />
                        <Input label="Password" value={formData.password} secure onChange={t => updateField('password', t)} />

                        <View style={styles.bottomRow}>
                            <Text style={styles.loginText}>Login</Text>
                            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
                                <Text style={styles.primaryText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        {renderHeader('Farm Info')}

                        <Input label="Business Name" value={formData.business_name} onChange={t => updateField('business_name', t)} />
                        <Input label="Informal Name" value={formData.informal_name} onChange={t => updateField('informal_name', t)} />
                        <Input label="Street Address" value={formData.address} onChange={t => updateField('address', t)} />
                        <Input label="City" value={formData.city} onChange={t => updateField('city', t)} />
                        <Input label="State" value={formData.state} onChange={t => updateField('state', t)} />
                        <Input label="Zipcode" value={formData.zip_code} keyboard="numeric" onChange={t => updateField('zip_code', t)} />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => setStep(1)}>
                                <Ionicons name="menu" size={22} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(3)}>
                                <Text style={styles.primaryText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        {renderHeader('Business Hours')}

                        {(Object.keys(formData.business_hours) as (keyof BusinessHours)[]).map(day => (
                            <View key={day} style={{ marginBottom: 15 }}>
                                <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>

                                <View style={styles.slotContainer}>
                                    {TIME_SLOTS.map(slot => {
                                        const selected = formData.business_hours[day].includes(slot);
                                        return (
                                            <TouchableOpacity
                                                key={slot}
                                                style={[styles.slot, selected && styles.selectedSlot]}
                                                onPress={() => toggleSlot(day, slot)}
                                            >
                                                <Text style={{ color: selected ? '#fff' : '#333', fontSize: 12 }}>
                                                    {slot}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => setStep(2)}>
                                <Ionicons name="menu" size={22} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(4)}>
                                <Text style={styles.primaryText}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <>
                        {renderHeader('Verification')}

                        <Text style={styles.subtitle}>
                            Attached proof of Department of Agriculture registrations.
                        </Text>

                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => updateField('registration_proof', 'usda_registration.pdf')}
                        >
                            <Ionicons name="menu" size={22} />
                            <Text style={{ marginLeft: 10 }}>
                                {formData.registration_proof || 'Attach proof of registration'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => setStep(3)}>
                                <Ionicons name="menu" size={22} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.primaryBtn}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                <Text style={styles.primaryText}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </ScrollView>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    },
    brand: { fontSize: 14, color: '#333' },
    stepText: { fontSize: 12, color: '#999', marginTop: 8 },
    title: { fontSize: 28, fontWeight: '700', marginVertical: 10 },
    subtitle: { fontSize: 12, color: '#777', marginBottom: 20 },

    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    socialBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    or: {
        textAlign: 'center',
        color: '#999',
        marginBottom: 20,
    },

    primaryBtn: {
        backgroundColor: '#D5715B',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    primaryText: {
        color: '#fff',
        fontWeight: '600',
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },

    loginText: {
        textDecorationLine: 'underline',
        color: '#333',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },

    dayTitle: {
        fontWeight: '600',
        marginBottom: 6,
    },

    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    slot: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 4,
    },

    selectedSlot: {
        backgroundColor: '#F4B860',
        borderColor: '#F4B860',
    },

    uploadBtn: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
});