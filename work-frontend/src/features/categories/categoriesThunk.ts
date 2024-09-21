import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Category } from '../../types';


export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { data: categories } = await axiosApi.get<Category[]>('/categories');
  return categories;
});

export const fetchCategory = createAsyncThunk('categories/fetchOne', async (id: string | undefined) => {
  if (id) {    
    const { data: category } = await axiosApi.get<Category>(`/categories/${id}`);
    return category;
  }else{
    return null;
  }
});