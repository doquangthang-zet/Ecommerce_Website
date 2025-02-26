import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../features/user/userSlice';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resetToken = window.location.pathname.split('/')[2];

    let passSchema = Yup.object({
        password: Yup.string().required("Password is required!"),
    });


    const formik = useFormik({
        initialValues: {
          password: "",
        },
        validationSchema: passSchema,
        onSubmit: values => {
            dispatch(resetPassword({token: resetToken, password: values.password}));
            navigate('/login');
        },
    });
  return (
    <>
        <Meta title="Reset Password" />
        <BreadCrum title="Reset Password" />

        <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Signup card*/}
                    <div className="col-span-12">
                        <div className="bg-white rounded-md p-5 my-7 mx-auto w-2/3 md:w-1/3">
                            <h3 className='text-base md:text-xl font-medium text-center mb-1 md:mb-3'>Reset Password</h3>

                            <form action="" onSubmit={formik.handleSubmit} className='flex flex-col gap-2 md:gap-4'>
                                <div className="mb-1">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={formik.handleChange('password')}
                                        onBlur={formik.handleBlur('password')}
                                        value={formik.values.password}
                                        placeholder='Password'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div>
                                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                        <button type='submit' className='w-2/3 rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5'>Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResetPassword