import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="py-5 bg-purple-300 min-h-screen">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-1/4 bg-white rounded-md mx-auto p-5">
        <form action="" className='flex flex-col gap-4'>
          <h3 className='text-xl font-bold text-center'>Login</h3>
          <p className='text-center'>Login to your account to continue.</p>
          <div class="relative">
            <input type="text" id="email" class="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" " />
            <label htmlFor="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
          </div>
          <div class="relative">
            <input type="password" id="pass" class="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-200 dark:bg-gray-700 appearance-none dark:text-white focus:outline-none focus:ring-0 peer" placeholder=" " />
            <label htmlFor="pass" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
          </div>
          <div className='text-end'>
            <Link to="/forgotPassword" className='text-sm text-purple-600 underline'>Forgot Password?</Link>
          </div>
          <button className='rounded-md text-black bg-purple-400 px-8 py-2 text-lg font-semibold hover:bg-purple-500 hover:text-white mt-5' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login