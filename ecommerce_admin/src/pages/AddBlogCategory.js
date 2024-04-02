import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { createBCate,getOneBlogCategory,resetState, updateBlogCategory } from '../features/blogCate/bCategorySlice';

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const blogCateId = param.id;

  //Get created b cate
  const newBCate = useSelector((state) => {
    return state.bCategory;
  });

  const { isSuccess, isError, isLoading, createdBCategory, updatedBlogCategory, blogCategoryTitle } = newBCate;

  useEffect(() => {
    if(blogCateId) {
      dispatch(getOneBlogCategory(blogCateId));
    } else {
      dispatch(resetState());
    }
  }, [blogCateId]);

  useEffect(() => {
    if(isSuccess && createdBCategory) {
      toast.success('Blog category added successfully!');
    }
    if(isSuccess && updatedBlogCategory) {
      toast.success('Blog category updated successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  //b cate input validation using yup
  let bCateSchema = Yup.object({
    title: Yup.string().required('Title is required!'),
  });

  //Form handler using formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCategoryTitle || '',
    },
    validationSchema: bCateSchema,
    onSubmit: values => {
      if(blogCateId !== undefined) {
        const blogCateData = {
          id: blogCateId,
          data: values,
        };
        dispatch(updateBlogCategory(blogCateData));
        dispatch(resetState());
      } else {
        dispatch(createBCate(values));
      }
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      },1000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">{blogCateId ? "Edit" : "Add"} Blog Category</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="relative mt-4 mb-4">
                <input type="text" id="title" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" "
                name='title'
                onChange={formik.handleChange("title")}
                value={formik.values.title}
                onBlur={formik.handleBlur("title")} />
                <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter blog category</label>

                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>{blogCateId ? "Edit" : "Add"} blog category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCategory