import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import axiosApi from "../../axiosApi";


export const productsFetch = createAsyncThunk<IProduct[], string | undefined>(
    'products/fetchAll',
    async(categoryId)=>{
        const { data: products } = await axiosApi.get<IProduct[]>(`/products`, { params: { category: categoryId } });
        return products;
    }
)

export const productFetch = createAsyncThunk<IProduct, string>(
    'products/fetchOne',
    async(id)=>{
        const { data: product } = await axiosApi.get<IProduct>(`/products/${id}`);
        return product;
    }
)