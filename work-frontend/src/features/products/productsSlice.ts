import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types";
import { productDelete, productFetch, productOwnerFetch, productsFetch } from "./productThunk";


interface ProductState{
    products: IProduct[];
    product: IProduct | null;
    productsLoading: boolean;
    productLoading: boolean;
    productOwner: {name: string, phone: string} | null; 
    productOwnerLoading: boolean;
    deleteLoading: boolean;
}

const initialState: ProductState = {
    products: [],
    product: null,
    productsLoading: false,
    productLoading: false,
    productOwner: null,
    productOwnerLoading: false,
    deleteLoading: false,
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
            .addCase(productOwnerFetch.pending, (state)=>{
                state.productOwnerLoading = true;
            })
            .addCase(productOwnerFetch.fulfilled, (state, {payload: user})=>{
                state.productOwnerLoading = false;
                state.productOwner = user;
            })
            .addCase(productOwnerFetch.rejected, (state)=>{
                state.productOwnerLoading = false;
            })
            .addCase(productDelete.pending, (state)=>{
                state.deleteLoading = true;
            })
            .addCase(productDelete.fulfilled, (state)=>{
                state.deleteLoading = false;
            })
            .addCase(productDelete.rejected, (state)=>{
                state.deleteLoading = false;
            })
    },
    selectors: {
        selectProducts: (state)=>state.products,
        selectProductsLoading: (state)=>state.productsLoading,
        selectProductLoading: (state)=>state.productLoading,
        selectProduct: (state)=>state.product,
        selectOwnerLoading: (state)=>state.productOwnerLoading,
        selectOwner: (state)=>state.productOwner,
    },
});

export const productsReducer = productsSlice.reducer;

export const { selectProducts, selectProductsLoading, selectProductLoading, selectProduct, selectOwnerLoading, selectOwner} = productsSlice.selectors;
