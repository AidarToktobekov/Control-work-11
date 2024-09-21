import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, ProductMutation } from "../../types";
import axiosApi from "../../axiosApi";
import { RootState } from "../../app/store";


export const productsFetch = createAsyncThunk<IProduct[], string | undefined>(
    'products/fetchAll',
    async(categoryId)=>{
        const { data: products } = await axiosApi.get<IProduct[]>(`/products`, { params: { category: categoryId } });
        return products;
    }
);

export const productFetch = createAsyncThunk<IProduct, string>(
    'products/fetchOne',
    async(id)=>{
        const { data: product } = await axiosApi.get<IProduct>(`/products/${id}`);
        return product;
    }
);

export const productCreate = createAsyncThunk<void, ProductMutation,  {state: RootState}>('products/create', async (productMutation, {getState}) => {
    const user = getState().users.user;
    const formData = new FormData();
    if (user) {
      const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
      keys.forEach((key) => {
        const value = productMutation[key];
        if (value) {
            formData.append(key, value);
        }
      });
      
      await axiosApi.post<IProduct>('/products', formData,  {headers: {'Authorization': `Bearer ${user.token}`}});
    }
});
export const productDelete = createAsyncThunk<IProduct, string, {state: RootState}>(
    'products/deleteOne',
    async(id, {getState})=>{
        const token = getState().users.user.token;
        const { data: product } = await axiosApi.delete<IProduct>(`/products/${id}`, {headers: {Authorization: `Bearer ${token}`}});
        return product;
    }
);

export const productOwnerFetch = createAsyncThunk<{name: string, phone: string}, string | undefined>(
    'products/fetchProductOwner',
    async(id)=>{
        if (id) {
            const { data: user } = await axiosApi.get(`/users/${id}`);
            return user;
        }else{
            return null;
        }
    }
);