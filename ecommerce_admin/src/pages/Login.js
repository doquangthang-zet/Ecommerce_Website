import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {getAllOrders, getMonthlyOrderIncome, getYearlyOrderIncome, login} from "../features/auth/authSlice"

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //input validation using yup
  let userSchema = Yup.object({
    email: Yup.string().email('Invalid email address!').required('Required!'),
    password: Yup.string().required('Required!')
  });
  
  //Form handler using formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values));
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(user !== null && isSuccess) {
      navigate("/admin");
      dispatch(getMonthlyOrderIncome());
      dispatch(getAllOrders());
      dispatch(getYearlyOrderIncome());
    }
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <div className="py-5 bg-purple-300 min-h-screen">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-1/4 bg-white rounded-md mx-auto p-5">
        <form action="" className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <h3 className='text-xl font-bold text-center'>Login</h3>
          <p className='text-center'>Login to your account to continue.</p>

          <div className="text-sm text-red-500 pl-2 italic">
            {message.message == "Rejected" ? "You are not an admin" : ""}
          </div>

          <div className="relative">
            <input type="text" id="email" name='email' className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" "
            onChange={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleBlur("email")} />

            <div className="text-sm text-red-500 pl-2 italic">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>

            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
          </div>
          <div className="relative">
            <input type="password" id="password" name='password' className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" "
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            onBlur={formik.handleBlur("password")} />

            <div className="text-sm text-red-500 pl-2 italic">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>

            <label htmlFor="pass" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
          </div>
          {/* <div className='text-end'>
            <Link to="/forgotPassword" className='text-sm text-purple-600 underline'>Forgot Password?</Link>
          </div> */}
          <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login