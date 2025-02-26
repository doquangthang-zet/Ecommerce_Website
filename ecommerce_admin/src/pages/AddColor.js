import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { createColor, getOneColor, resetState, updateColor } from '../features/color/colorSlice';


const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const colorId = param.id;

  //Get created color
  const newColor = useSelector((state) => {
    return state.color;
  });

  const { isSuccess, isError, isLoading, createdColor, updatedColor, colorTitle } = newColor;

  useEffect(() => {
    if(colorId) {
      dispatch(getOneColor(colorId));
    } else {
      dispatch(resetState());
    }
  }, [colorId]);

  useEffect(() => {
    if(isSuccess && createdColor) {
      toast.success('Color added successfully!');
    }
    if(isSuccess && updatedColor) {
      toast.success('Color updated successfully!');
    }
    if(isError) {
      toast.error('Something went wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  //color input validation using yup
  let colorSchema = Yup.object({
    title: Yup.string().required('Title is required!'),
  });

  //Form handler using formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorTitle || "#ffffff",
    },
    validationSchema: colorSchema,
    onSubmit: values => {
      if(colorId !== undefined) {
        const colorData = {
          id: colorId,
          data: values,
        };
        dispatch(updateColor(colorData));
        dispatch(resetState());
      } else {
        // alert(JSON.stringify(values))
        dispatch(createColor(values));
      }
      
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/color-list");
      },1000);
    },
  });

  return (
    <div>
        <h3 className="mb-4 text-2xl font-bold">{colorId ? "Edit" : "Add"} Color</h3>

        <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="relative mt-4 mb-4">
                <input type="color" id="title" className="block rounded-md px-2 pb-1 pt-4 h-8 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" "
                name='title'
                onChange={formik.handleChange("title")}
                value={formik.values.title}
                onBlur={formik.handleBlur("title")} />
                <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Enter color</label>
                <div className="text-sm text-red-500 pl-2 italic">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>

              <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>{colorId ? "Edit" : "Add"} color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColor