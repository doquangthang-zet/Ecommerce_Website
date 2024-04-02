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
import { createProducts, getOneProduct, resetState, updateProduct } from '../features/product/productSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const productId = param.id;
  const [colors, setColors] = useState([]);

  //Get all brands from store
  const brandState = useSelector((state) => {
    return state.brand.brands;
  });

  //Get all colors from store
  const colorState = useSelector((state) => {
    return state.color.colors;
  });

  //Get all brands from store
  const categoryState = useSelector((state) => {
    return state.category.categories;
  });

  //Get all images from store
  const imageState = useSelector((state) => {
    return state.upload.images;
  });

  //Get created product
  const newProduct = useSelector((state) => {
    return state.product;
  });

  const { isSuccess, isError, isLoading, createdProduct, updatedProduct, currentProduct } = newProduct;

  useEffect(() => {
    if(productId) {
      dispatch(getOneProduct(productId));
    } else {
      dispatch(resetState());
    }
  }, [productId]);

  useEffect(() => {
    if(isSuccess && createdProduct) {
      toast.success('Product added successfully!');
    }
    if(isSuccess && updatedProduct) {
      toast.success('Product updated successfully!');
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

  //product input validation using yup
  let productSchema = Yup.object({
    title: Yup.string().required('Title is required!'),
    description: Yup.string().required('Description is required!'),
    price: Yup.number().required("Price is required!"),
    quantity: Yup.number().required("Quantity is required!"),
    brand: Yup.string().required("Brand is required!"),
    category: Yup.string().required("Category is required!"),
    tags: Yup.string().required("Tag is required!"),
    color: Yup.array().min(1, "Pick at least 1 color!"),
    images: Yup.array().min(1, "Pick at least 1 image!"),
  });

  //Form handler using formik
  const formik = useFormik({
    initialValues: {
      title: currentProduct ? currentProduct.title : '',
      description: currentProduct ? currentProduct.description : '',
      price: currentProduct ? currentProduct.price : "",
      quantity: currentProduct ? currentProduct.quantity : "",
      brand: currentProduct ? currentProduct.brand : "",
      category: currentProduct ? currentProduct.category : "",
      tags: currentProduct ? currentProduct.tags : "",
      color: [],
      images: [],
    },
    validationSchema: productSchema,
    onSubmit: values => {
      if(productId !== undefined) {
        const productData = {
          id: productId,
          data: values,
        };

        currentProduct.images.forEach(e => {
          dispatch(deleteImg(e.public_id));
        });

        dispatch(updateProduct(productData));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
      }
      
      formik.resetForm();
      setColors([]);
      setTimeout(() => {
        dispatch(resetState());
        dispatch(resetImgState());
        navigate("/admin/product-list");
      },1000);
    },
  });

  useEffect(() => {
    formik.values.images = imgs;
    formik.values.color = colors.map((c) => c._id);
  }, [imgs, colors]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getColors());
    dispatch(getCategories());
  }, []);

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">{productId ? "Edit" : "Add"} Product</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              {/* Title */}
              <div className="relative mt-4 mb-4">
                <input type="text" id="title" 
                name='title'
                className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                placeholder=" "
                onChange={formik.handleChange("title")}
                value={formik.values.title}
                onBlur={formik.handleBlur("title")} />
                
                <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter product title</label>
                
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>              

              {/* Description */}
              <ReactQuill 
                theme="snow" 
                value={formik.values.description} 
                name="description" 
                onChange={formik.handleChange("description")} 
                className='bg-white' 
                placeholder='Enter description'
              />

              <div className="text-sm text-red-500 pl-2 italic">
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}
              </div>

              {/* Price */}
              <div className="relative mt-4 mb-4">
                <input type="number" id="price" 
                  name='price'
                  className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                  placeholder=" "
                  onChange={formik.handleChange("price")}
                  value={formik.values.price}
                  onBlur={formik.handleBlur("price")}
                />
                
                <label htmlFor="price" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter product price</label>
                
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.price && formik.errors.price ? (
                    <div>{formik.errors.price}</div>
                  ) : null}
                </div>
              </div>

              {/* Category */}
              <select 
                name="category" 
                id="category" 
                className='py-3 pl-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={formik.handleChange("category")}
                value={formik.values.category}
                onBlur={formik.handleBlur("category")}
              >
                <option value="">Select category</option>
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

              {/* Tags */}
              <select 
                name="tags" 
                id="tags" 
                className='py-3 pl-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={formik.handleChange("tags")}
                value={formik.values.tags}
                onBlur={formik.handleBlur("tags")}
              >
                <option value="" disabled>Select tag</option>
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="special">Special</option>
              </select>

              <div className="text-sm text-red-500 pl-2 italic mb-4">
                {formik.touched.tags && formik.errors.tags ? (
                  <div>{formik.errors.tags}</div>
                ) : null}
              </div>

              {/* Color */}
              <Multiselect
                dataKey="_id"
                textField="title"
                name='color'
                id='color'
                placeholder='Choose Color'
                className='block w-full capitalize rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                data={
                  colorState
                }
                onChange={(e) => setColors(e)}
                value={colors}
                onBlur={formik.handleBlur("color")}
              />

              <div className="text-sm text-red-500 pl-2 italic mb-4">
                {formik.touched.color && formik.errors.color ? (
                  <div>{formik.errors.color}</div>
                ) : null}
              </div>

              {/* Brand */}
              <select 
                name="brand" 
                id="brand" 
                className='py-3 pl-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                onChange={formik.handleChange("brand")}
                value={formik.values.brand}
                onBlur={formik.handleBlur("brand")}
              >
                <option value="">Select brand</option>
                {
                  brandState && brandState.map((brand, idx) => (
                    <option key={idx} value={brand.title}>{brand.title}</option>
                  ))
                }
              </select>

              <div className="text-sm text-red-500 pl-2 italic mb-4">
                {formik.touched.brand && formik.errors.brand ? (
                  <div>{formik.errors.brand}</div>
                ) : null}
              </div>

              {/* Quantity */}
              <div class="relative mt-4 mb-4">
                <input type="number" id="quantity"
                className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" 
                placeholder=" "
                name="quantity"
                onChange={formik.handleChange("quantity")}
                value={formik.values.quantity}
                onBlur={formik.handleBlur("quantity")} />
                <label htmlFor="quantity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter product quantity</label>
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.quantity && formik.errors.quantity ? (
                    <div>{formik.errors.quantity}</div>
                  ) : null}
                </div>
              </div>

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
              
              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>{productId ? "Edit" : "Add"} product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct