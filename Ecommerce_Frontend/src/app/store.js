import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import blogReducer from '../features/blog/blogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
  },
});
