import React, { useEffect } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {NavLink, Link, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../features/user/userSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.user)
    const navigate = useNavigate();

    let userSchema = Yup.object({
        firstname: Yup.string().required("First name is required!"),
        lastname: Yup.string().required("Last name is required!"),
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
        mobile: Yup.number().required("Mobile is required!"),
        password: Yup.string().required("Password is required!").min(3, "Password must have more than 3 char!"),
    });


    const formik = useFormik({
        initialValues: {
          firstname: '',
          lastname: '',
          email: '',
          mobile: "",
          password: "",
        },
        validationSchema: userSchema,
        onSubmit: values => {
            dispatch(userRegister(values));
        //   alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        if(userState?.user !== null && userState.isSuccess === true) {
            navigate("/login");
            // window.location.reload();
        }
    }, [userState]);
    return (
    <>
        <Meta title="Signup" />
        <BreadCrum title="Signup" />

        <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Signup card*/}
                    <div className="col-span-12">
                        <div className="bg-white rounded-md p-5 my-7 mx-auto w-2/3 md:w-1/3">
                            <h3 className='text-base md:text-xl font-medium text-center mb-1 md:mb-3'>Create account</h3>

                            <form action="" className='flex flex-col gap-2 md:gap-4' onSubmit={formik.handleSubmit}>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        autoComplete="firstname"
                                        placeholder='Firstname'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange("firstname")}
                                        value={formik.values.firstname}
                                        onBlur={formik.handleBlur("firstname")}
                                    />

                                    <div className="text-sm text-red-500 pl-2 italic">
                                        {formik.touched.firstname && formik.errors.firstname ? (
                                        <div>{formik.errors.firstname}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="md:mt-2">
                                    <input
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        autoComplete="lastname"
                                        placeholder='Lastname'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange("lastname")}
                                        value={formik.values.lastname}
                                        onBlur={formik.handleBlur("lastname")}
                                    />

                                    <div className="text-sm text-red-500 pl-2 italic">
                                        {formik.touched.lastname && formik.errors.lastname ? (
                                        <div>{formik.errors.lastname}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="md:mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        placeholder='Email'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange("email")}
                                        value={formik.values.email}
                                        onBlur={formik.handleBlur("email")}
                                    />

                                    <div className="text-sm text-red-500 pl-2 italic">
                                        {formik.touched.email && formik.errors.email ? (
                                        <div>{formik.errors.email}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="md:mt-2">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        id="mobile"
                                        autoComplete="mobile"
                                        placeholder='Mobile Number'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange("mobile")}
                                        value={formik.values.mobile}
                                        onBlur={formik.handleBlur("mobile")}
                                    />

                                    <div className="text-sm text-red-500 pl-2 italic">
                                        {formik.touched.mobile && formik.errors.mobile ? (
                                        <div>{formik.errors.mobile}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="md:mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="password"
                                        placeholder='Password'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange("password")}
                                        value={formik.values.password}
                                        onBlur={formik.handleBlur("password")}
                                    />

                                    <div className="text-sm text-red-500 pl-2 italic">
                                        {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                        <button type='submit' className='w-2/3 rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-cyan-950 lg:px-8 lg:py-3 lg:text-lg hover:bg-orange-500 hover:text-black lg:ml-2 lg:mt-5'>Signup</button>
                                        <Link to="/login" className='w-2/3 text-center rounded-2xl text-sm ml-1 px-3 py-1 mt-2 md:rounded-3xl text-white bg-orange-500 lg:px-8 lg:py-3 lg:text-lg hover:bg-cyan-950 hover:text-white lg:ml-2 lg:mt-5'>Login</Link>
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

export default Signup