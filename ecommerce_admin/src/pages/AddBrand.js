import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createBrand, resetState } from '../features/brand/brandSlice';

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get created product
  const newBrand = useSelector((state) => {
    return state.brand;
  });

  const { isSuccess, isError, isLoading, createdBrand } = newBrand;

  useEffect(() => {
    if(isSuccess && createdBrand) {
      toast.success('Brand added successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  //brand input validation using yup
  let brandSchema = Yup.object({
    title: Yup.string().required('Title is required!'),
  });

  //Form handler using formik
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: brandSchema,
    onSubmit: values => {
      dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/brand-list");
      },3000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">Add Brand</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="relative mt-4 mb-4">
                <input 
                  type="text" 
                  id="brand" 
                  className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                  placeholder=" "
                  name='title'
                  onChange={formik.handleChange("title")}
                  value={formik.values.title}
                  onBlur={formik.handleBlur("title")}
                  />
                <label htmlFor="brand" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter brand</label>

                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Add brand</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand