import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import "react-widgets/styles.css";
import { createCoupon, getOneCoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const couponId = param.id;

  //Get created coupon
  const newCoupon = useSelector((state) => {
    return state.coupon;
  });

  const { isSuccess, isError, isLoading, createdCoupon, updatedCoupon, currentCoupon } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    let [month, day, year] = newDate.split("/");
    if(month.length<2) {
      month = "0" + month;
    }
    if(day.length<2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if(couponId) {
      dispatch(getOneCoupon(couponId));
      console.log(couponId);
    } else {
      dispatch(resetState());
    }
  }, [couponId]);

  useEffect(() => {
    if(isSuccess && createdCoupon) {
      toast.success('Coupon added successfully!');
    }
    if(isSuccess && updatedCoupon) {
      toast.success('Coupon updated successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  //copon input validation using yup
  let couponSchema = Yup.object({
    name: Yup.string().required('Name is required!'),
    expiry: Yup.date().required('Expiry date is required!').min(new Date()),
    discount: Yup.number().required("Discount is required!"),
  });

  //Form handler using formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentCoupon ? currentCoupon.name : "",
      expiry: currentCoupon ? changeDateFormat(currentCoupon.expiry) : "",
      discount: currentCoupon ? currentCoupon.discount : "",
    },
    validationSchema: couponSchema,
    onSubmit: values => {
      values.expiry = changeDateFormat(values.expiry);

      if(couponId !== undefined) {
        const couponData = {
          id: couponId,
          data: values,
        };
        dispatch(updateCoupon(couponData));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
      }
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      },1000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">{couponId ? "Edit" : "Add"} Coupon</h3>

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

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>{couponId ? "Edit" : "Add"} coupon</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon