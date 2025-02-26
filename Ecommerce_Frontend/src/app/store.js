import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import blogReducer from '../features/blog/blogSlice';
import prodCateReducer from '../features/productCate/productCateSlice';
import blogCateReducer from '../features/blogCate/blogCateSlice';
import brandReducer from '../features/brand/brandSlice';
import colorReducer from '../features/color/colorSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
    prodCate: prodCateReducer,
    blogCate: blogCateReducer,
    brand: brandReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
  },
});
