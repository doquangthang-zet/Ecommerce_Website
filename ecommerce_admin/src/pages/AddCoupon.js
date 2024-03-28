import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getColors } from '../features/color/colorSlice';
import { getCategories } from '../features/productCate/pCategorySlice';
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { deleteImg, resetImgState, uploadImg } from '../features/upload/uploadSlice';
import Dropzone from 'react-dropzone';
import { GiCrossMark } from "react-icons/gi";
import { createCoupon, resetState } from '../features/coupon/couponSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get created coupon
  const newCoupon = useSelector((state) => {
    return state.coupon;
  });

  const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

  useEffect(() => {
    if(isSuccess && createdCoupon) {
      toast.success('Coupon added successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  //copon input validation using yup
  let couponSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    expiry: Yup.date().required('Expiry date is required!'),
    discount: Yup.number().required("Discount is required!"),
  });

  //Form handler using formik
  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: "",
    },
    validationSchema: couponSchema,
    onSubmit: values => {
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      },3000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">Add Coupon</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              {/* Name */}
              <div className="relative mt-4 mb-4">
                <input type="text" id="name" 
                name='name'
                className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                placeholder=" "
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                onBlur={formik.handleBlur("name")} />
                
                <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter product title</label>
                
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </div>
              </div>              

              {/* Expiry date */}
              <div className="relative mt-4 mb-4">
                <input type="date" id="expiry" 
                name='expiry'
                className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                placeholder=" "
                onChange={formik.handleChange("expiry")}
                value={formik.values.expiry}
                onBlur={formik.handleBlur("expiry")} />
                
                <label htmlFor="expiry" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter expiry date</label>
                
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.expiry && formik.errors.expiry ? (
                    <div>{formik.errors.expiry}</div>
                  ) : null}
                </div>
              </div>

              {/* Discount */}
              <div className="relative mt-4 mb-4">
                <input type="number" id="discount" 
                  name='discount'
                  className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                  placeholder=" "
                  onChange={formik.handleChange("discount")}
                  value={formik.values.discount}
                  onBlur={formik.handleBlur("discount")}
                />
                
                <label htmlFor="discount" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter discount percent</label>
                
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.discount && formik.errors.discount ? (
                    <div>{formik.errors.discount}</div>
                  ) : null}
                </div>
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Add coupon</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon