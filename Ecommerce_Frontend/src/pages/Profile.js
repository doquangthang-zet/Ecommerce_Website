import React, { useState } from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../features/user/userSlice';
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state?.user?.currentUser);
    const [edit, setEdit] = useState(false);

    const profileSchema = Yup.object({
        email: Yup.string().email("Invalid email address!"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateUserProfile(values));
            setEdit(false);
        }
    });

  return (
    <>
        <Meta title="My Profile" />
        <BreadCrum title="My Profile" />

        <div className="p-2 mb-2 text-xs sm:text-sm md:text-base md:py-3 lg:text-lg lg:py-5 lg:mb-6">
            <div className="container mx-auto">
            
                {/* user inFor */}
                <div className="grid grid-cols-12 gap-4 p-1 sm:p-3">
                    <div className="col-span-12 flex justify-center items-center gap-3">
                        <h2 className='text-base md:text-xl font-medium text-center mb-1 md:mb-3'>User Information</h2>
                        <FaEdit onClick={() => setEdit(!edit)} />
                    </div>
                    <div className='col-span-12'>
                        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                                <input type="text" id="firstname" name='firstname' value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Messi" required disabled={!edit} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                                <input type="text" id="lastname" name="lastname" value={formik.values.lastname} onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lionel" required disabled={!edit} />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required disabled={!edit} />
                                <div className="text-sm text-red-500 pl-2 italic">
                                    {formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile number</label>
                                <input type="number" id="mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+84123456789" required disabled={!edit} />
                            </div>
                            {
                                edit === true && <button type='submit' className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black'>Save</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile