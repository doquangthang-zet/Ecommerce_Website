import React from 'react'
import BreadCrum from '../components/BreadCrum'
import Meta from '../components/Meta';
import {Link} from "react-router-dom";

const ResetPassword = () => {
  return (
    <>
        <Meta title="Reset Password" />
        <BreadCrum title="Reset Password" />

        <div className="py-5">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    {/* Signup card*/}
                    <div className="col-span-12">
                        <div className="bg-white rounded-md p-5 my-7 mx-auto w-1/3">
                            <h3 className='text-xl font-medium text-center mb-3'>Reset Password</h3>

                            <form action="" className='flex flex-col gap-4'>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder='Password'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder='Confirm Password'
                                        className="block p-2 bg-gray-200 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                                <div>
                                    <Link to="/forgot-pass" className='text-blue-500'>Forgot Password?</Link>
                                    <div className="flex justify-center items-center gap-4">
                                        <button type='submit' className='rounded-3xl text-white bg-cyan-950 px-8 py-2 text-lg hover:bg-orange-500 hover:text-black ml-2 mt-5'>Reset</button>
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