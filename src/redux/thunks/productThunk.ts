import { doGet } from '../../services';
import { Routes } from '../../utils/routers';
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../slices/productSlice';

export const getProducts = () => async (dispatch: any) => {
    try {
        dispatch(fetchProductsStart());
        // const data = await doGet(Routes.url.products.products);
        const data = await doGet('https://dummyjson.com/products');
        dispatch(fetchProductsSuccess(data.products));
    } catch (error: any) {
        dispatch(fetchProductsFailure(error.message));
    }
};
