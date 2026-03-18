import { RegisterForm } from '../../screens/Register';
import { doPost } from '../../services';
import { Routes } from '../../utils/routers';
import {
    loginFailure, loginStart, loginSuccess,
    RegistFailure, RegistStart, RegistSuccess,
    forgotStart, forgotSuccess, forgotFailure,
    verifyOtpStart, verifyOtpSuccess, verifyOtpFailure,
    resetPasswordStart, resetPasswordSuccess, resetPasswordFailure,
} from '../slices/authSlice';

export const loginUser =
    (email: string, password: string, onSuccess?: () => void) =>
        async (dispatch: any) => {
            try {
                dispatch(loginStart());
                const data = await doPost(Routes.url.user.login, {
                    email,
                    password,
                    role: 'farmer',
                    device_token: '',
                    type: 'email',
                    social_id: '',
                });
                dispatch(loginSuccess(data));
                onSuccess?.();
            } catch (error: any) {
                dispatch(loginFailure('Invalid email or password'));
            }
        };

export const RegistUser =
    (payload: RegisterForm, onSuccess?: () => void) =>
        async (dispatch: any) => {
            try {
                dispatch(RegistStart());
                const data = await doPost(Routes.url.user.register, payload);
                dispatch(RegistSuccess(data));
                onSuccess?.();
            } catch (error: any) {
                dispatch(RegistFailure('Registration failed. Please try again.'));
            }
        };

export const forgotPassword =
    (mobile: string, onSuccess?: () => void) =>
        async (dispatch: any) => {
            try {
                dispatch(forgotStart());
                await doPost(Routes.url.user.forgotPassword, { mobile });
                dispatch(forgotSuccess());
                onSuccess?.();
            } catch (error: any) {
                dispatch(forgotFailure('Failed to send OTP. Please try again.'));
            }
        };

export const verifyOtp =
    (otp: string, onSuccess?: (token: string) => void) =>
        async (dispatch: any) => {
            try {
                dispatch(verifyOtpStart());
                const data = await doPost(Routes.url.user.verifyOtp, { otp });
                dispatch(verifyOtpSuccess(data?.token || otp));
                onSuccess?.(data?.token || otp);
            } catch (error: any) {
                dispatch(verifyOtpFailure('Invalid OTP. Please try again.'));
            }
        };

export const resetPassword =
    (token: string, password: string, cpassword: string, onSuccess?: () => void) =>
        async (dispatch: any) => {
            try {
                dispatch(resetPasswordStart());
                await doPost(Routes.url.user.resetPassword, { token, password, cpassword });
                dispatch(resetPasswordSuccess());
                onSuccess?.();
            } catch (error: any) {
                dispatch(resetPasswordFailure('Failed to reset password. Please try again.'));
            }
        };
