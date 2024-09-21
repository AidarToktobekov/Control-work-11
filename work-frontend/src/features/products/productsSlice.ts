import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import { productFetch, productsFetch } from "./productThunk";


interface ProductState{
    products: IProduct[];
    product: IProduct | null;
    productsLoading: boolean;
    productLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    product: null,
    productsLoading: false,
    productLoading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(productsFetch.pending, (state)=>{
                state.productsLoading = true;
            })
            .addCase(productsFetch.fulfilled, (state, {payload: products})=>{
                state.productsLoading = false;
                state.products = products;
            })
            .addCase(productsFetch.rejected, (state)=>{
                state.productsLoading = false;
            })
            .addCase(productFetch.pending, (state)=>{
                state.productLoading = true;
            })
            .addCase(productFetch.fulfilled, (state, {payload: product})=>{
                state.productLoading = false;
                state.product = product;
            })
            .addCase(productFetch.rejected, (state)=>{
                state.productLoading = false;
            })
    },
    selectors: {
        selectProducts: (state)=>state.products,
        selectProductsLoading: (state)=>state.productsLoading,
        selectProductLoading: (state)=>state.productLoading,
        selectProduct: (state)=>state.product,
    },
});

export const productsReducer = productsSlice.reducer;

export const { selectProducts, selectProductsLoading, selectProductLoading, selectProduct} = productsSlice.selectors;
