import { RegisterForm } from '../../screens/Register';
import { doPost } from '../../services';
import { Routes } from '../../utils/routers';
import { loginFailure, loginStart, loginSuccess, RegistFailure, RegistStart, RegistSuccess } from '../slices/authSlice';


export const loginUser =
    (username: string, password: string, onSuccess?: () => void) =>
        async (dispatch: any) => {
            try {
                dispatch(loginStart());
                const payload = {
                    username,
                    password,
                    expiresInMins: 30,
                };
                const data = await doPost(Routes.url.user.login, payload);
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
                dispatch(RegistFailure('Invalid email or password'));
            }
        };
