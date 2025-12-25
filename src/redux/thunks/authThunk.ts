import { doPost } from '../../services';
import { Routes } from '../../utils/routers';
import { loginFailure, loginStart, loginSuccess } from '../slices/authSlice';


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
