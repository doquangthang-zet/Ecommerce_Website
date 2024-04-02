import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { createBrand, getOneBrand, resetState, updateBrand } from '../features/brand/brandSlice';

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const brandId = param.id;

  //Get created product
  const newBrand = useSelector((state) => {
    return state.brand;
  });

  const { isSuccess, isError, isLoading, createdBrand, updatedBrand, brandTitle } = newBrand;

  useEffect(() => {
    if(brandId) {
      dispatch(getOneBrand(brandId));
    } else {
      dispatch(resetState());
    }
  }, [brandId]);

  useEffect(() => {
    if(isSuccess && createdBrand) {
      toast.success('Brand added successfully!');
    }
    if(isSuccess && updatedBrand) {
      toast.success('Brand updated successfully!');
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
    enableReinitialize: true,
    initialValues: {
      title: brandTitle || '',
    },
    validationSchema: brandSchema,
    onSubmit: values => {
      if(brandId !== undefined) {
        const brandData = {
          id: brandId,
          data: values,
        };
        dispatch(updateBrand(brandData));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
      }
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/brand-list");
      },1000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">{brandId ? "Edit" : "Add"} Brand</h3>

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

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>{brandId ? "Edit" : "Add"} brand</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand