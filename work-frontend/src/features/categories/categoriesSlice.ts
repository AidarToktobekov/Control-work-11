import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchCategory } from './categoriesThunk';

interface CategoriesState {
  items: Category[];
  itemsFetching: boolean;
  oneCategory: Category | null;
  oneCategoryLoading: boolean; 
}

const initialState: CategoriesState = {
  items: [],
  itemsFetching: false,
  oneCategory: null,
  oneCategoryLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.itemsFetching = false;
        state.items = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.itemsFetching = false;
      })
      .addCase(fetchCategory.pending, (state) => {
        state.oneCategoryLoading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload: category }) => {
        state.oneCategoryLoading = false;
        state.oneCategory = category;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.oneCategoryLoading = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.items,
    selectCategoriesFetching: (state) => state.itemsFetching,
    selectCategory: (state) => state.oneCategory,
    selectCategoryFetching: (state) => state.oneCategoryLoading,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { selectCategories, selectCategoriesFetching , selectCategory, selectCategoryFetching} = categoriesSlice.selectors;