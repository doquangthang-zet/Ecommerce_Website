import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const dispatch = useDispatch();

    let userSchema = Yup.object({
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
    });


    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // dispatch(userLogin(values));
        },
    });
  return (
    <>
        <Meta title="Forgot Password" />
        <BreadCrum title="Forgot Password" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Forgot card*/}
                    <div className="col-span-12">
                        <div className="bg-white rounded-md p-5 my-7 mx-auto w-1/3">
                            <h3 className='text-xl font-medium text-center mb-3'>Reset password</h3>

                            <p className='text-center my-3 text-sm text-gray-600'>We will send you an email to reset your password</p>

                            <form action="" className='flex flex-col gap-4'>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        placeholder='Email'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div>
                                    <div className="flex flex-col justify-center items-center gap-4">
                                        <button type='submit' className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Submit</button>
                                        <Link to="/login">Cancel</Link>
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

export default ForgotPassword