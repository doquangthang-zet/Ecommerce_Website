import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getbCategories } from '../features/blogCate/bCategorySlice';
import { deleteImg, resetImgState, uploadImg } from '../features/upload/uploadSlice';
import Dropzone from 'react-dropzone';
import { GiCrossMark } from "react-icons/gi";
import { createBlog, resetState } from '../features/blog/blogSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get all blgo cate from store
  const categoryState = useSelector((state) => {
    return state.bCategory.bCategories;
  });

  //Get all images from store
  const imageState = useSelector((state) => {
    return state.upload.images;
  });

  //Get created blog
  const newBlog = useSelector((state) => {
    return state.blog;
  });

  const { isSuccess, isError, isLoading, createdBlog } = newBlog;

  useEffect(() => {
    if(isSuccess && createdBlog) {
      toast.success('Blog added successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const imgs = [];
  imageState.forEach(element => {
    imgs.push({
      public_id: element.public_id,
      url: element.url,
    });
  });

  //blog input validation using yup
  let blogSchema = Yup.object({
    title: Yup.string().required('Title is required!'),
    description: Yup.string().required('Description is required!'),
    category: Yup.string().required("Category is required!"),
    images: Yup.array().min(1, "Pick at least 1 image!"),
  });

  //Form handler using formik
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: "",
      author: "admin",
      images: [],
    },
    validationSchema: blogSchema,
    onSubmit: values => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetImgState());
        navigate("/admin/blog-list");
      },3000);
    },
  });

  useEffect(() => {
    formik.values.images = imgs;
  }, [imgs]);

  useEffect(() => {
    dispatch(getbCategories());
  }, []);
  
  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">Add Blog</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              {/* Images upload */}
              <div className='bg-white p-5 w-full h-32 rounded-md border-1 text-gray-900 text-center text shadow-sm'>
                <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>

              <div className="flex flex-wrap gap-5">
                {
                  imageState.map((image, j) => (
                    <div className='relative' key={j}>
                      <GiCrossMark className='absolute top-4 right-4 text-2xl cursor-pointer bg-white p-1 rounded-md' onClick={() => dispatch(deleteImg(image.public_id))} />
                      <img src={image.url} className='p-3' alt="product image" width={200} height={200} />
                    </div>
                  ))
                }
              </div>

              <div className="text-sm text-red-500 pl-2 italic">
                {formik.touched.images && formik.errors.images ? (
                  <div>{formik.errors.images}</div>
                ) : null}
              </div>

              {/* Title */}
              <div className="relative mt-4 mb-4">
                <input type="text" id="title" className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" "
                name='title'
                onChange={formik.handleChange("title")}
                value={formik.values.title}
                onBlur={formik.handleBlur("title")}
                />
                <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter blog title</label>

                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>

              {/* Category */}
              <select name="category" id="category" className='py-3 pl-2 mb-4 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6' 
                onChange={formik.handleChange("category")}
                value={formik.values.category}
                onBlur={formik.handleBlur("category")}
              >
                <option value="">Select blog category</option>
                {
                  categoryState && categoryState.map((cate, idx) => (
                    <option key={idx} value={cate.title}>{cate.title}</option>
                  ))
                }
              </select>

              <div className="text-sm text-red-500 pl-2 italic mb-4">
                {formik.touched.category && formik.errors.category ? (
                  <div>{formik.errors.category}</div>
                ) : null}
              </div>

              {/* Description */}
              <ReactQuill theme="snow" value={formik.values.description} onChange={formik.handleChange("description")} className='bg-white mb-4' placeholder='Enter blog content' />

              <div className="text-sm text-red-500 pl-2 italic">
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Add blog</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlog